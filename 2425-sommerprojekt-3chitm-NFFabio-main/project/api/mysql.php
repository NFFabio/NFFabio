<?php

$servername = "db_server";
$port = 3306;
$username = "TeuJa";
$password = "1234";
$dbname = "TeuJa";

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if($conn -> connect_error) {
    die("Connection failed : ".$conn->connect_error);
}
?>