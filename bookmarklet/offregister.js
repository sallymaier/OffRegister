$(document).ready(function(){
 			 var count = 0;

 			function addone(){
 			   count++;
   			
   				$('.offreg').jrumble({
	  			   x: count/50,
	   			   y: count/50,
	   			   rotation: count/10000,
	   			   speed: 0

    			});
    	
    		$('.offreg').trigger('startRumble');

    		setTimeout(addone, 10000);
  			}

  			addone();
		});

/*
jRumble v1.3 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com

MIT License
-----------------------------------------------------------------------------
Copyright (c) 2012 Jack Rugile, http://jackrugile.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
  $.fn.jrumble = function(options){
    
    /*========================================================*/
    /* Options
    /*========================================================*/
    var defaults = {
      x: 2,
      y: 2,
      rotation: 1,
      speed: 15,
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
        $this.css({
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
      };
      
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


/*======================================================================================*/
/* Cloning all divs to create CMY overlays. 
/* On a simple page, these will overlay each other--more complex layouts may not work.
/*======================================================================================*/


$( "<div id='black' class='clone' style='position:absolute; top:0; left:0; z-index=201;'></div>" ).appendTo( "body" );
$("body").children().clone().appendTo('#black');
$("#black").find('*').css({"color":"black", "opacity":"0.5"});

$( "<div id='aqua' class='clone offreg' style='position:absolute; top:0; left:0; z-index=200;'></div>" ).appendTo( "body" );
$("body").children().clone().appendTo('#aqua');
// $("#aqua").children().css({"position":"absolute","top":"0","left":"0"});
$("#aqua").find('*').css({"color":"aqua", "opacity":"0.5"});

$( "<div id='magenta' class='clone offreg' style='position:absolute; top:0; left:0; z-index=199;'></div>" ).appendTo( "body" );
$("#aqua").children().clone().appendTo('#magenta');
// $("#magenta").children().css({"position":"absolute","top":"0","left":"0"});
$("#magenta").find('*').css({"color":"fuchsia", "opacity":"0.5"});

$( "<div id='yellow' class='clone offreg' style='position:absolute; top:0; left:0; z-index=198;'></div>" ).appendTo( "body" );
$("#magenta").children().clone().appendTo('#yellow');
// $("#yellow").children().css({"position":"absolute","top":"0","left":"0"});
$("#yellow").find('*').css({"color":"yellow", "opacity":"0.8"});

