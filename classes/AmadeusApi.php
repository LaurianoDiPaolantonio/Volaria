<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

/*
    curl "https://test.api.amadeus.com/v1/security/oauth2/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}"

    local date and time in ISO8601 YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00


    ================== ESEMPIO DI CHIAMATA ANDATA A BUON FINE (200) ==================

    https://test.api.amadeus.com/v2/shopping/flight-offers?adults=1&departureDate=2025-03-10&originLocationCode=JFK&destinationLocationCode=PAR

    
    base url: test.api.amadeus.com/v2

    
    -------- RISPOSTA API: --------

    "data": [
        {
            "type": "flight-offer",
            "id": "1",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2025-03-31",
            "lastTicketingDateTime": "2025-03-31",
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT4H",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "JFK",
                                "at": "2025-03-31T10:00:00"
                            },
                            "arrival": {
                                "iataCode": "CDG",
                                "at": "2025-03-31T20:00:00"
                            },
                            "carrierCode": "6X",
                            "number": "1563",
                            "aircraft": {
                                "code": "744"
                            },
                            "operating": {
                                "carrierCode": "6X"
                            },
                            "duration": "PT4H",
                            "id": "1",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "EUR",
                "total": "57.27",
                "base": "30.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "57.27"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6X"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "57.27",
                        "base": "30.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "1",
                            "cabin": "ECONOMY",
                            "fareBasis": "GLINKERS",
                            "class": "G"
                        }
                    ]
                }
            ]
        },

*/

require_once __DIR__ . '/../includes/config.php';

class AmadeusApi {

    private $client_id = AMADEUS_API_KEY;
    private $client_secret = AMADEUS_API_SECRET;
    private $url = "https://test.api.amadeus.com/v1/security/oauth2/token";
    private $access_token;
    private $token_file = __DIR__."/../includes/token.json";
    private $token_expires_at;


    public function __construct() {
        $this->loadToken();
    }


    // Per controllare se il token esiste ed è ancora valido
    private function loadToken() {
        
        if (file_exists($this->token_file)) {
            $data = json_decode(file_get_contents($this->token_file), true);
            if ($data && isset($data["access_token"]) && time() < $data["expires_at"]) {
                $this->access_token = $data["access_token"];
                $this->token_expires_at = $data["expires_at"];
                return;
            }
        }
        // Se il token non è valido, ne genera uno nuovo
        $this->authenticate();

    }


    // Per ottenere il token di accesso e salvarlo in un file JSON
    private function authenticate() {

        $url = "https://test.api.amadeus.com/v1/security/oauth2/token";
        $data = [
            "grant_type"    => "client_credentials",
            "client_id"     => $this->client_id,
            "client_secret" => $this->client_secret
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/x-www-form-urlencoded"]);

        $response = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($response, true);

        if (isset($result["access_token"])) {
            $this->access_token = $result["access_token"];
            $this->token_expires_at = time() + $result["expires_in"];

            file_put_contents($this->token_file, json_encode([
                "access_token" => $this->access_token,
                "expires_at"   => $this->token_expires_at
            ]));

        } else {
            die("Errore nell'autenticazione: " . json_encode($result));
        }
    }

     // Controllo se il token è valido prima di fare richieste API
     private function ensureValidToken() {
        if (!$this->access_token || time() >= $this->token_expires_at) {
            $this->authenticate();
        }
    }

    // Ricerca voli
    public function searchFlights($origin, $destination, $date, $travelers) {

        // Controllo validità token
        $this->ensureValidToken();

        $url = "https://test.api.amadeus.com/v2/shopping/flight-offers";
        $params = http_build_query([
            "adults" => $travelers,
            "departureDate" => $date,
            "originLocationCode" => $origin,
            "destinationLocationCode" => $destination,
        ]);

        $ch = curl_init($url . "?" . $params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . $this->access_token
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    

}




