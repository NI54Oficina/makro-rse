var particular = {
    init: function() {
        this.old();
    },
    old: function() {

        var lastOne = "";
        var lastOne2 = "";
        $(function() {
            $('#restaurantesSelect').change(function() {
                $('#details').show();
                $('#sucursal').html($(this).val());
                if (lastOne != "") {
                    document.getElementById(lastOne).style.display = "none";
                }
                if (lastOne2 != "") {
                    document.getElementById(lastOne2).style.display = "none";
                }
                lastOne = "sucursal" + $(this).val();
                document.getElementById(lastOne).style.display = "block";
            });
        });

        $(function() {
            $('#snackSelect').change(function() {
                $('#details').show();
                $('#sucursal').html($(this).val());
                if (lastOne != "") {
                    document.getElementById(lastOne).style.display = "none";
                }
                if (lastOne2 != "") {
                    document.getElementById(lastOne2).style.display = "none";
                }

                lastOne2 = "snack" + $(this).val();
                document.getElementById(lastOne2).style.display = "block";
            });
        });

        $('select').change(function(e) {
            console.log(e.target);
            $(e.target).blur();
        });

        $('document').ready(function() {
            $('body').css('overflow-x', 'hidden');
        });

    }
};
