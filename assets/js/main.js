/**
* Template Name: Shuffle - v4.9.1
* Template URL: https://bootstrapmade.com/bootstrap-3-one-page-template-free-shuffle/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
  /**
   * Animation on scroll
   */
   window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})()

TweenMax.set("#soccer1", { opacity: 1 });

TweenMax.set(["#soccer2", "#basket"], { autoAlpha: 0, display: "none" });
const backLines = anime({
  targets: ".soccer1_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 50;
  },
  autoplay: false
});

const bodyLines = anime({
  targets: ".soccer1_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const ballLines = anime({
  targets: ".soccer1ball > .soccer1ball-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 140;
  },
  autoplay: false
});

function step1_ballTL() {
  const ball = new TimelineMax({
    onStart: function() {
      ballLines.play();
    }
  });
  ball
    .staggerFromTo(
      ".soccer1ball > g:nth-child(1) > *",
      0.5,
      { scale: 0 },
      { scale: 1 },
      0.2
    )
    .to(
      ".soccer1ball",
      3,
      {
        rotation: 760,
        x: 2000,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut,
        delay: 1
      }
      
    ).to(".soccer1ball", 1, {autoAlpha: 0}, '-=1');
  return ball;
}

function step1_backTL() {
  const back = new TimelineMax({
    onStart: function() {
      backLines.play();
    },
    onComplete: function() {
      console.log("completed");
      backLines.play();
      backLines.reverse();
      TweenMax.staggerTo(
        ".soccer1_extra-line > g",
        1,
        { scale: 0, transformOrigin: "50% 50%", ease: Bounce.easeOut },
        0.2
      );
    }
  });

  back.staggerFromTo(
    ".soccer1_extra-line > g",
    1,
    { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
    { x: 0, rotation: 0, ease: Power4.easeOut },
    0.5
  );
  return back;
}

function step1_bodyTL() {
  const timeline = new TimelineMax({
    ease: Expo.easeOut,
    onStart: bodyLines.play(),
    onComplete: function() {
      bodyLines.reverse();

      setTimeout(() => {
        TweenMax.staggerTo(
          ".soccer1_fill > *",
          0.2,
          { scale: 0, transformOrigin: "50% 50%" },
          0.01
        );
      }, 2000);
    }
  });

  var duration = 0.3;
  var stagger = 0.03;

  timeline.staggerFromTo(
    ".soccer1_fill > *",
    duration,
    { x: -4500 },
    { x: 0 },
    stagger
  );

  return timeline;
}
// soccer 1

// soccer 2
const step2_bodyLines = anime({
  targets: ".soccer2_line path",
  strokeDashoffset: [anime.setDashoffset, 99200],
  easing: "easeInOutSine",
  duration: 2500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const step2_bodyExtra = anime({
  targets: ".soccer2_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});
function step2_bodyTL(){

  const timeline = new TimelineMax({onStart: function(){
    step2_bodyExtra.play();
    step2_bodyLines.play();
  }, onComplete:function(){

  }});

  timeline.staggerFromTo(".soccer2_fill > *", 0.2, {scale: 0, transformOrigin: "100% 100%"}, {scale: 1}, 0.03)
  .to(".soccer2_fill", 1, {onStart: function(){
    step2_bodyExtra.reverse();
    step2_bodyLines.reverse();
    step2_bodyExtra.play();
    step2_bodyLines.play();
  }})
  .staggerTo(".soccer2_fill > *", 0.2, {scale: 0, delay: 2}, 0.01)

  return timeline;

}


// basket

const step3_bodyLines = anime({
  targets: ".basket_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function(el, i) {
    return i * 20;
  },
  autoplay: false
});
const step3_extraLines = anime({
  targets: ".basket_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 3500,
  delay: function(el, i) {
    return i * 20;
  },
  autoplay: false
});


function step3_bodyTL(){
  const timeline = new TimelineMax({onStart: function(){
    step3_bodyLines.play()
    step3_extraLines.play()
  }});
  timeline.staggerFromTo(".basket_fill > *", 0.3, {scale: 0, y: 300, transformOrigin: "0% 0%"}, {scale: 1, y: 0}, -0.008)

  return timeline;

}



// utilities
function hide(elem){
  const tl = new TimelineMax();
  tl.to(elem, 0.1, {autoAlpha: 0})
  .to(elem, 0.1, {display: "none"})
  return tl;
}
function show(elem){
  const tl = new TimelineMax();
  tl.to(elem, 0.1, {autoAlpha: 1})
  .to(elem, 0.1, {display: "block"})
  return tl;
}
const mainTL = new TimelineMax({});

function init() {
  mainTL
    .add(step1_bodyTL(), "step1")
    .add(step1_backTL(), "step1")
    .add(step1_ballTL(), "step1")
    .add(hide("#soccer1"), 'step2')
    .add(show("#soccer2"), 'step3')
    .add(step2_bodyTL(), 'step4')
    //.add(step2_backTL(), 'step4.1')
    .add(hide("#soccer2"), 'step5')
    .add(show("#basket"), 'step6')
    .add(step3_bodyTL(), 'step7')


}

init();









