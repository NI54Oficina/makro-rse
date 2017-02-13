var particular = {
    init: function() {
        this.old();
    },
    old: function() {
		var styleAux= '<style>label.error{position:absolute;display:none;}.errorLabel{color:red;}.errorList{color:red;}.errorList strong{text-transform: capitalize;}</style>';
					$("body").append(styleAux);
		$("#form_contacto").validate({
			showErrors: function(errorMap, errorList) {	
				$(".errorList").html("");
				for (var k in errorMap){
					if (errorMap.hasOwnProperty(k)) {
						 $("[name="+k+"]").parent().find("label").addClass("errorLabel");
						 $(".errorList").append("<p><strong>"+k+":</strong> "+errorMap[k]+"</p>");
					}
				}
			},
			rules:{
				telefono:{
					number:true
				},
				email:{
					email:true
				}
			},
			onfocusout: true,
			onkeyup: false,
			onclick: false
		});
        $(function() {
			
            var form = $('#form_contacto');
            form.submit(function() {
				if(!$("#form_contacto").valid()){
					return false;
				}
				$.post('/mailSender', form.serialize(), function() {
					alert('Tu consulta se envió con éxito, en breve será respondida. Muchas gracias.');
					form[0].reset();
				}).fail(function() {
					alert("Error: Tu consulta no se ha podido enviar");
				});
                return false;
            });
        });
    }
};
