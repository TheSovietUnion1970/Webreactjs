<?php
// đọc dữ liệu từ web gửi về database 

    // log in vao database
    include("config.php");

    // data tu web gui ve
    //$reset = $_POST["reset"];

    // update lai database
    $sql = "update test1 set reset = 1";

    mysqli_query($conn, $sql);
    mysqli_close($conn);
?>
