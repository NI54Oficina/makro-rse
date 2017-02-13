var particular = {
    init: function() {
        this.old();
    },
    old: function() {

        var _infoBox;
        var infoboxTemplate = '<h3 class="title">{LOCALIDAD}</h3>' +
                '<h5><span class="label"> Direcci&oacute;n: </span>{DIRECCION}</h5>' +
                '<h5><span class="label"> Tel&eacute;fono: </span>{TELEFONO}</h5>' +
                '<h5><span class="label"> Horarios: </span>{HORARIOS}</h5>' +
                '<h5><span class="label"> Telemakro: </span>{TELEMAKRO}</h5>' +
                '<h5><span class="label"> E-mail: </span>{MAIL}</h5>';

        var markers = {};
        var sucursales={};
        var argentinaLatLng = new google.maps.LatLng(-34.416097, -63.6166);
        var map;

        function initialize() {
            $.ajax({
                type: "GET",
                url: '/getSucursales',
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    sucursales = data;
                    createMap(sucursales);
                }
            });
        }

        function createMap(sucursales) {
            var mapOptions = {
                zoom: 5,
                center: argentinaLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			
			$("#cantidadSucursales span").html(sucursales.length+" sucursales");
			$("#cantidadSucursales").show();

            $.each(sucursales, function(index, sucursal) {
                addToSelect(sucursal);
                var marker = createMarker(map, new google.maps.LatLng(sucursal.lat, sucursal.lng), sucursal.localidad,sucursal);
				console.log("index "+index);
				console.log(sucursal);
                markers[index]=marker;
                google.maps.event.addListener(marker, 'click', function() {
                    map.setZoom(13);
                    map.setCenter(marker.getPosition());
                    createInfoBox(map, marker, sucursal);
                    showDetails(sucursal);
                  
                });
            });
			
			
			$.each(sucursalesSelect, function(index, provincia) {
				var sucursalId;
					console.log(index);
					console.log(provincia);
					$("#interior_select").append('<option value=' + provincia[0] + '>' + index + '</option>');
					if(provincia.length>1){
						console.log("entra multi "+index);
						multiSucursal.push(provincia[0]);
					}
				
				
			});
			
			$.each(sucursalesGBASelect, function(index, sucursal) {
					
					$("#bsas_select").append('<option value=' + sucursal.markerIndex + '>' + sucursal.localidad + '</option>');
				
			});
			
        }
		var sucursalesSelect={};
		
		var sucursalesGBASelect=[];
		var multiSucursal=[];
		var auxIndex=0;
        function addToSelect(sucursal) {
			;
			sucursal.markerIndex=auxIndex;
			if (sucursal.provincia === 'Gran Buenos Aires') {
				sucursalesGBASelect.push(sucursal);
			}else{
				if(typeof sucursalesSelect[sucursal.provincia] === 'undefined'){
					sucursalesSelect[sucursal.provincia]= [];
				}
				sucursalesSelect[sucursal.provincia].push(sucursal.markerIndex);
			}
			 auxIndex++;
           
        }

        function createInfoBox(map, marker, sucursal) {
            var myOptions = {
                content: createInfoboxHtml(createInfoboxDetails(sucursal)),
                alignBottom: true,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-114, -55), // Desfase del cartel con respecto a la burbuja
                zIndex: null,
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(0, 60), // margen superior del cartel con el borde superior del mapa
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };

            // Si ya hay un infoBox abierto lo cierro
            if (_infoBox) {
                _infoBox.close();
            }

            _infoBox = new InfoBox(myOptions);
            // Escucho el evento para poder cerrar la ventana de info
            google.maps.event.addListener(_infoBox, 'domready', function() {
                jQuery('.IFclose', '.infoBox').unbind('click', closeInfoBox);
                jQuery('.IFclose', '.infoBox').bind('click', closeInfoBox);
            });
            _infoBox.open(map, marker);
        }

        function closeInfoBox(e) {
            e.preventDefault();
            _infoBox.close();
        }

        // Devuelve el HTML de la cartela de informacion de la burbuja
        function createInfoboxHtml(contenido) {
            var boxText = document.createElement("div");
            boxText.innerHTML = "<div class='IFcontainer'>" +
                    "<a href='#' class='IFclose'></a>" +
                    "<div id='IFcontenido'>" + contenido + "</div>" +
                    "<div class='IFcorner'></div>" +
                    "</div>";
            return boxText;
        }

        function createMarker(map, latLng, title,sucursal) {
            var image = 'assets/images/marker.png';
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: title,
                icon: image
            });
			marker.provincia= sucursal.provincia;
			marker.sucursal= sucursal;
            return marker;
        }

        function createInfoboxDetails(sucursal) {
            return infoboxTemplate.replace('{LOCALIDAD}', sucursal.localidad)
                    .replace('{DIRECCION}', sucursal.direccion)
                    .replace('{TELEFONO}', sucursal.telefono)
                    .replace('{HORARIOS}', sucursal.horarios)
                    .replace('{TELEMAKRO}', sucursal.telemakro)
                    .replace('{MAIL}', sucursal.email);
        }

        function populateDetails(sucursal) {
            $('#direccion').html(sucursal.direccion);
            $('#gerente').html(sucursal.gerente);
            $('#telefono').html(sucursal.telefono);
            $('#email').html(sucursal.email);
            $('#telemakro').html(sucursal.telemakro);
            $('#horarios').html(sucursal.horarios);
            $('#sucursal').html(sucursal.localidad.toUpperCase());
			if(sucursal.restaurant==1){
				$('#restaurant').show();
			}else{
				$('#restaurant').hide();
			}
			if(sucursal.estacion==1){
				$('#estacion').show();
			}else{
				 $('#estacion').hide();
			}
           
        }

        function showDetails(sucursal) {
            populateDetails(sucursal);
            $('#details').show();
        }

        function hideMarkers(id) {
            $.each(markers, function(index, marker) {
                marker.setVisible(false);
            });

            markers[id].setVisible(true);
        }

        function showAllMarkers() {
            $.each(markers, function(index, marker) {
                marker.setVisible(true);
                _infoBox.close();
            });
            map.setZoom(5);
            map.setCenter(argentinaLatLng);
        }

       

        google.maps.event.addDomListener(window, 'load', initialize);

        $(function() {
            $('#interior_select').change(function() {
              
             
                if (this.value) {
				
					if(multiSucursal.indexOf(parseInt(this.value))>-1){
						console.log("multi");
						var auxSucursales= sucursalesSelect[markers[this.value].provincia];
						$("#multiple_interior_select").html("<option value='' selected >Selecciona una ciudad</option>");
						$.each(auxSucursales, function(index, value) {
								
								$("#multiple_interior_select").append('<option value=' + value + '>' + markers[value].sucursal.localidad + '</option>');
							
						});
						$('#bsas_select').val("");
						$("#last_select").show();
					}else{
					   if (_infoBox)
						_infoBox.close();
						$('#bsas_select').val("");
						hideMarkers(this.value);
						console.log(markers[this.value]);
						google.maps.event.trigger(markers[this.value], 'click', {
						latLng: new google.maps.LatLng(0, 0)
						});
						$("#last_select").hide();
						
					}
                }
                else {
                    showAllMarkers();
                }
            });
			
			  $('#multiple_interior_select').change(function() {
				   if (_infoBox)
                    _infoBox.close();
					if (this.value) {
						$('#bsas_select').val("");
						hideMarkers(this.value);
						console.log(markers[this.value]);
						google.maps.event.trigger(markers[this.value], 'click', {
						latLng: new google.maps.LatLng(0, 0)
						});
						
					}
					else {
						showAllMarkers();
					}
			  });

			$('#bsas_select').change(function() {
				   if (_infoBox)
                    _infoBox.close();
					if (this.value) {
						$("#last_select").hide();
						$('#interior_select').val("");
						hideMarkers(this.value);
						console.log(markers[this.value]);
						google.maps.event.trigger(markers[this.value], 'click', {
						latLng: new google.maps.LatLng(0, 0)
						});
					
					}
					else {
						showAllMarkers();
					}
			  });

          

        });

    }
};
