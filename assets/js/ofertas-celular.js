var particular = {
    init: function() {
        this.old();
    },
    old: function() {

        $(function() {
$(".numeric").numeric();
            var form = $('#cel_form');
            form.submit(function() {
                if (form.valid()) {
                    $.post(form.attr('action'), form.serialize(), function() {
                        alert('Te has registrado con éxito en nuestra base de datos para recibir las ofertas y novedades por email.');
                        form[0].reset();
                    }).fail(function() {
                        alert("Error: Tu consulta no se ha podido enviar");
                    });
                }
                return false;
            });
        });

    }
};


function resetForm() {
    document.getElementById("cel_form").reset();
}
