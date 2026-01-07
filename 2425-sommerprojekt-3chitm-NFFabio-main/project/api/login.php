<?php

require 'session.php';
require 'mysql.php';

$answer = array(
    "code" => 404,
    "loggedIn" => false,
);

if (isset($_POST["user"]) && isset($_POST["password"])) {
    $user = $_POST["user"];
    $pw = $_POST["password"];

    try {
        $stmt = $conn->prepare("SELECT id, password, email FROM Users WHERE email = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        $user_sql = $result->fetch_assoc();

        if ($user_sql && password_verify($pw, $user_sql["password"])) {
            $answer["code"] = 200;
            $answer["loggedIn"] = true;
            $_SESSION["loggedIn"] = true;
            $_SESSION["user_id"] = $user_sql["id"];  // ✅ ID in Session speichern
        }

        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $answer["code"] = $e->getCode();
        $answer["message"] = $e->getMessage();
    }
}

echo json_encode($answer);
?>
