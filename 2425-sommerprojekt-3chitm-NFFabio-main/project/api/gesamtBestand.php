<?php

require 'session.php';
require 'mysql.php';

$answer = array(
    "code" => 404,
    "message" => "",
    "produkte" => []
);

// Nur wenn Benutzer eingeloggt ist
if (!isset($_SESSION["user_id"])) {
    $answer["message"] = "Nicht eingeloggt.";
    echo json_encode($answer);
    exit;
}

$user_id = $_SESSION["user_id"];

$stmt = $conn->prepare("SELECT * FROM Lagerbestand WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $answer["produkte"][] = $row;
}

$stmt->close();
$answer["code"] = 200;

echo json_encode($answer);
?>
