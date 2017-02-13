 var item_width;
var particular = {
    init: function() {
        this.closeModal();
        this.old();
    },
    closeModal: function() {

        $(document).on('click', '.cerrar-popup', function() {
            $('#modal-popup').toggle();
            $('#modal-content').toggle();
        });

    },
    old: function() {

        $('.leer-mas').hover(function() {
            $(this).attr('src', '/assets/images/home/leer-mas-over.png');
        },
                function() {
                    $(this).attr('src', '/assets/images/home/leer-mas.png');
                });

        var options = {
            $AutoPlay: true,
            $AutoPlayInterval: 5000,
            $BulletNavigatorOptions: {//[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$, //[Required] Class to create navigator instance
                $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $Steps: 1, //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1, //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 8, //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 8, //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1, //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                $ActionMode: 1
            }
        };
		
		AdjustCarousel();
		

        jssor_slider1 = new $JssorSlider$('slider1_container', options);

      
        ScaleSlider();
        if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
          
            $(window).bind('resize', ScaleSlider);
        }

  
		item_width = $('#ofertas_carousel li').outerWidth();
        var left_value = item_width * (-1);

        $('#ofertas_carousel li:first').before($('#ofertas_carousel li:last'));

        
        $('#ofertas_carousel ul').css({'left': $("#ofertas_carousel ul li").width()*-1});
		var animating=false;
        $('#ofertas_carousel_left').click(function() {
			NextSlide();
        });
		
		var auxInvertval= setInterval(function(){AutoSlide()},1000);
		var waitTimeSeconds=5;
		var auxSeconds=0;
		function AutoSlide(){
			auxSeconds++;
			if(auxSeconds>=waitTimeSeconds&&!animating){
				PrevSlide();
			}
		}
		
		function NextSlide(){
			auxSeconds=0;
			if(!animating){
				animating=true;
            var left_indent = parseInt($('#ofertas_carousel ul').css('left')) + $("#ofertas_carousel ul li").width();
            $('#ofertas_carousel ul').animate({'left': left_indent}, 600, function() {
                $('#ofertas_carousel li:first').before($('#ofertas_carousel li:last'));
                $('#ofertas_carousel ul').css({'left': $("#ofertas_carousel ul li").width()*-1});
				animating=false;
            });
          
			}
		}
		
		function PrevSlide(){
			auxSeconds=0;
			if(!animating){
				animating=true;
            var left_indent = parseInt($('#ofertas_carousel ul').css('left')) - $("#ofertas_carousel ul li").width();
            $('#ofertas_carousel ul').animate({'left': left_indent}, 600, function() {
                $('#ofertas_carousel li:last').after($('#ofertas_carousel li:first'));
                $('#ofertas_carousel ul').css({'left': $("#ofertas_carousel ul li").width()*-1});
				animating=false;
            });
			}
		}

        $('#ofertas_carousel_right').click(function() {
            
			PrevSlide();
           
        });

        var autoOfertas;
       

    }
};

var jssor_slider1;

function ScaleSlider() {
    var parentWidth = $('#slider1_container').parent().width();
    if (parentWidth) {
        jssor_slider1.$SetScaleWidth(parentWidth);
    } else {
        window.setTimeout(ScaleSlider, 30);
    }

}

function AdjustCarousel(){
	if(!$("#ofertas_carousel img").height()){
		setTimeout(function(){AdjustCarousel();},100);
		return;
	}
	
		console.log($("#ofertas_carousel img").height());
		$("#ofertas_carousel ul").css("height",$("#ofertas_carousel img").height()+"px");
		$("#ofertas_carousel ul").css("overflow","hidden");
		$("#ofertas_carousel ul li").css("width",$(".home_first_row .home_container_title h2").width()+"px");	

		$("#ofertas_carousel ul").css("width",$(".home_first_row .home_container_title h2").width()*3);
		$("#ofertas_carousel ul").css("left",$("#ofertas_carousel ul li").width()*-1);
		item_width=$("#ofertas_carousel ul li").width();
}

function init_iframe(window) {

    console.log(window);
}