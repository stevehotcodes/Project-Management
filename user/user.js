document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.querySelector('.card:nth-child(2) .heading button');
    const modal = document.getElementById('myModal');
    const closeModalBtn = document.getElementById('closeModal');
    const commentForm = document.getElementById('commentForm');

    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const commentText = document.getElementById('commentText').value;
        

        modal.style.display = 'none';
    });
});
