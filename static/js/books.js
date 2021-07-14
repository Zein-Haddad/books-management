const request = (() => {
    const update_book = (book_id, status) => {
        fetch('/update_books', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'book_id': book_id,
                'status': status
            })
        }).then((response) => {
            if (response.status != 200)
            {
                console.log(response.statusText);
            }
            response.json().then((data) => {
                if (data.result === true)
                {
                    location.reload();
                }
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    const delete_book = (book_id) => {

    }

    return {update_book, delete_book}
})();

document.querySelectorAll('button[name="book-action-item"]').forEach((elem) => {
    elem.addEventListener('click', () => {
        let book_id = elem.getAttribute('book_id');
        let status = elem.getAttribute('status');
        request.update_book(book_id, status);
    });
});