<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__.'/../includes/config.php';
require_once __DIR__.'/../includes/head.php';


?>
<body>
    <section class="flights-results-header">

        <?php require_once '../includes/header.php'; 

        /*
            Esempio di URL:

            1) http://localhost:4500/volaria/pages/flights-results.php?from=JFK&to=MIA&departure_date=2025-03-09&return_date=&travelers=1

        */

        // Display of selected cities, IATA codes, and dates
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        $sql_from = "SELECT DISTINCT city FROM airports WHERE iata_code LIKE '".$_GET["from"]."'";
        $sql_to = "SELECT DISTINCT city FROM airports WHERE iata_code LIKE '".$_GET["to"]."'";

        $result_from = $conn->query($sql_from);
        $result_to = $conn->query($sql_to);


        if ($result_from->num_rows>0 && $result_to->num_rows>0) {
            while (($row_from = $result_from->fetch_assoc()) && ($row_to = $result_to->fetch_assoc())) {
                ?>
                <div class="flights-results-summary">
                    <h4>
                        <?php
                        echo $row_from["city"]." (".$_GET["from"].") - ".$row_to["city"]." (".$_GET["to"].") ";
                        ?>
                    </h4>
                    <h4>
                        <?php
                        // To show dates in EU format (dd/mm/yyyy) rather than ISO 8601 format (yyyy-mm-dd)
                        $depart_date = date("d/m/Y", strtotime($_GET["departure_date"]));

                        if (!empty($_GET["return_date"])) {
                            $return_date = date("d/m/Y", strtotime($_GET["return_date"]));
                            echo $depart_date." - ".$return_date;
                        } else {
                            echo $depart_date;
                        }
                        
                        ?>
                    </h4>
                </div>
                <?php
            }
        }
        ?>
    </section>

    <section class="flights-results-container">

        <div class="flights-results-options"></div>

        <div class="flights-list"></div>



    </section>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="../assets/js/flights_results.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
