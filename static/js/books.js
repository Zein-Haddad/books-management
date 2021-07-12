

document.querySelectorAll('button[book-action-item]').forEach((elem) => {
    elem.addEventListener('click', () => {
        alert('clicked');
    });
});