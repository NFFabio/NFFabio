<?php

require 'session.php';
require 'mysql.php';

$initialvalues = [
    ['Spaghetti', 'Trockensortiment', 50, 1.49, 0.89, 'Barilla', '2026-12-31'],
    ['Reis', 'Trockensortiment', 40, 2.99, 1.50, "Uncle Ben's", '2026-06-30'],
];

$moreValues = [
    ['Tomatensauce', 'Trockensortiment', 60, 1.29, 0.70, 'Mutti', '2026-11-20'],
    ['Apfelsaft', 'Getränke', 100, 2.49, 1.20, 'hohes C', '2025-12-01'],
    ['Milch', 'Kühlregal', 80, 1.19, 0.70, 'Bergbauern', '2025-05-25'],
    ['Butter', 'Kühlregal', 60, 2.79, 1.90, 'Kerrygold', '2025-06-10'],
    ['Eier', 'Frische', 90, 2.99, 1.99, 'LandEi', '2025-05-28'],
    ['Käse', 'Kühlregal', 55, 3.49, 2.10, 'Leerdammer', '2025-06-15'],
    ['Wurst', 'Kühlregal', 50, 2.99, 1.80, 'Berger', '2025-06-12'],
    ['Joghurt', 'Kühlregal', 75, 0.49, 0.25, 'Müller', '2025-06-05'],
    ['Mineralwasser', 'Getränke', 120, 0.89, 0.30, 'Vöslauer', '2026-01-01'],
    ['Cola', 'Getränke', 100, 1.29, 0.70, 'Coca-Cola', '2026-03-15'],
    ['Orangensaft', 'Getränke', 80, 1.99, 1.10, 'Happy Day', '2025-11-30'],
    ['Müsli', 'Trockensortiment', 45, 2.49, 1.20, 'Kölln', '2026-09-01'],
    ['Cornflakes', 'Trockensortiment', 40, 2.79, 1.30, 'Kellogg\'s', '2026-08-15'],
    ['Schokolade', 'Süßwaren', 70, 0.99, 0.50, 'Milka', '2026-12-31'],
    ['Bonbons', 'Süßwaren', 60, 1.29, 0.70, 'Ricola', '2026-11-01'],
    ['Chips', 'Snacks', 80, 1.49, 0.89, 'Funny-Frisch', '2026-10-20'],
    ['Nüsse', 'Snacks', 65, 2.99, 1.80, 'Seeberger', '2026-12-10'],
    ['Brot', 'Frische', 50, 1.99, 0.90, 'Resch & Frisch', '2025-05-18'],
    ['Toast', 'Trockensortiment', 60, 1.49, 0.70, 'Golden Toast', '2025-06-01'],
    ['Mehl', 'Backwaren', 55, 0.89, 0.40, 'Ja! Natürlich', '2026-05-01'],
    ['Zucker', 'Backwaren', 65, 0.99, 0.45, 'Wiener Zucker', '2026-04-20'],
    ['Salz', 'Backwaren', 70, 0.69, 0.30, 'Bad Ischler', '2026-07-01'],
    ['Pfeffer', 'Gewürze', 30, 1.49, 0.80, 'Kotányi', '2026-08-10'],
    ['Paprika Edelsüß', 'Gewürze', 25, 1.79, 0.90, 'Kotányi', '2026-09-05'],
    ['Olivenöl', 'Öle & Essig', 40, 5.49, 3.10, 'Bertolli', '2026-12-31'],
    ['Essig', 'Öle & Essig', 45, 1.29, 0.70, 'Byodo', '2026-11-30'],
    ['Ketchup', 'Soßen', 50, 1.99, 1.00, 'Heinz', '2026-10-10'],
    ['Senf', 'Soßen', 40, 1.29, 0.60, 'Estragon', '2026-08-08'],
    ['Mayonnaise', 'Soßen', 35, 1.79, 0.90, 'Thomy', '2026-10-01'],
    ['Tee', 'Getränke', 60, 2.49, 1.20, 'Teekanne', '2027-01-01'],
    ['Kaffee', 'Getränke', 55, 4.99, 3.00, 'Julius Meinl', '2027-02-01'],
    ['Bananen', 'Obst', 90, 1.39, 0.80, 'Chiquita', '2025-05-16'],
    ['Äpfel', 'Obst', 85, 2.49, 1.20, 'Pink Lady', '2025-05-20'],
    ['Karotten', 'Gemüse', 75, 1.29, 0.60, 'Biohof', '2025-05-22'],
    ['Kartoffeln', 'Gemüse', 70, 2.99, 1.40, 'Speisekartoffel', '2025-06-10'],
];



