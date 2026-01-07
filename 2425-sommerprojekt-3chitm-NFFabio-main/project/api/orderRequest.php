<?php

require 'session.php';
require 'mysql.php';

header("Content-Type: application/json"); // sorgt dafür, dass der Browser weiß, dass JSON kommt

if (isset($_GET["mode"])) {
    $mode = $_GET["mode"];

    if ($mode === "add") {
        // Überprüfen, ob die POST-Daten vorhanden sind
        if (isset($_POST["user_id"]) && isset($_POST["product"])) {
            $user_id = intval($_POST["user_id"]);
            $product = intval($_POST["product"]);

            // Vorbereitung und Ausführung des Statements
            $stmnt = $conn->prepare("INSERT INTO OrderRequest (user_id, product, status) VALUES (?, ?, 'offen')");
            if (!$stmnt) {
                echo json_encode(["code" => 500, "message" => "Fehler bei der Vorbereitung der Bestellung: " . $conn->error]);
                exit;
            }
            $stmnt->bind_param("ii", $user_id, $product);

            if ($stmnt->execute()) {
                echo json_encode(["code" => 200, "message" => "Bestellung erfolgreich"]);
            } else {
                echo json_encode(["code" => 500, "message" => "Fehler bei der Bestellung: " . $stmnt->error]);
            }
        } 
    }

        if($mode === "get") {
            // Hole die user_id aus der Session (storage)
            if (isset($_SESSION["user_id"])) {
            $user_id = intval($_SESSION["user_id"]);

            // Vorbereitung und Ausführung des Statements
            $stmnt = $conn->prepare("SELECT * FROM OrderRequest WHERE user_id = ?");
            if (!$stmnt) {
                echo json_encode(["code" => 500, "message" => "Fehler bei der Vorbereitung der Abfrage: " . $conn->error]);
                exit;
            }
            $stmnt->bind_param("i", $user_id);

            if ($stmnt->execute()) {
                $result = $stmnt->get_result();
                $orders = $result->fetch_all(MYSQLI_ASSOC);

                foreach ($orders as &$order) {
                $order['product'] = json_decode($order['product'], true);
                }
                echo json_encode(["code" => 200, "orders" => $orders]);
            } else {
                echo json_encode(["code" => 500, "message" => "Fehler bei der Abfrage: " . $stmnt->error]);
            }
            } else {
            echo json_encode(["code" => 400, "message" => "Benutzer nicht eingeloggt"]);
            }
        }
        if ($mode === "delete") {
            if (isset($_POST["order_id"])) {
                $order_id = intval($_POST["order_id"]);
                // Optional: Überprüfen, ob der Benutzer berechtigt ist, diese Bestellung zu löschen
                if (isset($_SESSION["user_id"])) {
                    $user_id = intval($_SESSION["user_id"]);
                    $stmnt = $conn->prepare("DELETE FROM OrderRequest WHERE product = ? AND user_id = ?");
                    if (!$stmnt) {
                        echo json_encode(["code" => 500, "message" => "Fehler bei der Vorbereitung des Löschens: " . $conn->error]);
                        exit;
                    }
                    $stmnt->bind_param("ii", $order_id, $user_id);
                    if ($stmnt->execute()) {
                        if ($stmnt->affected_rows > 0) {
                            echo json_encode(["code" => 200, "message" => "Bestellung gelöscht"]);
                        } else {
                            echo json_encode(["code" => 404, "message" => "Bestellung nicht gefunden oder keine Berechtigung"]);
                        }
                    } else {
                        echo json_encode(["code" => 500, "message" => "Fehler beim Löschen: " . $stmnt->error]);
                    }
                } else {
                    echo json_encode(["code" => 400, "message" => "Benutzer nicht eingeloggt"]);
                }
            } else   {
                echo json_encode(["code" => 400, "message" => "order_id fehlt"]);
            }
        }
        if ($mode === "edit") {
        
            if (isset($_POST["order_id"]) && isset($_POST["spedition"]) && isset($_POST["status"])&&isset($_POST["anzahl"])) {
            $order_id = intval($_POST["order_id"]);
            $spedition = $_POST["spedition"];
            $status = $_POST["status"];
            $anzahl = intval($_POST["anzahl"]);



            // Optional: Überprüfen, ob der Benutzer berechtigt ist, diese Bestellung zu bearbeiten
            if (isset($_SESSION["user_id"])) {
                $user_id = intval($_SESSION["user_id"]);
                $stmnt = $conn->prepare("UPDATE OrderRequest SET status = ?, spedition = ?, anzahl = ? WHERE product = ? AND user_id = ?");
                if (!$stmnt) {
                echo json_encode(["code" => 500, "message" => "Fehler bei der Vorbereitung des Updates: " . $conn->error]);
                exit;
                }
                $stmnt->bind_param("ssiii", $status, $spedition, $anzahl, $order_id, $user_id);
                if ($stmnt->execute()) {
                if ($stmnt->affected_rows > 0) {
                    echo json_encode(["code" => 200, "message" => "Bestellung aktualisiert"]);
                } else {
                    echo json_encode(["code" => 404, "message" => "Bestellung nicht gefunden oder keine Berechtigung"]);
                }
                } else {
                echo json_encode(["code" => 500, "message" => "Fehler beim Update: " . $stmnt->error]);
                }
            } else {
                echo json_encode(["code" => 400, "message" => "Benutzer nicht eingeloggt"]);
            }
            } else {
            echo json_encode(["code" => 400, "message" => "order_id, spedition oder status fehlt"]);
            }
        }
        exit;
}

// Wenn kein oder ungültiger mode angegeben wurde
echo json_encode(["code" => 400, "message" => "Ungültiger Modus"]);
exit;
?>
