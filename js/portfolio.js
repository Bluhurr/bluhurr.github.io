const myNav = document.getElementById('navbar');

// Grab each portfolio image container and corresponding card
var pCard1Arrow = document.getElementById('p-card-arrow-1');
var pCard1Images = document.getElementById('port-1-images');
pCard1Images.arrow = pCard1Arrow;
pCard1Images.toggled = false;

var pCard2Arrow = document.getElementById('p-card-arrow-2');
var pCard2Images = document.getElementById('port-2-images');
pCard2Images.arrow = pCard2Arrow;
pCard2Images.toggled = false;

var pCard3Arrow = document.getElementById('p-card-arrow-3');
var pCard3Images = document.getElementById('port-3-images');
pCard3Images.arrow = pCard3Arrow;
pCard3Images.toggled = false;

var pCard4Arrow = document.getElementById('p-card-arrow-4');
var pCard4Images = document.getElementById('port-4-images');
pCard4Images.arrow = pCard4Arrow;
pCard4Images.toggled = false;

var pCard5Arrow = document.getElementById('p-card-arrow-5');
var pCard5Images = document.getElementById('port-5-images');
pCard5Images.arrow = pCard5Arrow;
pCard5Images.toggled = false;

function elementInViewport(el, offset) {
  var rect = el.getBoundingClientRect();

  // object comes into viewport
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
}

window.onscroll = () => {
  "use strict";
  /*
  if(document.documentElement.scrollTop >= 20){
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  }else{
    myNav.classList.add("nav-transparent");
    myNav.classList.remove("nav-colored");
  }
  */
};

window.onload = () => {
  setupEventHandlers();
}

function setupEventHandlers() {
  pCard2Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard2Images);
  }, false);
  pCard3Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard3Images);
  }, false);
  pCard4Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard4Images);
  }, false);
  pCard5Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard5Images);
  }, false);
}

function changeCardImages(imgContainer) {
  Array.from(imgContainer.children).forEach((child)=>{
    if(child.tagName == 'IMG'){
      if(imgContainer.toggled && child.previousElementSibling != null){
        child.classList.add('hidden-img');
      }else if(!imgContainer.toggled){
        child.classList.remove('hidden-img');
      }
    }
  });
  if(imgContainer.toggled){
    imgContainer.arrow.style.transform = 'rotateZ(0deg)';
    imgContainer.arrow.style.boxShadow = "7px 7px 0px rgb(0 0 0 / 10%)"
    imgContainer.scrollIntoView({ behavior: "smooth", block: "end"});
  }else {
    imgContainer.arrow.style.transform = 'rotateZ(180deg)';
    imgContainer.arrow.style.boxShadow = "-7px -7px 0px rgb(0 0 0 / 10%)"
  }
  imgContainer.toggled = !imgContainer.toggled;
}

document.body.onmousemove = (e) => {
  const windowWidth = document.body.clientWidth;
  const windowHeight = document.body.clientHeight;

  const perX = (e.pageX / windowWidth * 100);
  const perY = (e.pageY / windowHeight * 100);

  const mainContentStyles = document.getElementById('main-content').style;
  mainContentStyles.setProperty('--x-val', `${perX}%`);
  mainContentStyles.setProperty('--y-val', `${perY}%`);
}
