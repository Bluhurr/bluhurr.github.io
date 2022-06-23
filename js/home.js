const downArrow = document.getElementById('main-arrow');
downArrow.addEventListener('click', (e)=>{
  document.getElementById('home-about-content').scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
});

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
