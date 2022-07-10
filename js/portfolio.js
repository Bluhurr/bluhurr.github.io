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
var pCard3Images = document.getElementById('tilt-images');
pCard3Images.arrow = pCard3Arrow;
pCard3Images.toggled = false;

window.onscroll = () => {
  "use strict";
  if(document.documentElement.scrollTop >= 20){
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  }else{
    myNav.classList.add("nav-transparent");
    myNav.classList.remove("nav-colored");
  }
};

window.onload = () => {
  setupEventHandlers();
}

function setupEventHandlers() {
  pCard1Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard1Images);
  }, false);
  pCard2Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard2Images);
  }, false);
  pCard3Arrow.addEventListener('click', ()=>{
    changeCardImages(pCard3Images);
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
  }else {
    imgContainer.arrow.style.transform = 'rotateZ(180deg)';
  }
  imgContainer.toggled = !imgContainer.toggled;
}
