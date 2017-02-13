var particular = {
    init: function() {
        this.old();
    },
    old: function() {

        (function(H) {
            H.className = H.className.replace(/\bno-js\b/, 'js')
        })(document.documentElement)

        /****************************/
        var book;
        var prop = 1.402;
        var fullscreen = false;
        var originalWidth;

        $("#email, #modal-background, #modal-close").click(function() {
            $("#modal-content,#modal-background").toggleClass("active");
        });

        $('#form_compartir').submit(function(evt) {
			evt.preventDefault();
            if ($('#form_compartir').valid()) {
                $('#enviandoButton').show();
                $('#enviarButton').hide();
				console.log("entra pre url");
				var currentUrl=""+window.location;
				if(currentUrl.indexOf("#")>0){
					console.log(currentUrl.substring(0,currentUrl.indexOf("#")));
				}else{
					console.log(currentUrl);
				}
				$("#url_input").attr("value",currentUrl);
				console.log($('#form_compartir').serialize());
				
				console.log("entra post url");
                $.post("/catalogoSender", $('#form_compartir').serialize(), function(data) {
                    $('#enviandoButton').hide();
                    $('#enviarButton').show();
                    alert("Se ha enviado el mail con éxito.");
                    $("#modal-content,#modal-background").toggleClass("active");
                });


            }
            return false;
        });
		
		var tmpImg = new Image();
		tmpImg.src=$("#features #cover").attr("data-image"); 
		$(tmpImg).one('load',function(){
			  orgWidth = tmpImg.width;
			  orgHeight = tmpImg.height;
		
		ResizeCatalogo();
		
		$( window ).resize(function() {
			ResizeCatalogo2();
		});

        book = $.wowBook("#features");
        for (var i = 0; i < book.pages.length; i++) {
            book.loadPage(i);
        }
        
        $("#nozoom").click(function() {
            book.zoom(1)
        });

        $('#Texto-descriptivo').hide();
		});
		
    }
};


function ResizeCatalogo(){
	prop= orgWidth/orgHeight;
		
        height = $(window).height();
        height = $(window).height()-100;
        width = height*prop;
		width= Math.floor(width)*2;
		if(width>$(window).width()){
			console.log("problema ancho");
			prop= orgHeight/orgWidth;
			width= Math.floor($(window).width()/2-50);
			height= Math.floor(width*prop);
			width*=2;
		}
		
        $('#features').wowBook({
            height: height
            , width: width
            , centeredWhenClosed: true
            , turnPageDuration: 1000
            , pageNumbers: false
            , flipSound: false
            , handleWidth: 100
            , zoomBoundingBox: '#features-wrapper'
			,scaleToFit: "#features-wrapper"
			,responsive: true
            , zoomMax: 5
            , transparentPages: false
            , zoomStep: 0.15
            , controls: {
                zoomIn: '#zoomin',
                zoomOut: '#zoomout',
                next: '#next',
                back: '#back',
                first: '#first',
                last: '#last',
                fullscreen: '#fullscreen',
                thumbnails: '#thumbs'
            }
            , thumbnailsPosition: 'left'
            , thumbnails: true
            , onZoom: function() {
                
            }
            , onShowPage: function(book, page, pageIndex) {
                if (page.onLeft || pageIndex === 0) {
                    $('#left_page_number').html(pageIndex + 1);
                }
            }
        }).css({'display': 'none', 'margin': 'auto'}).fadeIn(1000);
}

function ResizeCatalogo2(){
	
}