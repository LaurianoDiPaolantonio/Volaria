<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

require_once '../includes/config.php';
//require_once "../classes/AmadeusApi.php";

/*
    Generalmente si organizzano i file PHP in cartelle separate per mantenere il progetto pulito e strutturato. Ecco una tipica organizzazione dei file in un progetto PHP:
    
    /mio_progetto
    │── /public          # Cartella pubblica accessibile dal web server
    │   ├── index.php    # Pagina principale
    │   ├── style.css    # Foglio di stile
    │   ├── script.js    # Script JavaScript
    │── /includes        # File PHP riutilizzabili (non accessibili direttamente dal web)
    │   ├── header.php   # Intestazione comune
    │   ├── footer.php   # Footer comune
    │   ├── config.php   # Configurazione globale (DB, costanti, ecc.)
    │── /classes         # Classi PHP per la programmazione ad oggetti
    │   ├── User.php     # Classe per gestire gli utenti
    │   ├── Database.php # Classe per la gestione del database
    │── /functions       # Funzioni generiche
    │   ├── auth.php     # Funzioni di autenticazione
    │   ├── helpers.php  # Funzioni di supporto
    │── /pages           # Pagine del sito (richiamate da index.php o direttamente)
    │   ├── login.php    # Pagina di login
    │   ├── dashboard.php# Pagina utente dopo il login
    │── /assets          # File statici (immagini, CSS, JS)
    │   ├── /css
    │   ├── /js
    │   ├── /img
    │── /uploads         # Cartella per i file caricati dagli utenti (se necessario)
    │── .htaccess        # Configurazione Apache se usi Apache
    │── composer.json    # Se usi Composer per le dipendenze PHP
    │── README.md        # Info sul progetto

*/
?>

<!DOCTYPE html>
<html lang="en">
<?php
    
    require_once '../includes/head.php';
    
?>
<body>

    <section id="homepage-search-container">

        <h1 class="h1-homepage" aria-hidden="true">Compare and book flights in a simple search</h1>

        <?php require_once '../includes/header.php'; ?>

        <h2 class="h2-homepage">Compare and book flights in a simple search</h2>

        <div class="searchControls-grid">
            
            <?php

            /*
                To-Do-List:
                - Caricare su database tutti gli aereoporti inclusi gli IATA codes, nazioni e città con aereoporto
                - Far funzionare una ricerca voli prestabilita
            */




            ?>
            <form action="../ajax/search_flight_form.php" method="POST" class="search_flights">

                <div class="flight-select">
                    <div class="flight-select-input">
                        <label for="departure">From</label>
                        <input type="text" id="departure" name="departure" placeholder="Search airport, city" autocomplete="off">
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
                        <input type="text" id="arrival" name="arrival" placeholder="Search airport, city" autocomplete="off">
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
                            <label for="departure_date">Departure</label>
                            <input type="date" id="departure_date" name="departure_date" required>
                        </div>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <div class="dates-container return-date">
                            <label for="return_date">Return</label>
                            <input type="date" id="return_date" name="return_date">
                        </div>
                    </div>
                </div>

                <div class="flight-select">
                    <div class="flight-select-input">
                        <div class="searchControls-traveler">
                            <label for="travelers">Travelers</label>
                            <input type="number" id="travelers" name="travelers" min="1" max="10" required>
                        </div>
                    </div>
                </div>

                <div class="search-flights-button">
                    <button type="submit">Search</button>
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
    
    require_once '../includes/footer.php';
    
    ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="..\assets\js\flights_form.js"></script>
    <script src="..\assets\js\script.js"></script>
</body>
</html>