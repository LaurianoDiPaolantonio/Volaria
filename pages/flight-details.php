<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__.'/../includes/config.php';
require_once __DIR__.'/../includes/head.php';

// http://localhost:4500/volaria/pages/flight-details.php?flight_id=4&from=JFK&to=MIA&departure_date=2025-04-23&return_date=&travelers=1

?>
<body>
    Flight n°<?php echo $_GET["flight_id"] ?>
    From: <?php echo $_GET["from"] ?>
    To: <?php echo $_GET["to"] ?>
    date: <?php echo $_GET["departure_date"] ?>
    travelers: <?php echo $_GET["travelers"] ?>
</body>

<?php
    
    require_once __DIR__.'/../includes/footer.php';

?>