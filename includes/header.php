
<?php require_once 'paths.php'; 
/*
    Da collegare gli href
*/

?>

<header>
    <nav class="nav-header">
        <ul class="ul-logo">
            <a href="../public/index.php">
                <li><img src="<?= IMG_PATH ?>volaria-logo.svg" alt="logo Volaria airplane" class="header-icon"></li>
                <li><h3>Volaria</h3></li>
            </a>
        </ul>
        <ul class="ul-login">
            <li>
                <a href="" class="button">
                    <span>Help</span>
                </a>
            </li>
            <li>
                <a href="" class="button log-in">
                    <img src="<?= IMG_PATH ?>user-icon.svg" alt="user login" class="img-black header-icon">
                    <img src="<?= IMG_PATH ?>user-icon-white.svg" alt="user login" class="img-white header-icon">
                    <span>Log in</span>
                </a>
            </li>
            <li>
                <button class="button burger-menu">
                    <img src="<?= IMG_PATH ?>burger-icon.svg" alt="menu" class="img-black header-icon">
                    <img src="<?= IMG_PATH ?>burger-icon-white.svg" alt="menu" class="img-white header-icon">
                    <nav class="burger">
                        <a href="">Services</a>
                        <a href="">Contacts</a>
                        <a href="">Support</a>
                    </nav>
                </button>
            </li>
        </ul>
    </nav>

</header>