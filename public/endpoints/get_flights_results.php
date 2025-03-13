<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__.'/../../classes/AmadeusApi.php';

$api = new AmadeusApi();
$result = $api->searchFlights($_GET["from"],$_GET["to"], $_GET["departure_date"], $_GET["travelers"]);

header('Content-Type: application/json');
echo json_encode($result);
