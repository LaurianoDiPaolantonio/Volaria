<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once __DIR__.'/../../includes/config.php';

/*
    PHP file to query the database and return the retrieved airlines 
    to assets/js/flights_results.js to display airlines full name instead of their iata code
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


// If $_GET["query"] exists and has a value, it is used. Otherwise, an empty string "" is assigned.
$query = $_GET["query"] ?? "";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT `name` FROM `airlines` WHERE `iata_code` LIKE '%".$query."%' LIMIT 1";

$result = $conn->query($sql);

$airlines = [];
while ($row = $result->fetch_assoc()) {
    $airlines[] = $row;
}

echo json_encode($airlines);