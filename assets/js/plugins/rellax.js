/* ========================================================== */
/* ================= noah modified version ================= */
/* ========================================================== */

/*!
 * jQuery Rellax Plugin v0.2.1
 * Examples and documentation at http://pixelgrade.github.io/rellax/
 * Copyright (c) 2016 PixelGrade http://www.pixelgrade.com
 * Licensed under MIT http://www.opensource.org/licenses/mit-license.php/
 */
;( function ( $, window, document, undefined ) {

    if ( !window.requestAnimationFrame ) return;

    var $window = $( window ),
        elements = [],
        lastKnownScrollY;

    function updateAll() {
        $.each( elements, function( i, element ) {
            element._updatePosition();
        });
        window.requestAnimationFrame( updateAll );
    }

    window.requestAnimationFrame( updateAll );

    $window.on( 'load resize', function(e) {
        windowWidth = $window.width();
        windowHeight = $window.height();

        $.each( elements, function( i, element ) {
            element._reloadElement();
        });
    });

    $window.on( 'load scroll', function(e) {
        lastKnownScrollY = $( e.target ).scrollTop();
    });

    function Rellax( element, options ) {
        this.element = element;
        this.options = $.extend( {}, $.fn.rellax.defaults, options );

        var self = this,
            $el = $( this.element ).addClass( 'rellax-active' ),
            myAmount = $el.data( 'rellax-amount' ),
            myBleed = $el.data( 'rellax-bleed' ),
            fill = $el.data( 'rellax-fill' ),
            myScale = $el.data( 'rellax-scale' );

        this.isContainer = $el.is( self.options.container );
        this.$parent = $el.parent().closest( self.options.container );

        this.options.amount = myAmount != undefined ? parseFloat(myAmount) : this.options.amount;
        this.options.bleed = myBleed != undefined ? parseFloat(myBleed) : this.options.bleed;
        this.options.scale = myScale != undefined ? parseFloat(myScale) : this.options.scale;
        this.options.fill = fill != undefined ? true : false;

        if ( self.options.amount == 0 ) return;

        self._reloadElement();
        self._bindEvents();

        elements.push( self );
    }

    $.extend( Rellax.prototype, {
        constructor: Rellax,
        _bindEvents: function() {
            var self = this;
            $window.on( 'load resize', function(e) {
                self._reloadElement();
            });
        },
        _scaleElement: function() {
	        this.height = ( windowHeight + this.height ) * this.options.amount;
        },
        _reloadElement: function() {
            var self = this,
                $el = $( this.element ).removeAttr( 'style' );

            if ( self.$parent.length ) {
                self.$parent.css( 'position', 'static' );
            }

            self.width = $el.width();
            self.height = $el.height();
            self.offset = $el.offset();

            if ( self.$parent.length || self.options.fill ) {
                self._scaleElement();
            }

            if ( self.isContainer ) {
                self.width += 2 * self.options.bleed;
                self.height += 2 * self.options.bleed;
                self.offset.left -= self.options.bleed;
                self.offset.top -= self.options.bleed;
            }

            if ( self.$parent.length ) {
                self.offset.left = self.offset.left - self.$parent.offset().left;
            }

            var style = {
                position: self.$parent.length ? 'absolute' : 'fixed',
                top: self.offset.top,
                left: self.offset.left,
                width: self.width,
                height: self.height,
                marginTop: 0,
                marginLeft: 0
            };

            if ( self.isContainer ) $.extend( style, {zIndex: -1} );

            if ( self.$parent.length ) {

                $.extend( style, {
                    top: self.offset.top - self.$parent.offset().top + self.options.bleed
                } );

                self.$parent.css( {
                    position: 'fixed',
                    overflow: 'hidden',
                    zIndex: -1
                } );

            }

            $el.css( style );
        },
        _isInViewport: function( offset ) {
            offset = ( offset != undefined && ! this.isContainer ) ? offset : 0;
            return lastKnownScrollY > this.offset.top - windowHeight + offset && lastKnownScrollY < this.offset.top + windowHeight + offset;
        },
        _updatePosition: function() {
            var self = this,
                progress = ( lastKnownScrollY - this.offset.top + windowHeight ) / ( windowHeight + this.height ),
                move = ( windowHeight + this.height ) * ( progress - 0.5 );

	        if ( self._isInViewport() ) {
                if ( ! self.$parent.length && ! self.isVisible ) {
                    $( self.element ).show();
                    self.isVisible = true;
                }
                if ( self.isContainer ) {
                    $( self.element ).css( 'transform', 'translate3d(0,' + ( -lastKnownScrollY ) + 'px,0)' );
                } else {
                    move = move * self.options.amount;
                    if ( ! self.$parent.length )
                        move -= lastKnownScrollY;

                    if ( self.options.scale !== 1 ) {
                        var scale = 1 + ( self.options.scale - 1 ) * (progress - 0.5);
                        $( self.element ).css( 'transform', 'translate3d(0,' + move + 'px,0) scale(' + scale + ')' );
                    } else {
                        $( self.element ).css( 'transform', 'translate3d(0,' + move + 'px,0)' );
                    }
                }
            } else {
                if ( ! self.$parent.length && self.isVisible ) {
                    $( self.element ).hide();
                    self.isVisible = false;
                }
            }

        }
    });

    $.fn.rellax = function ( options ) {
        return this.each(function () {
            if ( ! $.data( this, "plugin_" + Rellax ) ) {
                $.data( this, "plugin_" + Rellax, new Rellax( this, options ) );
            } else {
                var self = $.data( this, "plugin_" + Rellax );
                if ( options && typeof options == 'string' ) {
                    if ( options == "refresh" ) {
                        self._reloadElement();
                    }
                }
            }
        });
    }

    $.fn.rellax.defaults = {
        amount: 0.5,
        bleed: 0,
        scale: 1,
        container: '[data-rellax-container]'
    };

})( jQuery, window, document );
