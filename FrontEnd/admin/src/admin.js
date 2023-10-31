let  modal = document.getElementById("myModal");
console.log(modal)
var openModalBtn = document.querySelectorAll(".openModalBtn");
var closeModalBtn = document.querySelectorAll(".closeModalBtn");

// Show the modal when the button is clicked
openModalBtn.onclick = function() {
    modal.style.display = "flex";
    modal.style.flexDirection="column"
}

// Hide the modal when the close button is clicked
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}