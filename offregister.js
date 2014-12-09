javascript: (function () {

  if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
    script = document.createElement( 'script' );
   script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; 
    script.onload=offRegister;
    document.body.appendChild(script);
  } 
  else {
      offRegister();
  }
 
  function offRegister() {
      

      $(document).ready(function(){

          // console.log("ready!");

          var count = 0;

          $(function addone(){
              
              count = count+1;
              // console.log(count);

              var smallPlus = 50+(count/5),
                  smallMinus = 50-(count/5),
                  bigPlus = 50+(count),
                  bigMinus = 50-(count);

              $(function animateThree(){
                $("*").animate({"top" : smallMinus, "left" : (-count/5)} ,100);
                $("*").animate({"top" : smallPlus, "left" : (count/5)}, 100, "swing");
                $("*").animate({"top" : smallPlus, "left" : (count/2)}, 100);
                $("*").animate({"top" : smallMinus, "left" : (-count/5)} ,100);
                $("*").animate({"top" : smallPlus, "left" : (count/5)}, 100, "swing");
                $("*").animate({"top" : smallMinus, "left" : (-count/2)}, 100, animateThree);
              });
          });
      });
