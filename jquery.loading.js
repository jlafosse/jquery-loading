/**
 * Loading v1.0.0 - jQuery Plugin
 * Copyright (c) 2012 Jason LaFosse
 * Licensed under MIT and GPL
*/

/**
 * The loading plugin overlays a "waiting spinner" over an element that is typically being called through ajax or hijack
 *
 * Hijack
 * Basic Usage: $(this).loading({..});
*/
;(function($) {

    $.fn.loading = function(options){
        
        return this.each(function(){
            
            var $self = $(this);

            if ($self.find('div.loading').size()) {
                $self.find('div.loading').remove();
                return $self;    
            }
                
            var settings = $.extend({
                delay:250,
                css: {'opacity':'.75','background-color':'#ffffff','z-index':'9997'},
                img: {'src':'images/mozilla_blue.gif','width':'16','height':'16','border':'0','align':'middle','valign':'center'},
                includeBorder: false,
                imgInViewport:true
            },options);
            
            var top = 0;
            var left = 0;
            var width = $self.outerWidth();
            var height = $self.outerHeight() + $self.scrollTop();
            var offset = '0 0';

            if (!settings.includeBorder) {
                width = width - parseInt($self.css('border-left-width')) - parseInt($self.css('border-right-width'));
                height = height - parseInt($self.css('border-top-width')) - parseInt($self.css('border-bottom-width'));
                offset = parseInt($self.css('border-left-width')) + ' ' + parseInt($self.css('border-top-width'));
            }
            
            var imgTop = (height + $self.scrollTop())/2;
            
            if (settings.imgInViewport) {
             
                var docH = $(document).height();
                var winH = $(window).height();
                var scrT = $(document).scrollTop();
                var scrB = docH - winH - scrT;
                var divH = height;
                var divT = $self.offset().top;
                var divB = divT + divH;
                 
                var topO = scrT - divT;
                if (topO < 0) topO = 0;
                
                var botO = divB - (docH - scrB);
                if (botO < 0) botO = 0;
                
                var inView = divH - (topO + botO);
                
                imgTop = topO + (inView/2);
                            
            }

            var div = $("<div />").css({'display':'none','position':'absolute','top':top,'left':left,'height':height,'width':width}).css(settings.css).addClass('loading').appendTo($self);
            var img = $("<img />").attr(settings.img);
            img.appendTo(div).css({'position':'absolute','top':(imgTop-(img.height()/2)),'left':((width/2)-(img.width()/2)),'z-index':99999});
            div.show().position({my:'left top', at:'left top', of:$self, offset:offset}).hide();
            
            var toggleLoader = function(){  
                $(div).toggle(); 
            };
            var t = setTimeout(toggleLoader,settings.delay);
            
        });
            
    };

})(jQuery);