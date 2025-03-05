<?php

/*
    Provare, partendo dalle tabelle brand e model utilizzate negli esercizi precedenti, a popolare la select dei modelli solo quando viene selezionato un brand dalla select precedente
    gestire tutte le casistiche: select inizialmente non selezionabile, si attiva solo quando viene scelto un brand, se cambio il brand si deve aggiornare la select solo con i modelli di quel brand


    Generalmente si usa un singolo file php per form ajax

*/

$serverName = "DB";
$username = "db_user_3";
$password = "password";
$database = "Cars2API";
$conn = new mysqli($serverName, $username, $password, $database);

// Si verifica se la connessione ha successo
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

if (!isset($_POST["brand"])) {

    $sql = "SELECT * FROM `brands`";

    $result = $conn->query($sql);

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
    die();
}



if (isset($_POST["brand"])) {

    $sql = "SELECT * FROM `models` WHERE `id_brand` = ".$_POST["brand"]." ORDER BY `models`.`model_name` ASC";

    $result = $conn->query($sql);

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
    die();


}

