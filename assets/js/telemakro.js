var particular = {
    init: function() {
        this.old();
    },
    
    old: function() {
        var sucursales;

        $(function() {
            $('select').change(function() {
                showDetails(sucursales[$('select').val()]);
            });

            $.ajax({
                type: "GET",
                url: '/getSucursalesLocalidad',
                contentType: "application/json;",
                dataType: "json",
                success: function(data) {
                    sucursales = data;
                    $.each(sucursales, function(index, sucursal) {
                        addToSelect(index, sucursal);
                    });
                }
            });

        });
        /***********************************/
        $('select').change(function(e) {
            console.log(e.target);
            $(e.target).blur();
        });

        $('document').ready(function() {
            $('body').css('overflow-x', 'hidden');
        });
    }

};

function addToSelect(index, sucursal) {
    $("select").append('<option value=' + index + '>' + sucursal.localidad + '</option>');
}

function populateDetails(sucursal) {
    $('#email').html(sucursal.email);
    $('#telemakro').html(sucursal.telemakro);
    $('#horarios').html(sucursal.horarios);
    $('#sucursal').html(sucursal.localidad.toUpperCase());
}

function showDetails(sucursal) {
    populateDetails(sucursal);
    $('#horarios_div').show();
}
