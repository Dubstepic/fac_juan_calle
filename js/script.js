/* jshint esversion:6 */

/* NavBar Scrolling. Highlights the link of the section shown on the viewport by adding
and removing the 'active' class to the nav links*/
let links = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', event => {
  let fromTop = window.scrollY;
  links.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
