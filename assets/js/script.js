
/* ---------------- BURGER MENU -------------- */

// Toggle of the burger menu
$('button.burger-menu').click(function() {

    $('.burger').toggleClass('open');

});

// Closes the menu if the user clicks outside
$(document).click(function(event) {
    if (!$(event.target).closest('.burger, .burger-menu').length) {
        $('.burger').removeClass('open');
    }
});







