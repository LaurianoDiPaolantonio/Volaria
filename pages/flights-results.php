<?php

require_once '../classes/AmadeusApi.php';

require_once '../includes/head.php';

?>
<body>
    <section class="flights-results-container">

        <?php require_once '../includes/header.php'; 

        /*
            DA FARE:
            1) http://localhost:4500/volaria/pages/flights-results.php?from=JFK&to=MIA&departure_date=2025-03-09&return_date=&travelers=1
            
            Non stampa niente anche se su postman funziona

        */

        // http://localhost:4500/volaria/pages/flights-results.php?from=JFK&to=MIA&departure_date=2025-03-09&return_date=&travelers=1

        $api = new AmadeusApi();
        $temp = $api->searchFlights($GET_["from"],$GET_["to"], $GET_["departure_date"]);
        print_r($temp);
        echo $temp;

        ?>
    </section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>
