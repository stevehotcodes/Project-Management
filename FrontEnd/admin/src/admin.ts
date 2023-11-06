let modals :NodeListOf<HTMLDivElement> = document.querySelectorAll(".myModal");
let openModalBtns:NodeList = document.querySelectorAll(".add-btn");
let closeModalBtns:NodeList = document.querySelectorAll(".create-new-project-btn");
let close_icons:NodeList=document.querySelectorAll(".close")


openModalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modals[index].style.display = "flex";
    modals[index].style.flexDirection = "column";
  });
});


closeModalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modals[index].style.display = "none";
  });
});

close_icons.forEach((btn,index)=>{
  btn.addEventListener('click',()=>{
    modals[index].style.display = "none";
  })
})
