var loadingEnable=false;
$('.file').fileinput({
    language: 'es',
    showUpload: false,
    dropZoneEnabled: false,
    overwriteInitial: true,
    allowedFileExtensions: ["jpg", 'pdf', 'png', 'ico']
});

$('.summernote').summernote({height: 300});
$('.summernote-medio').summernote({height: 600});
$('.summernote-grande').summernote({height: 1000});

var global = {
    init: function() {

        $.fn.datepicker.defaults.language = "es";
        $.fn.datepicker.defaults.format = "yyyy-MM-dd";
        $.fn.datepicker.defaults.autoclose = true;
//        $.fn.datepicker.defaults.startDate = '0';
    }
};

$("document").ready(function(){
	loadingEnable=true;
	$("textarea").animate({opacity:1},100);
	$("body").on("mouseover",".tooltipLook",function(){
	
		if($(this).parent().length<2){
			$(this).append("<img src='/assets/images/preview/"+$(this).attr("previewUrl")+"'  />");
		}
	});
	$(document).on("click",".externalButton,.previewButton",function(){
		ShowLoading();
		if(typeof $(this).attr("previewSelector") === 'undefined'){
			window.open($(this).attr("href"));
			ShowLoading();
		}else{
			var urlToGo=$(this).attr("href");
			
			
			$.ajax({
				url: '/admin/preview',
				type: 'POST',
				
				data: {contentPreview: $($(this).attr("previewSelector")).val(),arrayAccess: $(this).attr("arrayAccess")},
				success: function(msg) {
					window.open(urlToGo);
					ShowLoading();
				}
			});
			
			
		}
  		
  	});
});

function ShowLoading(){
	if(loadingEnable){
		$(".loading-overlay").toggle(100);
	}
}