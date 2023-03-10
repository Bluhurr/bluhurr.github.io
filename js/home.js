const downArrow = document.getElementById('main-arrow');
downArrow.addEventListener('click', (e)=>{
  document.getElementsByClassName('skill')[1].scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
});

const myNav = document.getElementById('navbar');
const bgImage = document.getElementById('bg-image');
const homeAbout = document.getElementById('home-about-content');
const skillBars = document.getElementsByClassName('skill');
const funBlurb = document.getElementsByClassName('fun-blurb');
const testimonials = document.querySelector('.testimonials-row');
const contactHeader = document.getElementById('contact-header');
const otherPageLink = document.getElementsByClassName('other-page-link');

function hasScrolled (el) {
  var rect1 = homeAbout.getBoundingClientRect();
  var rect2 = myNav.getBoundingClientRect();

  if(rect1.top <= rect2.bottom) {
    return true;
  } else {
    return false;
  }
}

function elementInViewport(el, offset) {
  var rect = el.getBoundingClientRect();

  // object comes into viewport
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
}


// Make sure elements that are in the viewport are animated in if refreshed -----
for(var i = 0; i < skillBars.length; i++){
  if(elementInViewport(skillBars.item(i), 100)) {
    skillBars.item(i).firstChild.classList.add('slide-in');
  }else {
  }
}

if(elementInViewport(funBlurb.item(0), 100)){
  funBlurb.item(0).firstChild.classList.add('fun-blurb-visible');
}else {
}

console.log(testimonials);

for(const child of testimonials.children){
  if(elementInViewport(child, 100)){
    child.classList.add('testimonial-visible');
  }
}

if(elementInViewport(contactHeader, 0)){
  otherPageLink[0].classList.add('slide-down');
  otherPageLink[1].classList.add('slide-down');
  otherPageLink[2].classList.add('slide-down');
}
// ------------------------------------------------------------------------------

if(window.scrollY > 1){
  myNav.classList.add("nav-transparent");
} else{
  myNav.classList.remove("nav-transparent");
}

if(hasScrolled() === true){
  myNav.classList.add("nav-colored");
}else{
  myNav.classList.remove("nav-colored");
}

window.onscroll = () => {

  if(window.scrollY > 1){
    myNav.classList.add("nav-transparent");
  } else{
    myNav.classList.remove("nav-transparent");
  }

  if(hasScrolled() === true){
    myNav.classList.add("nav-colored");
  }else{
    myNav.classList.remove("nav-colored");
  }

  for(var i = 0; i < skillBars.length; i++){
    if(elementInViewport(skillBars.item(i), 50)) {
      skillBars.item(i).firstChild.classList.add('slide-in');
    }else {
    }
  }

  if(elementInViewport(funBlurb.item(0), 0)){
    funBlurb.item(0).firstChild.classList.add('fun-blurb-visible');
  }else {
  }

  for(const child of testimonials.children){
    if(elementInViewport(child, 100)){
      child.classList.add('testimonial-visible');
    }
  }

  if(elementInViewport(contactHeader, 200)){
    otherPageLink[0].classList.add('slide-down');
    otherPageLink[1].classList.add('slide-down');
    otherPageLink[2].classList.add('slide-down');
  }

};

