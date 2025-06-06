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

        <div class="flights-results-options">
            <div class="flights-filters-container">
                <h4>Stops</h4>
                <div class="form-check">
                    <input class="form-check-input filter" type="checkbox" value="0" id="checkbox-direct">
                    <label class="form-check-label" for="checkbox-direct">
                        Direct
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input filter" type="checkbox" value="1" id="checkbox-1-stop">
                    <label class="form-check-label" for="checkbox-1-stop">
                        1 stop
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input filter" type="checkbox" value="2" id="checkbox-2-stops">
                    <label class="form-check-label" for="checkbox-2-stops">
                        2+ stops
                    </label>
                </div>
            </div>
            <div class="departure-time-slider-filter-container">
                <h4>Departure times:</h4>
                <div id="departureSlider"></div>
                <p>Selected times: <span id="timeRangeLabel">00:00 - 23:00</span></p>
            </div>
        </div>

        <div class="flights-list"></div>

        <div class="flights-list-sort-by">
            <span>Sort by </span>
            <select id="sort-flights-list">
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
            </select>
        </div>



    </section>


    <div class="loader"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/nouislider@15.7.0/dist/nouislider.min.js"></script>
    <script src="../assets/js/flights_results.js"></script>
    <script src="../assets/js/script.js"></script>
</body>

<?php
    
    require_once __DIR__.'/../includes/footer.php';

?>