/**
 * Loading v1.1.0 - jQuery Plugin
 * Copyright (c) 2012 Jason LaFosse
 * Licensed under MIT and GPL
*/

/**
 * The loading plugin overlays a "waiting spinner" over an element that is typically being called through ajax or hijack.
 *
 * Loading
 * Show: $(this).loading('show',{..});
 * Hide: $(this).loading('hide',{..});
*/
;(function($) {
    
    var Loading = function (element, options) {
        this.init(element, options);
    }

    Loading.prototype = {
        
        init: function(element,options) {

            this.$element = $(element);
            this.options = options;
            
            var top = 0,
                left = 0,
                width = this.$element.outerWidth(),
                height = this.$element.outerHeight() + this.$element.scrollTop(),
                offset = '0 0';

            if (!options.includeBorder) {
                width = width - parseInt(this.$element.css('border-left-width')) - parseInt(this.$element.css('border-right-width'));
                height = height - parseInt(this.$element.css('border-top-width')) - parseInt(this.$element.css('border-bottom-width'));
                offset = parseInt(this.$element.css('border-left-width')) + ' ' + parseInt(this.$element.css('border-top-width'));
            }
            
            var imgTop = (height + this.$element.scrollTop())/2;
            
            if (options.imgInViewport) {
             
                var docH = $(document).height(),
                    winH = $(window).height(),
                    scrT = $(document).scrollTop(),
                    scrB = (docH - winH - scrT),
                    divH = height,
                    divT = this.$element.offset().top,
                    divB = (divT + divH),
                    topO = (scrT - divT),
                    botO = (divB - (docH - scrB));
                    
                if (topO < 0) topO = 0;
                if (botO < 0) botO = 0;
                
                var inView = divH - (topO + botO);
                imgTop = topO + (inView/2);
                            
            }

            var div = $("<div />").css({'display':'none','position':'absolute','top':top,'left':left,'height':height,'width':width}).css(options.css).addClass('loading').appendTo(this.$element);
            var img = $("<img />").attr(options.img);
            img.appendTo(div).css({'position':'absolute','top':(imgTop-(img.height()/2)),'left':((width/2)-(img.width()/2)),'z-index':99999});
            div.show().position({my:'left top', at:'left top', of:this.$element, offset:offset}).hide();
            
            this.$element = div;
            
        },
        
        
        show: function() {
            var $el = this.$element;
            setTimeout(function(){
                $el.show();
            },this.options.delay);  
        },
        
        
        hide: function() {
            this.$element.hide();
        }
        
    };
        
    
    /* LOADING PLUGIN DEFINITION
    * ======================= */
    var old = $.fn.loading;
    
    $.fn.loading = function(){
        
        var args = $.makeArray(arguments),
            option = args.shift();

        return this.each(function(){
            
            var $this = $(this),
                data = $this.data('loading'),
                options = (typeof option == 'object') ? option : args[0],
                options = $.extend({}, $.fn.loading.defaults, $this.data(), options);

            if ( !data ) {
                $this.data('loading', (data = new Loading(this, options)));
            }
            if (typeof option == 'string') {
                data[option].apply( data, args );
            }
            else if ( options.show ) {
                data.show.apply( data, args );
            }
 
        });
    
    };
    
    $.fn.loading.defaults = {
        delay:250,
        css: {'opacity':'.75','background-color':'#ffffff','z-index':'9997'},
        img: {'src':'/images/mozilla_blue.gif','width':'16','height':'16','border':'0','align':'middle','valign':'center'},
        includeBorder: false,
        imgInViewport:true
    };

    $.fn.loading.Constructor = Loading;
    

})(jQuery);