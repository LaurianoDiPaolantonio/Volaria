<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__.'/../../classes/AmadeusApi.php';

$origin = $_GET['from'];
$destination = $_GET['to'];
$departureDate = $_GET['departure_date'];
$returnDate = $_GET['return_date'] ?? null;
$travelers = $_GET['travelers'] ?? 1;

$api = new AmadeusApi();
$result = $api->searchFlights($origin,$destination, $departureDate, $travelers, $returnDate);

header('Content-Type: application/json');
echo json_encode($result);
