<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once __DIR__.'/../../includes/config.php';

/*
    File php per interrogare il database e tornare in assets/js/flights_form.js i dati ricavati dalla ricerca utente
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


// Se il $_GET["query"] esiste ed ha un valore, viene preso. Altrimenti viene assegnata stringa vuota "";
$query = $_GET["query"] ?? "";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT id, name, city, iata_code FROM airports WHERE name LIKE ? OR city LIKE ? OR iata_code LIKE ? LIMIT 10";

$search = "%{$query}%";
$stmt = $conn->prepare($sql);

// Si assegna il parametro $search ai 3 ? nella query e si esegue la query al db
$stmt->bind_param("sss", $search, $search, $search);
$stmt->execute();
$result = $stmt->get_result();

$airports = [];
while ($row = $result->fetch_assoc()) {
    $airports[] = $row;
}

echo json_encode($airports);