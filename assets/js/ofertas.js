var particular = {
    init: function() {
        
        this.toggleCatalogos();
    },
    
    toggleCatalogos: function() {

        $(document).on('change', 'select', function(e) {
            
            var value = $(this).val();
            var catalogos =  $('#catalogos');
            var separador =  $('.separador');
            
            catalogos.show();
            separador.show();
            catalogos.find('div').hide();
            
            switch(value){
                case '1':
                     $("div.tipo_1").show();
                      $("div.tipo_4").show();
                      break;
                case '2':
                     $("div.tipo_2").show();
                     $("div.tipo_4").show();
                      break;
                    
            }
            
            if(value === '0'){
                separador.eq(0).hide();
            }
            $("#catalogos .oferta").removeClass("oferta-first-child");
			$("#catalogos .oferta:visible").eq(0).addClass("oferta-first-child");
			$("#catalogos .oferta:visible").eq(3).addClass("oferta-first-child");
			$("#catalogos .oferta:visible").eq(6).addClass("oferta-first-child");
			$("#catalogos .oferta:visible").eq(9).addClass("oferta-first-child");
            $(e.target).blur();
        });
    }
};
