var offRegister = function() {

      if (!($ = window.jQuery)) { // see if jQuery is already called, if not, calling script
        script = document.createElement( 'script' );
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; 
        script.onload=runRumbler;
        document.body.appendChild(script);
      } 
      else {
        runRumbler();
      }
         
      function runRumbler() {      
          $(document).ready(function(){

              var count = 0;

              $(function addone(){
                  count = count+1;

                  (function($) {
                    $.fn.jrumble = function(options){  // jRumble by Jack Rugile. http://jackrugile.com/jrumble/
                      
                      /*========================================================*/
                      /* Options
                      /*========================================================*/
                      var defaults = {
                        x: count/5,
                        y: count/5,
                        rotation: 0,
                        speed: 25,
                        opacity: false,
                        opacityMin: .5
                      },
                      opt = $.extend(defaults, options);  
                          
                      return this.each(function(){
                                    
                        /*========================================================*/
                        /* Variables
                        /*========================================================*/
                        var $this = $(this),        
                          x = opt.x*2,
                          y = opt.y*2,
                          rot = opt.rotation*2,
                          speed = (opt.speed === 0) ? 1 : opt.speed,      
                          opac = opt.opacity,
                          opacm = opt.opacityMin,
                          inline,
                          interval;
                        
                        /*========================================================*/
                        /* Rumble Function
                        /*========================================================*/    
                        var rumbler = function(){       
                          var rx = Math.floor(Math.random() * (x+1)) -x/2,
                              ry = Math.floor(Math.random() * (y+1)) -y/2,
                              rrot = Math.floor(Math.random() * (rot+1)) -rot/2,
                              ropac = opac ? Math.random() + opacm : 1;
                            
                          /*========================================================*/
                          /* Ensure Movement From Original Position
                          /*========================================================*/        
                          rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;
                          ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;  
                          
                          /*========================================================*/
                          /* Check Inline
                          /*========================================================*/
                          if($this.css('display') === 'inline'){
                            inline = true;
                            $this.css('display', 'inline-block');
                          }
                        
                          /*========================================================*/
                          /* Rumble Element
                          /*========================================================*/      
                          $this.animate({
                            // 'position':'relative',
                            'left': parseFloat($this.css( "left" )) + rx + 'px',  // move from declared position
                            'top': parseFloat($this.css( "top" )) + ry+'px',
                            '-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',
                            'filter':'alpha(opacity='+ropac*100+')',          
                            '-moz-opacity':ropac,         
                            '-khtml-opacity':ropac,         
                            'opacity':ropac,
                            '-webkit-transform':'rotate('+rrot+'deg)', 
                            '-moz-transform':'rotate('+rrot+'deg)', 
                            '-ms-transform':'rotate('+rrot+'deg)',
                            '-o-transform':'rotate('+rrot+'deg)', 
                            'transform':'rotate('+rrot+'deg)'
                          });

                        }; /* close rumble function */


                        
                        /*========================================================*/
                        /* Rumble CSS Reset
                        /*========================================================*/
                        var reset = {
                          'left':0,
                          'top':0,
                          '-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
                          'filter':'alpha(opacity=100)',          
                          '-moz-opacity':1,         
                          '-khtml-opacity':1,         
                          'opacity':1,
                          '-webkit-transform':'rotate(0deg)',
                          '-moz-transform':'rotate(0deg)',
                          '-ms-transform':'rotate(0deg)',
                          '-o-transform':'rotate(0deg)',
                          'transform':'rotate(0deg)'
                        };
                        
                        /*========================================================*/
                        /* Rumble Start/Stop Trigger
                        /*========================================================*/
                          $this.bind({
                          'startRumble': function(e){
                            e.stopPropagation();
                            clearInterval(interval);
                            interval = setInterval(rumbler, speed)
                          },
                          'stopRumble': function(e){
                            e.stopPropagation();
                            clearInterval(interval);
                            if(inline){
                              $this.css('display', 'inline');
                            }
                            $this.css(reset);
                          }
                        });   

                      });// End return this.each
                    };// End $.fn.jrumble

                  })(jQuery);

                  /*===============================================================*/
                  /* Specify selector to vibrate below. 
                  /* For bookmarklet, 'div' will vibrate all elements, 
                  /* in plugin this can be specifically targeted to a class or id.
                  /*===============================================================*/

                $('div').jrumble();    
                $('div').trigger('startRumble');
              
             setTimeout(addone, 100000); // how many seconds to wait before adding to count, increasing vibration

            }); // end addone()

         });
    };

  };

offRegister();
