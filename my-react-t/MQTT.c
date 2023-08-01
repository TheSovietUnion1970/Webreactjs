#include "stdlib.h"
#include "stdio.h"
#include "string.h"
#include "unistd.h"
#include "MQTTClient.h"
#include "mysql.h"
#include "wiringPi.h"
/*
Broker: broker.emqx.io
TCP Port: 1883 
*/
#define ADDRESS     "tcp://broker.hivemq.com:1883"
#define CLIENTID    "publisher_demo"
#define SUB_TOPIC   "k19/CT6"
#define PUB_TOPIC   "k19/CT6"
//#define QOS         1

MYSQL *conn;
MYSQL_RES *res;
MYSQL_ROW row;

int num1, status, green, red, reset;
char sql[200];
void Run(){
    status = 1;
    green = 1;
    red = 0;
}

void Stop(){
    status = 0;
    green = 0;
    red = 1;
}
//----------------------------------------------------
#define TRIG_PIN 24   // GPIO 0, BCM GPIO 17
#define ECHO_PIN 29   // GPIO 1, BCM GPIO 18

void setup() {
    wiringPiSetup();
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
}

double measure_distance() {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    while (digitalRead(ECHO_PIN) == LOW);

    long startTime = micros();
    while (digitalRead(ECHO_PIN) == HIGH);
    long travelTime = micros() - startTime;

    // Speed of sound in air is approximately 343 meters per second
    // Divide by 2 to account for the time taken for the sound to travel to the object and back
    double distance = travelTime / 58.0;

    return distance;
}

//--------------------------------

char *server = "172.20.10.5";
char *user = "pi_sql";
char *password = "1234"; // set me first
char *database = "checking";

void publish(MQTTClient client, char* topic, char* payload) {
    MQTTClient_message pubmsg = MQTTClient_message_initializer;
    pubmsg.payload = payload;
    pubmsg.payloadlen = strlen(pubmsg.payload);
    pubmsg.qos = 1;
    pubmsg.retained = 0;
    MQTTClient_deliveryToken token;
    MQTTClient_publishMessage(client, topic, &pubmsg, &token);
    MQTTClient_waitForCompletion(client, token, 1000L);
    //printf("Message '%s' with delivery token %d delivered\n", payload, token);
}

int on_message(void *context, char *topicName, int topicLen, MQTTClient_message *message) {
    char* payload = message->payload;
    printf("%s\n", payload);
    

    conn = mysql_init(NULL);
    if (mysql_real_connect(conn, server, user, password, database, 0, NULL, 0) == NULL) 
    {
        fprintf(stderr, "%s\n", mysql_error(conn));
        mysql_close(conn);
        exit(1);
    }  

//------------
        char sql[200];
        //sprintf(sql, "select * from sensor3");
        sprintf(sql, "select * from test1");
        mysql_query(conn,sql);
        res = mysql_store_result(conn); 
        row = mysql_fetch_row(res); //row[0]-> red; row[1]->green
        reset = atoi(row[5]);

        if (reset == 1) {
        num1 = 0;
        reset = 0;
        }
//------------
    //sprintf(sql,"update test1 set num1 = %d, status = %d, green = %d, red = %d, reset = %d",num1, status, green, red, reset);
    //printf("num1 = %d, status = %d, green = %d, red = %d, reset = %d\n",num1, status, green, red);
    mysql_query(conn,payload);
    mysql_close(conn); 


    MQTTClient_freeMessage(&message);
    MQTTClient_free(topicName);
    return 1;
}

int main(int argc, char* argv[]) {
    MQTTClient client;
    MQTTClient_create(&client, ADDRESS, CLIENTID, MQTTCLIENT_PERSISTENCE_NONE, NULL);
    MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
    //conn_opts.username = "your_username>>";
    //conn_opts.password = "password";

    MQTTClient_setCallbacks(client, NULL, NULL, on_message, NULL); 

    int rc;  // return code
    if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS) {
        printf("Failed to connect, return code %d\n", rc);
        exit(-1);
    }
   
    //listen for operation
    MQTTClient_subscribe(client, SUB_TOPIC, 0);
    int i =0, check=-1;
    setup();

    // connect mysql
    conn = mysql_init(NULL);
    mysql_real_connect(conn,server,user,password,database,0,NULL,0); 
    while(1) {
        double dist = measure_distance();
        printf("Distance: %.2f cm\n", dist);

        if (dist <=4) {Stop();}
        else Run();



        if (check == -1 && dist<=4){
            num1++;
            //while(dist<=4);
            check = 0;
        }

        if (check == 0 && dist>4){
            check = -1;
        }

        if (reset == 1) {
            num1 = 0;
            //reset = 0;
        }

        sprintf(sql,"update test1 set num1 = %d, status = %d, green = %d, red = %d, reset = %d",num1, status, green, red, reset);
        publish(client, PUB_TOPIC, sql);

        delay(5);
    }
    mysql_free_result(res);
    mysql_close(conn);
    MQTTClient_disconnect(client, 1000);
    MQTTClient_destroy(&client);
    return rc;
}

// gcc one.c -o one -lwiringPi $(mariadb_config --cflags) $(mariadb_config --libs) -lpaho-mqtt3c