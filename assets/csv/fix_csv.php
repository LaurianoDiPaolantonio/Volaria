<?php

/*
    Questo file esiste unicamente per risolvere i problemi dati da vari errori ed incongruenze, all'interno dei files CSV usati per popolare il database. Riscrive i files in modo da non creare errori in upload tramite phpMyAdmin
*/


fix_countries();
fix_airlines();
fix_airports();



function fix_countries() {

    if (($handleRead = fopen("original-files/countries.csv", "r")) !== FALSE && ($handleWrite = fopen('countries-fixed.csv', 'w')) !== FALSE) {

        $id = 1;

        while (($data = fgetcsv($handleRead)) !== FALSE) {

            // Aggiungo id alle varie righe
            array_unshift($data, $id++);
            fputcsv($handleWrite, $data);

        }

        fclose($handleRead);
        fclose($handleWrite);
        echo "I dati sono stati letti e scritti correttamente nel file CSV.";

    } else {
        echo "Errore nell'aprire i file.";
    }
}
   
function fix_airlines() {

    if (($handleRead = fopen("original-files/airlines.csv", "r")) !== FALSE && ($handleWrite = fopen('airlines-fixed.csv', 'w')) !== FALSE) {

        while (($data = fgetcsv($handleRead, 1000, ",")) !== FALSE) {

            foreach ($data as $i => $value) {

                // Rimuovo vari \N, N/A, e caratteri speciali posizionati al posto di valori NULL all'interno del file
                if (trim($value) === "\\N" || empty(trim($value)) || $value === "N/A" || ($i > 1 && preg_match('/[+\-?;=\\\:*^]/', $value))) {
                    $data[$i] = 'NULL';
                }

            }

            fputcsv($handleWrite, $data);
        }

        fclose($handleRead);
        fclose($handleWrite);
        echo "I dati sono stati letti e scritti correttamente nel file CSV.";
        
    } else {
        echo "Errore nell'aprire i file.";
    }

}

function fix_airports() {

    if (($handleRead = fopen("original-files/airports.csv", "r")) !== FALSE && ($handleWrite = fopen('airports-fixed.csv', 'w')) !== FALSE) {

        while (($data = fgetcsv($handleRead, 1000, ",")) !== FALSE) {

            foreach ($data as $i => $value) {

                // Sostituisco \N con NULL
                if (trim($value) === "\\N") {
                    $data[$i] = 'NULL';
                }

            }

            fputcsv($handleWrite, $data);
        }

        fclose($handleRead);
        fclose($handleWrite);
        echo "I dati sono stati letti e scritti correttamente nel file CSV.";
        
    } else {
        echo "Errore nell'aprire i file.";
    }
}






