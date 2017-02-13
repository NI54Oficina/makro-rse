window.onload= function(){
	console.log("sucursales back");
	var styleAux= '<style>label.error{position:absolute;display:none;}.errorLabel{color:red;}.errorList{color:red;}.errorList strong{text-transform: capitalize;}</style>';
	$("body").append(styleAux);
	$( "#latAux" ).change(function() {
		$("#lat").val( CheckCoordinates(this));
		
	});
	$( "#lngAux" ).change(function() {
		$("#lng").val( CheckCoordinates(this));
	});
	$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
	});
	function CheckCoordinates(inputeObject){
		
		var inputValue= $(inputeObject).val();
		if(inputValue==""||inputValue.match(/[a-z]/i)){
			return "";
		}
		if(inputValue.indexOf("°")==-1&&inputValue.indexOf("'")==-1&&inputValue.indexOf("\"")==-1){
			console.log("correct input");
			if(inputValue.indexOf("-")==-1){
				
				return "-"+inputValue;
			}else{
				
				return inputValue;
			}
		}
		var grados= parseInt(inputValue.substring(0,inputValue.indexOf("°")));
		var minutos= parseInt(inputValue.substring(inputValue.indexOf("°")+1,inputValue.indexOf("'")));
		var segundos= parseInt(inputValue.substring(inputValue.indexOf("'")+1,inputValue.indexOf("\"")));
		
		console.log("grados "+grados);
		console.log("minutos "+minutos);
		console.log("segundos "+segundos);
		
		
		if(inputValue.indexOf("°")<inputValue.indexOf("'")&&inputValue.indexOf("'")<inputValue.indexOf("\"")){
			
			var auxCoordenadas= grados+minutos/60+segundos/3600;
			if(auxCoordenadas>0){
				auxCoordenadas*=-1;
			}
			
			return auxCoordenadas;
		}else{
			
			return "";
		}
	}
	$("#formSucursal").validate({
		showErrors: function(errorMap, errorList) {		
			for (var k in errorMap){
				if (errorMap.hasOwnProperty(k)) {
					 $("[name="+k+"]").parent().find("label").addClass("errorLabel");
					 $(".errorList").append("<p><strong>"+k+":</strong> "+errorMap[k]+"</p>");
				}
			}
		},
		rules:{
			
			email:{
				email:true
			}
		},
		onfocusout: true,
		onkeyup: false,
		onclick: false
	});

	$("body").on("mousedown","#buttonSend",function(){
		
		$(".errorList").html("");
		
		var auxLat=CheckCoordinates($("#latAux"));
		if(auxLat==""){
			$("#labelLatitud").css('color',"red");
			$(".errorList").append("<p><strong>Latitud:</strong> Debe colocar una latitud valida</p>");
			return;
		}else{
			$("#labelLatitud").css('color',"#555");
			$("#lat").val(auxLat);
		}
		var auxLng=CheckCoordinates($("#lngAux"));
		if(auxLng==""){
			$(".errorList").append("<p><strong>Longitud:</strong> Debe colocar una longitud valida</p>");
			$("#labelLongitud").css('color',"red");
			return;
		}else{
			$("#labelLongitud").css('color',"#555");
			$("#lng").val(auxLng);
		}
		$("#formSucursal label").removeClass("errorLabel");
		
		if($("#formSucursal").valid()){
			$("#formSucursal").submit();
		}
				
	});
	
}