<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__.'/../includes/config.php';
require_once __DIR__.'/../includes/head.php';
require_once __DIR__.'/../classes/AmadeusApi.php';

$flightId = $_GET['flight_id'];
$origin = $_GET['from'];
$destination = $_GET['to'];
$departureDate = $_GET['departure_date'];
$returnDate = $_GET['return_date'] ?? null;
$travelers = $_GET['travelers'] ?? 1;

$api = new AmadeusAPI();
$response = $api->searchFlights($origin, $destination, $departureDate, $travelers, $returnDate);
//print_r($response);

// http://localhost:4500/volaria/pages/flight-details.php?flight_id=4&from=JFK&to=MIA&departure_date=2025-04-23&return_date=&travelers=1

?>
<body>

    <section class="flight-details-header-container">
        <?php require_once __DIR__.'/../includes/header.php'; ?>
    </section>


    Flight n°<?php echo $_GET["flight_id"] ?>
    From: <?php echo $_GET["from"] ?>
    To: <?php echo $_GET["to"] ?>
    date: <?php echo $_GET["departure_date"] ?>
    travelers: <?php echo $_GET["travelers"] ?>

    <?php

    foreach($response["data"] as $flight) {
        if ($flight["id"] === $flightId) {
            $selectedFlight = $flight;
            break;
        }
    }

    // IL VOLO SELEZIONATO E' DENTRO $selectedFlight. ORA LO DEVO MOSTRARE I DETTAGLI DESIDERATI

    ?>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>

<?php
    
    require_once __DIR__.'/../includes/footer.php';

?>