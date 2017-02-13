var particular = {
    init: function() {
        this.old();
    },
    old: function() {


        $(function() {
            $(".numeric").numeric();

            var form = $('#form_email');

            form.submit(function() {
                if (form.valid()) {
					ShowLoading();
                    $.post(form.attr('action'), form.serialize(), function() {
                        alert('Te has registrado con éxito en nuestra base de datos para recibir las ofertas y novedades por email.');
                        form[0].reset();
						ShowLoading();
                    }).fail(function() {
                        alert("Error: Tu consulta no se ha podido enviar");
						ShowLoading();
                    });
                }
                return false;
            });

            $("input:checkbox").click(function() {
                if ($(this).is(":checked")) {
                    var group = "input:checkbox[name='" + $(this).attr("name") + "']";
                    $(group).prop("checked", false);
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
        });

        /********************************/
        $('select').change(function(e) {
            console.log(e.target);
            $(e.target).blur();
        });

        $('document').ready(function() {
            $('body').css('overflow-x', 'hidden');
        });

    }
};

function resetForm() {
    document.getElementById("form_email").reset();
}
