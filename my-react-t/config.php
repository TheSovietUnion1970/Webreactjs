<?php

// Connect to database
$server = "localhost";
$user = "vinh"; 
$pass = "1234";
$dbname = "checking";

$conn = mysqli_connect($server,$user,$pass,$dbname);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

?>