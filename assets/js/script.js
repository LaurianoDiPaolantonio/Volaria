
/* ---------------- BURGER MENU -------------- */

// Toggle del menu
$('button.burger-menu').click(function() {

    $('.burger').toggleClass('open');

});

// Chiude menu se utente clicca fuori
$(document).click(function(event) {
    if (!$(event.target).closest('.burger, .burger-menu').length) {
        $('.burger').removeClass('open');
    }
});


/* --------------- HOMEPAGE SEARCH FORM ----------------- */

// Visualizzazione della data di oggi nell'input departure_date
document.getElementById("departure_date").value = new Date().toISOString().split('T')[0];






