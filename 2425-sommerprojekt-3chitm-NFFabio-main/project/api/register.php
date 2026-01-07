<?php

require 'session.php';
require 'mysql.php';

$answer = array(
    "code" => 404,
    "registered" => false,
    "message" => "Registration failed"
);

if (isset($_POST["user"]) && isset($_POST["password"])) {
    $user = $_POST["user"];
    $pw = $_POST["password"];

    $pwhash = password_hash($pw, PASSWORD_BCRYPT);

    try {
        $stmt = $conn->prepare("INSERT INTO Users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $user, $pwhash);
        $stmt->execute();

        if ($stmt->affected_rows === 1) {
            $user_id = $stmt->insert_id;

            $_SESSION["loggedIn"] = true;
            $_SESSION["user_id"] = $user_id; 

            $answer["code"] = 200;
            $answer["registered"] = true;
            $answer["message"] = "Registration successful";
        }

        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $answer["code"] = $e->getCode();
        $answer["message"] = $e->getMessage();
    }
}

echo json_encode($answer);
?>
