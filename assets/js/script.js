$(document).ready(function() {
    console.log("jQuery è caricato e il DOM è pronto!");
});


/* ---------------- BURGER MENU -------------- */

$('button.burger-menu').click(function() {

    $('.burger').toggleClass('open');

});