$answer = array(
    "code" => 404,
    "message" => "",
    "produkte" => []
);

if (isset($_GET["id"])) {
    if (is_numeric($_GET["id"]) && $_GET["id"] == 0) {

        // Stelle sicher, dass der Benutzer eingeloggt ist
        if (!isset($_SESSION["user_id"])) {
            $answer["message"] = "Benutzer nicht eingeloggt.";
            echo json_encode($answer);
            exit;
        }

        $user_id = $_SESSION["user_id"];

        $randomIndex = rand(0, count($initialvalues) - 1);
        $value = $initialvalues[$randomIndex];

        $stmt = $conn->prepare("INSERT INTO Lagerbestand 
            (name, kategorie, bestand, verkaufspreis, einkaufspreis, marke, verfallsdatum, user_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param('ssiddsss',
                $value[0], // name
                $value[1], // kategorie
                $value[2], // bestand
                $value[3], // verkaufspreis
                $value[4], // einkaufspreis
                $value[5], // marke
                $value[6], // verfallsdatum
                $user_id   // user_id
            );


        $stmt->execute();
        $stmt->close();

        // Produkte abrufen für diesen Benutzer
        $select = $conn->prepare("SELECT * FROM Lagerbestand WHERE user_id = ?");
        $select->bind_param("i", $user_id);
        $select->execute();
        $result = $select->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $answer["produkte"][] = $row;
            }
            $answer["code"] = 200;
        } else {
            $answer["message"] = "Fehler beim Abrufen der Daten.";
        }

        $select->close();
    } elseif (is_numeric($_GET["id"]) && $_GET["id"] == 1) {
    
        // Stelle sicher, dass der Benutzer eingeloggt ist
        if (!isset($_SESSION["user_id"])) {
            $answer["message"] = "Benutzer nicht eingeloggt.";
            echo json_encode($answer);
            exit;
        }

        $user_id = $_SESSION["user_id"];

        $randomIndex = rand(0, count($moreValues) - 1);
        $value = $moreValues[$randomIndex];

        $stmt = $conn->prepare("INSERT INTO Lagerbestand 
            (name, kategorie, bestand, verkaufspreis, einkaufspreis, marke, verfallsdatum, user_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param('ssiddsss',
    $value[0], // name
    $value[1], // kategorie
    $value[2], // bestand
    $value[3], // verkaufspreis
    $value[4], // einkaufspreis
    $value[5], // marke
    $value[6], // verfallsdatum
    $user_id   // user_id
);


        $stmt->execute();
        $stmt->close();

        // Produkte abrufen für diesen Benutzer
        $select = $conn->prepare("SELECT * FROM Lagerbestand WHERE user_id = ?");
        $select->bind_param("i", $user_id);
        $select->execute();
        $result = $select->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $answer["produkte"][] = $row;
            }
            $answer["code"] = 200;
        } else {
            $answer["message"] = "Fehler beim Abrufen der Daten.";
        }

        $select->close();
    } 
    else {
        $answer["message"] = "Id in invalidem Format.";
    }
}
else {
    $answer["message"] = "Id wurde nicht übermittelt.";
}

echo json_encode($answer);
?>
