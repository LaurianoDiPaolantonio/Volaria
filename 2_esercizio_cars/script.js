
// Caricamento prima select del brand
$(document).ready(function () {

    $.getJSON("ajax.php", function (data) {

        let select = $("#brand");

        $.each(data, function (index, brand) {

            select.append($("<option>", {
                value: brand.id,
                text: brand.brand_name

            }));
        });
    });
});


// Caricamento modelli auto in base al brand selezionato

$('#brand').on('change', function() {

    let value = $(this).val();

    $.ajax({
        type: 'post',
        dataType: 'json',

        // url: Quale file usare per comunicare con il server
        url: 'http://localhost:4500/esercizi/4_ajax/2_esercizio_cars/ajax.php',
        data: {
            'brand' : value,
        },

        // Cosa fare prima di inviare di dati al server 
        beforeSend: function() {
            $('#model').html('<option value="" disabled>Selezionare modello</option>'
            );
        },

        // Cosa fare quando si ha conferma di risposta dal server 
        // Ricevuta risposta con i dati (data), si stampano nella seconda select
        success: function(data) {

            $("#model").prop("disabled", false);

            let select = $("#model");

            $.each(data, function (index, model) {

                select.append($("<option>", {
                    value: model.id,
                    text: model.model_name
                }));
            });
        }

    });
    
});



