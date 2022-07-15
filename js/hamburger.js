var ham = document.querySelector(".hamburger");
ham.opened = false;
ham.addEventListener('click', (e)=>{
  if(!ham.opened){
    document.querySelector('.mobile-nav-link-container').style.display = "block";
    if(document.querySelector('.nav-transparent')){
      document.querySelector('.nav-transparent').style.backgroundColor = "#08c";
    }
    if(document.querySelector('.nav-colored')){
      document.querySelector('.nav-colored').style.backgroundColor = "#08c";
    }
  }else {
    document.querySelector('.mobile-nav-link-container').style.display = "none";
    if(document.querySelector('.nav-transparent')){
      document.querySelector('.nav-transparent').style.backgroundColor = "rgba(0, 53, 73, 0.3)";
    }
    if(document.querySelector('.nav-colored')){
      document.querySelector('.nav-colored').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    }
  } 

  ham.opened = !ham.opened;
});
