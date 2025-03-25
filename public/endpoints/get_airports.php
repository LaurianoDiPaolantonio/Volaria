<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once __DIR__.'/../../includes/config.php';

/*
    PHP file to query the database and return the retrieved airports 
    to assets/js/flights_form.js based on the user's search.
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


// If $_GET["query"] exists and has a value, it is used. Otherwise, an empty string "" is assigned.
$query = $_GET["query"] ?? "";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT id, name, city, iata_code FROM airports WHERE name LIKE ? OR city LIKE ? OR iata_code LIKE ? LIMIT 10";

$search = "%{$query}%";
$stmt = $conn->prepare($sql);

// The $search parameter is assigned to the three ? in the query, and the query is executed on the database.
$stmt->bind_param("sss", $search, $search, $search);
$stmt->execute();
$result = $stmt->get_result();

$airports = [];
while ($row = $result->fetch_assoc()) {
    $airports[] = $row;
}

echo json_encode($airports);