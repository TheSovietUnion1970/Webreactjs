<?php

// lấy dữ liệu từ bên dưới đem lên web

// send a JSON message to website
header('Content-Type: application/json');

// dang nhap vao database
include("config.php");

// Doc gia tri RGB tu database 
$sql = "select * from test1"; 
$result = mysqli_query($conn,$sql);

// Gửi dữ liệu lên website // tạo cái mảng  //  đọc từng hàng ròi lưu vào biến data
$data = array();
foreach ($result as $row){
    $data[] = $row;
}

mysqli_close($conn);

echo json_encode($data); // chuyển sang dạng JSON và xuất nó ra màn hình thông qua hàm echo 

//      hostname/readRGB.php    //

?>