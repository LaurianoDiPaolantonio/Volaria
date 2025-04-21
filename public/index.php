<?php

session_start();

require_once __DIR__.'/../includes/config.php';

require_once __DIR__.'/../includes/head.php';
    
?>
<body>

    <section id="homepage-search-container">

        <h1 class="h1-homepage" aria-hidden="true">Find flights in a simple search with Volaria</h1>

        <?php require_once '../includes/header.php'; ?>
        <?php echo $ciao; ?>

        <h2 class="h2-homepage">Compare and book flights in a simple search</h2>

        <div class="searchControls-grid">
            
            <form action="../pages/flights-results.php" method="GET" class="search_flights" id="searchForm">

                <div class="flight-select">
                    <div class="flight-select-input">
                        <label for="departure">From</label>
                        <input type="text" id="departure" name="departure" placeholder="Search airport, city" autocomplete="off" required>

                        <input type="hidden" id="departure-iata" name="from">

                        <div id="autocomplete-departure" class="dropdown-flights"></div>
                    </div>
                    <div class="form-check form-check-inline mt-2">
                        <input class="form-check-input search-nearby" type="checkbox" id="departure-nearby" value="option1">
                        <label class="form-check-label search-nearby" for="departure-nearby">Include nearby airports</label>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <label for="arrival">To</label>
                        <input type="text" id="arrival" name="arrival" placeholder="Search airport, city" autocomplete="off" required>

                        <input type="hidden" id="arrival-iata" name="to">

                        <div id="autocomplete-arrival" class="dropdown-flights"></div>
                    </div>
                    <div class="form-check form-check-inline mt-2">
                        <input class="form-check-input search-nearby" type="checkbox" id="arrival-nearby" value="option2">
                        <label class="form-check-label search-nearby" for="arrival-nearby">Include nearby airports</label>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <div class="dates-container departure-date">
                            <label for="departure-date">Depart</label>
                            <input type="date" id="departure-date" name="departure_date" required>
                        </div>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <div class="dates-container return-date">
                            <label for="return-date">Return</label>
                            <input type="date" id="return-date" name="return_date">
                        </div>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <div class="searchControls-traveler">
                            <label for="travelers">Travelers</label>
                            <input type="number" id="travelers" name="travelers" min="1" max="10" value="1" required>
                        </div>
                    </div>
                </div>

                <div class="search-flights-button">
                    <button type="submit" id="search-flights-button">Search</button>
                </div>
                

                <div class="searchControls-directFlight">
                    <div class="form-check">
                        <input class="form-check-input search-nearby" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label search-nearby" for="flexCheckDefault">
                            Direct flights
                        </label>
                    </div>
                </div>

            </form>

        </div>
        
    </section>


    <?php
    
    require_once __DIR__.'/../includes/footer.php';

    ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="..\assets\js\flights_form.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>
</html>