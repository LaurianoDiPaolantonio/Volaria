<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../classes/AmadeusApi.php';

require_once '../includes/head.php';

?>
<body>
    <section class="flights-results-container">

        <?php require_once '../includes/header.php'; 

        /*
            1) http://localhost:4500/volaria/pages/flights-results.php?from=JFK&to=MIA&departure_date=2025-03-09&return_date=&travelers=1

        */

        $api = new AmadeusApi();
        $result = $api->searchFlights($_GET["from"],$_GET["to"], $_GET["departure_date"], $_GET["travelers"]);

        //print_r($temp);

        // Display of cities and IATA codes
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        $sql_from = "SELECT DISTINCT city FROM airports WHERE iata_code LIKE '".$_GET["from"]."'";
        $sql_to = "SELECT DISTINCT city FROM airports WHERE iata_code LIKE '".$_GET["to"]."'";

        $result_from = $conn->query($sql_from);
        $result_to = $conn->query($sql_to);

        if ($result_from->num_rows>0 && $result_to->num_rows>0) {
            while (($row_from = $result_from->fetch_assoc()) && ($row_to = $result_to->fetch_assoc())) {
                ?>
                <div class="flight-search-summary">
                    <h4>
                        <?php
                        echo $row_from["city"]." (".$_GET["from"].") - ".$row_to["city"]." (".$_GET["to"].")";
                        ?>
                    </h4>
                </div>
                <?php
            }
        }

        ?>

    </section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>
