<?php

require 'session.php';
require 'mysql.php';

$answer = array(
    "code" => 404,
    "changed" => false,
    "message" => "Bestandsänderung fehlgeschlagen"
);

if (isset($_POST["product_ids"]) && isset($_POST["quantity_per_id"])) {
    $ids = $_POST["product_ids"];          
    $newQuantities = $_POST["quantity_per_id"];

    if (count($ids) === count($newQuantities)) {
        // Sicherstellen, dass user_id aus der Session kommt
        $user_id = $_SESSION["user_id"] ?? null;

        if ($user_id !== null) {
            try {
                // Vorbereitung des SQL-Statements
                $stmt = $conn->prepare(
                    "UPDATE Lagerbestand
                    SET Bestand = ?
                    WHERE artikelnr = ? AND user_id = ?"
                );

                for ($i = 0; $i < count($ids); $i++) {
                    $product_id = $ids[$i];
                    $quantity = $newQuantities[$i];

                    // Parameter binden und ausführen
                    $stmt->bind_param("iii", $quantity, $product_id, $user_id);
                    $stmt->execute();
                }

                $stmt->close();

                $answer["code"] = 200;
                $answer["changed"] = true;
                $answer["message"] = "Bestände erfolgreich aktualisiert";
            } catch (mysqli_sql_exception $e) {
                $answer["code"] = $e->getCode();
                $answer["message"] = $e->getMessage();
            }
        } else {
            $answer["code"] = 401;
            $answer["message"] = "Nicht eingeloggt oder user_id fehlt";
        }
    } else {
        $answer["code"] = 400;
        $answer["message"] = "Array-Längen stimmen nicht überein";
    }
} 
else {
    $answer["code"] = 422;
    $answer["message"] = "Erforderliche Felder fehlen";
}

if (isset($_GET["type"]) && isset($_POST["order_id"])) {
    $order_id = intval($_POST["order_id"]);
    // Example: select all products for this order and user
    $stmt = $conn->prepare(
        "SELECT * FROM orderRequest WHERE user_id = ? AND order_id = ?"
    );
    $stmt->bind_param("ii", $user_id, $order_id);
    $stmt->execute();
    $allItems = $stmt->get_result();

    while ($item = $allItems->fetch_assoc()) {
        // Example: update Lagerbestand for each product in the order
        $updateStmt = $conn->prepare(
            "UPDATE Lagerbestand SET Bestand = Bestand + ? WHERE user_id = ? AND artikelnr = ?"
        );
        $quantity = $item["anzahl"] ?? 1; // adjust field name as needed
        $product_id = $item["product"];
        $updateStmt->bind_param("iii", $quantity, $user_id, $product_id);
        $updateStmt->execute();
        $updateStmt->close();
    }
    $stmt->close();
}

echo json_encode($answer);
?>
