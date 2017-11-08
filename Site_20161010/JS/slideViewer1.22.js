jQuery(function(){
   jQuery("div.svw").prepend("<img src='IMGS/loading-small.gif' class='ldrgif' alt='Carregando...'/ >"); 
});
var j = 0;
jQuery.fn.slideView = function(settings) {
	  settings = jQuery.extend({
     easeFunc: "easeInOutExpo", /* <-- easing function names changed in jquery.easing.1.2.js */
     easeTime: 1000,
     toolTip: false
  }, settings);
	return this.each(function(){
		var container = jQuery(this);
		container.find("img.ldrgif").remove(); // removes the preloader gif
		container.removeClass("svw").addClass("stripViewer");		
		var pictWidth = container.find("li").find("img").width();
		var pictHeight = container.find("li").find("img").height();
		var pictEls = container.find("li").size();
		var stripViewerWidth = pictWidth*pictEls;
		container.find("ul").css("width" , stripViewerWidth); //assegnamo la larghezza alla lista UL	
		container.css("width" , pictWidth);
		container.css("height" , pictHeight);
		tamanho = 0;
		container.each(function(i) {
			jQuery(this).after("<div class='stripTransmitter' id='stripTransmitter" + j + "'><ul><\/ul><\/div>");
			jQuery(this).find("li").each(function(n) {
				jQuery("div#stripTransmitter" + j + " ul").append("<li><a title='" + jQuery(this).find("img").attr("alt") + "' href='#'>"+(n+1)+"<\/a><\/li>");
				tamanho++;														
			});
			
			currentObject = null;
			jQuery("div#stripTransmitter" + j + " a").each(function(z) {
				jQuery(this).bind("click", function(){
				currentObject = jQuery(this);
				jQuery(this).addClass("current").parent().parent().find("a").not(jQuery(this)).removeClass("current"); // wow!
				var cnt = - (pictWidth*z);
				jQuery(this).parent().parent().parent().prev().find("ul").animate({ left: cnt}, settings.easeTime, settings.easeFunc);
				return false;
				   });
			});
			
			modoAutomatico(pictWidth, settings, currentObject);
			
			jQuery("div#stripTransmitter" + j).css("width" , pictWidth);
			jQuery("div#stripTransmitter" + j + " a:eq(0)").addClass("current");
			if(settings.toolTip){
			container.next(".stripTransmitter ul").find("a").Tooltip({
				track: true,
				delay: 0,
				showURL: false,
				showBody: false
				});
			}
			});
		j++;
  });	
  
};


function modoAutomatico(pictWidth, settings, currentObject){
			pos = 0;
			timeOut = window.setInterval(function(){
				if(pos>=tamanho){
					pos = 0;
				}
				if(currentObject!=null){
					pos = jQuery(currentObject).html();
				}
				var cnt = - (pictWidth*pos);
				jQuery("div#stripTransmitter" + 0 + " a").eq(pos).parent().parent().parent().prev().find("ul").animate({ left: cnt}, settings.easeTime, settings.easeFunc);
				var i = 0;
				for(i = 0;i<tamanho;i++){
					if(i == pos){
						jQuery("div#stripTransmitter" + 0 + " a").eq(i).addClass("current").parent().parent();
					}else{
						jQuery("div#stripTransmitter" + 0 + " a").eq(i).removeClass("current").parent().parent();
					}	
				}	
				pos++;
				
				
			}, 6000);
			
}// JavaScript Document