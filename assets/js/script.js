
/* ---------------- BURGER MENU -------------- */

$('button.burger-menu').click(function() {

    $('.burger').toggleClass('open');

});


/* --------------- HOMEPAGE SEARCH FORM ----------------- */

// Visualizzazione della data di oggi nell'input departure_date
document.getElementById("departure_date").value = new Date().toISOString().split('T')[0];






