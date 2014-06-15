;(function ( $, window, document, undefined ) {
    var pluginName = 'punchout',
        defaults = {
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        e = $(this.element);
        i = $('.punchout').length;

        style = document.defaultView.getComputedStyle(this.element, "");

        width   = parseInt(e.width());
        height  = parseInt(e.height());

        p_top    = parseInt(style.paddingTop     || 0);
        p_bottom = parseInt(style.paddingBottom  || 0);
        p_left   = parseInt(style.paddingLeft    || 0);
        p_right  = parseInt(style.paddingRight   || 0);

        width += p_left + p_right;
        height += p_top + p_bottom;

        id = "punchout_" + i;
        e.after("<canvas width='" + width + "px' height='" + height +
                "px' class='punchout' id='" + id + "'></canvas>");
        canvas = document.getElementById(id);
        ctx = canvas.getContext('2d');

        canvas.style.cssText = style.cssText;
        canvas.style.backgroundColor = 'transparent';
        canvas.style.padding = 0;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        alpha = parseFloat(e.css('background').split(' ').slice(3, 4));
        ctx.globalAlpha = 1.0;

        colour = e.css('background').split(' ').slice(0, 4).join(' ');

        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, width, height);
        ctx.font = e.css('font');
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'top';
        ctx.globalCompositeOperation = 'destination-out';

        text = e.html();

        function overflow(text) {
            return ctx.measureText(text, p_left, p_top).width > (width - p_left - p_right);
        }

        if (overflow(text)) {
            //  TODO: This effectively re-implements text wrapping.
            //        It does not take into account the correct text metrics.
            //        It is a giant hack. Fix it.
            lines = [];
            while (text.length > 0) {
                var i;
                words = text.split(' ');
                for (i = words.length; overflow(text); i--) {
                    text = words.slice(0, i).join(' ');
                }
                lines.push(text);
                text = words.slice(i + 1, words.length).join(' ');
            }
            for (l in lines) {
                ctx.fillText(lines[l], p_left, l == 0 ? p_top : ((l / lines.length) * height));
            }
        } else {
            ctx.fillText(text, p_left, p_top);
        }
        e.remove();
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

jQuery(window).ready(function(){
    isiOS = function() {
        return navigator.userAgent.toLowerCase().indexOf('mobile') > -1 &&
               navigator.userAgent.toLowerCase().indexOf('safari') > -1 &&
               navigator.userAgent.toLowerCase().indexOf('Android') == -1;
    }

    isMobileAndWorksAndLooksGood = function() {
        return isiOS() && window.devicePixelRatio == 1;
    }

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
        isMobileAndWorksAndLooksGood()) {
        setTimeout(function(){$('h1.title, h2, h3, h4').punchout();}, 500);
    }
});
