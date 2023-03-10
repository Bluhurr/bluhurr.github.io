var ham = document.querySelector(".hamburger");
ham.opened = false;
ham.addEventListener('click', (e)=>{
  if(!ham.opened){
    document.querySelector('.mobile-nav-link-container').style.display = "flex";
  }else {
    document.querySelector('.mobile-nav-link-container').style.display = "none";
  } 

  ham.opened = !ham.opened;
});
