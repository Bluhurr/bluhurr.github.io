const myNav = document.getElementById('navbar');

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
