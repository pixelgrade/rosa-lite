/* ========================================================== */
/* ================= noah modified version ================= */
/* ========================================================== */

/*!
 * jQuery Rellax Plugin v0.2.1
 * Examples and documentation at http://pixelgrade.github.io/rellax/
 * Copyright (c) 2016 PixelGrade http://www.pixelgrade.com
 * Licensed under MIT http://www.opensource.org/licenses/mit-license.php/
 */
;(
    function( $, window, document, undefined ) {

        if ( ! window.requestAnimationFrame ) {
            return;
        }

        var $window = $( window ),
            windowWidth,
            windowHeight,
            elements = [],
            lastKnownScrollY;

        function loop() {
            updateAll();
            window.requestAnimationFrame( loop );
        }

        function updateAll() {
            $.each( elements, function( i, element ) {
                element._updatePosition();
            } );
        }

        function reloadAll() {
            $.each( elements, function( i, element ) {
                element._reloadElement();
            } );
        }

        $window.on( 'load', function() {
            windowWidth = $window.width();
            windowHeight = $window.height();

            reloadAll();
            window.requestAnimationFrame( loop );
        } );

        $window.on( 'resize', function() {
            reloadAll();
        } );

        $window.on( 'load scroll', function() {
            lastKnownScrollY = window.scrollY;
        } );

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

            this.options.amount = myAmount !== undefined ? parseFloat( myAmount ) : this.options.amount;
            this.options.bleed = myBleed !== undefined ? parseFloat( myBleed ) : this.options.bleed;
            this.options.scale = myScale !== undefined ? parseFloat( myScale ) : this.options.scale;
            this.options.fill = fill !== undefined;

            if ( self.options.amount == 0 ) {
                return;
            }

            self._bindEvents();

            elements.push( self );
        }

        $.extend( Rellax.prototype, {
            constructor: Rellax,
            _bindEvents: function() {
            },
            _scaleElement: function() {
                var minWidth = this.$parent.data( "plugin_" + Rellax ).width,
                    minHeight = ( windowHeight + this.height ) * this.options.amount,
                    scaleX = minWidth / this.width,
                    scaleY = minHeight / this.height,
                    scale = Math.max(scaleX, scaleY),
                    newWidth = this.width * scale,
                    newHeight = this.height * scale;

//                this.offset.left += ( this.width - newHeight ) / 2;
                this.offset.top += ( this.height - newHeight ) / 2;

                this.width = newWidth;
                this.height = newHeight;
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

                if ( self.$parent.length ) {

                    $.extend( style, {
                        top: self.offset.top - self.$parent.offset().top + self.options.bleed
                    } );

                    self.$parent.css( {
                        position: 'fixed',
                        overflow: 'hidden'
                    } );

                }

                $el.css( style );
            },
            _isInViewport: function( offset ) {
                offset = 0;
                return lastKnownScrollY > this.offset.top - windowHeight + offset && lastKnownScrollY < this.offset.top + windowHeight + offset;
            },
            _updatePosition: function() {
                var self = this,
                    $el = $( self.element ),
                    progress = ( lastKnownScrollY - this.offset.top + windowHeight ) / ( windowHeight + this.height ),
                    move = ( windowHeight + this.height ) * ( progress - 0.5 );

                if ( ! self.$parent.length ) {
                    $el.toggleClass( 'rellax-hidden', ! self._isInViewport() );
                }

//                if ( self._isInViewport() ) {

                    $el.attr( 'data-progress', progress );

                    if ( self.isContainer ) {
                        $el.css( 'transform', 'translate3d(0,' + ( - lastKnownScrollY ) + 'px,0)' );
                    } else {
                        move = move * self.options.amount;
                        if ( ! self.$parent.length ) {
                            move -= lastKnownScrollY;
                        }

                        if ( self.options.scale !== 1 ) {
                            var scale = 1 + ( self.options.scale - 1 ) * ( progress - 0.5 );
                            $el.css( 'transform', 'translate3d(0,' + move + 'px,0) scale(' + scale + ')' );
                        } else {
                            $el.css( 'transform', 'translate3d(0,' + move + 'px,0)' );
                        }
                    }
//                }
            }
        } );

        $.fn.rellax = function( options ) {
            return this.each( function() {
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
            } );
        };

        $.fn.rellax.defaults = {
            amount: 0.5,
            bleed: 0,
            scale: 1,
            container: '[data-rellax-container]'
        };

    }
)( jQuery, window, document );
