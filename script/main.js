$(function($) {

  "use strict";


/*=========================== scroll background ===========================*/

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    // Activate menu
    if (wScroll >50) {
      $('.navbar').addClass('active_sc');
    }
    else {
      $('.navbar').removeClass('active_sc');
    };
        
  });

  /*=========================== close scroll background ===========================*/
  



  /*=========================== preloader ===========================*/
  // Wait for window load
  $(window).on('load', function() {
     $(".se-pre-con").fadeOut("slow");;
  });

  /*=========================== preloader ===========================*/

  /*=========================== smooth menu ===========================*/
  $('body').scrollspy({target: ".navbar", offset: 50});   

  // Add smooth scrolling on all links inside the navbar
  $("#xenav a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
  /*=========================== smooth menu ===========================*/

 


  /*=========================== screenshot app ===========================*/

 var owls = $("#screenshot-owl");
    owls.owlCarousel({

        autoplay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        items: 4,
        loop: true,
        center: false,
        margin: 20,
        stagePadding: 0,
        dots:true,
        nav:false,

        animateOut:'fadeOutDown',
        animateIn:'fadeInDown',
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            768: {
                items: 4,
                nav: false,
                loop: true
            }
        }
    });

  /*=========================== screenshot app ===========================*/





  /*=========================== our team ===========================*/

 var owls = $("#team-slider");
    owls.owlCarousel({

        autoplay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        items: 3,
        loop: true,
        center: false,
        margin: 10,
        stagePadding: 0,
        dots:true,
        nav:false,

        animateOut:'fadeOutDown',
        animateIn:'fadeInDown',
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,

            },
            768: {
                items: 3,
    
                loop: true
            }
        }
    });

  /*=========================== our team ===========================*/



  /*=========================== testimonials ===========================*/

 var owls = $("#testimonial-owl");
    owls.owlCarousel({

        autoplay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        items: 2,
        loop: true,
        center: false,
        margin: 15,
        stagePadding: 0,
        dots:false,
        nav:true,

        animateOut:'fadeOutDown',
        animateIn:'fadeInDown',
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            768: {
                items: 2,
                nav: true,
                loop: true
            }
        },
        navText : ["<i class='fas fa-angle-left fa-2x'></i>","<i class='fas fa-angle-right fa-2x'></i>"]        
    });

  /*=========================== testimonials ===========================*/



  /*=========================== home slider ===========================*/

 var owls = $("#home-slider-owl");
    owls.owlCarousel({

        autoplay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        items: 1,
        loop: true,
        center: false,
        margin: 0,
        stagePadding: 0,
        dots:true,
        nav:false,

        animateOut:'fadeOut',
        animateIn:'fadeInLeft',

    });
  /*=========================== home slider ===========================*/




  
 // ------------------------------- AOS Animation 
        AOS.init({
          duration: 1000,
          mirror: true
        });

  //counter js
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });

    //yt player
    $('#video-background').YTPlayer({
        videoId: 'pAueQoU8TQQ',
        fitToBackground: false,
        mute: true,
        pauseOnScroll: false,
        playerVars: {
            modestbranding: 0,
            autoplay: 1,
            controls: 1,
            showinfo: 0,
            wmode: 'transparent',
            branding: 0,
            rel: 0,
            autohide: 0,
            origin: window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

    function onPlayerReady(event){
      player.mute();
    }

});



//maps
function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.674, lng: -73.945},
          zoom: 12,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
      }


  /*=========================== particle ===========================*/


particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 110,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 150,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

requestAnimationFrame();


  /*=========================== particle ===========================*/
