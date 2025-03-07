<?php

require_once '../classes/AmadeusApi.php';

require_once '../includes/head.php';

?>
<body>
    <section class="flights-results-container">

        <?php require_once '../includes/header.php'; 

        /*
            DA FARE:
            1) Prendere solo i valori iata_code per la call api

        */

        // departure=Malpensa+International+Airport+%28MXP%29Milano&arrival=Coventry+Airport+%28CVT%29Coventry&departure_date=2025-03-07&return_date=&travelers=1
        $api = new AmadeusApi();
        $temp = $api->searchFlights($GET_["departure"],$GET_["arrival"], $GET_["departure_date"]);
        print_r($temp);
        echo $temp;

        ?>
    </section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>
