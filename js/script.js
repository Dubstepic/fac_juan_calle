// jshint esversion:6

/* ----- SIDEBAR NAVIGATION LINKS HIGHLIGHTED ON SCROLL ----- */

// Grabbing all the links of the sidebar menu
const links = document.querySelectorAll('nav ul.navBar li a');

// Function to highlight the menu item corresponding to the section displayed in the viewport
const highlightLinks = () => {
  // Store the current position relative to the top of the document
  let fromTop = window.scrollY;

  // For each menu item in the array...
  links.forEach(link => {
    // Grab the name of the section that the link points to.
    let section = document.querySelector(link.hash);

    // Check the position of each section relative to the top of the browser's window and apply or
    // remove the active class to the element
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

// Listen for scrolling to trigger the function */
window.addEventListener('scroll', highlightLinks);

// ------------------------------------------------------------------

/* ----- RESPONSIVE COLLAPSIBLE SIDEBAR IN SMALLER SCREENS */

// Grabbing all the elements needed
const hamburger = document.querySelector('#hamburger');
const close = document.querySelector('#close');
const nav = document.querySelector('nav');

// Function to open the sidebar menu when is hidden
const openNav = () => {
  hamburger.style.opacity = '0';
  hamburger.style.display = 'none';
  close.style.opacity = '1';
  close.style.display = 'block';
  nav.style.width = '90%';
};

// Function to close the sidebar menu when is displayed
const closeNav = () => {
  close.style.opacity = '0';
  close.style.display = 'none';
  hamburger.style.opacity = '1';
  hamburger.style.display = 'block';
  nav.style.width = '0%';
};

// Fixes a problem that prevented the sidebar from reappearing if the screen was resized again to a
// bigger width leaving an ugly white space in its place.
const fixResize = () => {
  let viewportWidth = window.innerWidth;
  if (viewportWidth > 640) {
    nav.style.width = '20%';
  } else {
    nav.style.width = '0%';
    console.log('Small viewport');
  }
};

// Listening for click in the hamburger button to open the sidebar
hamburger.addEventListener('click', e => {
  openNav();
});

// Listening for click in the close button to close the sidebar
close.addEventListener('click', e => {
  closeNav();
});

// Listening for resizing of the viewport to apply the resize fix
window.addEventListener('resize', fixResize);

// ------------------------------------------------------------------

/* ----- IMAGE CAROUSSEL ----- */

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');

// Interval at which the reproduction of slides will happen
const playInterval = 5000;
let playing = false;
let slideInterval;

// Function to play the next slide
const nextSlide = () => {
  // Get current class
  const current = document.querySelector('.current');

  // Remove current class
  current.classList.remove('current');

  // Check for next slide and make sure that is not the div with class buttons
  if (current.nextElementSibling && !current.nextElementSibling.classList.contains('buttons')) {
    // Add current class to next next sibling
    current.nextElementSibling.classList.add('current');
  } else {
    // Add current to the initial slide
    slides[0].classList.add('current');
  }

  current.classList.remove('current');
};

const previousSlide = () => {
  // Get current class
  const current = document.querySelector('.current');

  // Remove current class
  current.classList.remove('current');

  // Check for previous slide
  if (current.previousElementSibling) {
    // Add current class to previous next sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // Add current to the last slide
    slides[slides.length - 1].classList.add('current');
  }

  current.classList.remove('current');
};

// Function to activate the continuous playing of slides
const playSlides = () => {
  playing = true;

  // Hides the play button and show the pause button instead;
  play.classList.add('invisible');
  pause.classList.remove('invisible');
  slideInterval = setInterval(nextSlide, playInterval);
};

// Function to pause the reproduction o
const pauseSlides = () => {
  playing = false;
  play.classList.remove('invisible');
  pause.classList.add('invisible');
  clearInterval(slideInterval);
};

// Button events
next.addEventListener('click', e => {
  nextSlide();
});

previous.addEventListener('click', e => {
  previousSlide();
});

play.addEventListener('click', e => {
  playSlides();
});

pause.addEventListener('click', e => {
  pauseSlides();
});

// Adding event listeners to keyboard events
document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowRight':
      nextSlide();
      break;
    case 'ArrowLeft':
      previousSlide();
      break;
    case 'Space':
      if (playing) {
        pauseSlides();
      } else {
        playSlides();
      }

      break;
  }
});
