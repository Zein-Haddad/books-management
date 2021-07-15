const request = (() => {
    const update_book = (book_id, status) => {
        return fetch('/update_book', {
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
                return false;
            }
            return response.json().then((data) => data.result);
        }).catch((error) => {
            console.warn(error);
            return false;
        });
    }

    const delete_book = (book_id) => {
        return fetch('/delete_book', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'book_id': book_id
            })
        }).then((response) => {
            if (response.status != 200)
            {
                console.log(response.statusText);
                return false;
            }
            return response.json().then((data) => data.result)
        }).catch((error) => {
            console.warn(error);
            return false;
        });
    }

    return {update_book, delete_book}
})();

document.querySelectorAll('button[name="book-action-item"]').forEach((elem) => {
    elem.addEventListener('click', () => {
        if (elem.classList.contains('active'))
        {
            return;
        }

        let book_id = elem.getAttribute('book_id');
        let status = elem.getAttribute('status');
        request.update_book(book_id, status).then((response) => {
            if (response === false)
            {
                console.warn("Error updating book");
                return;
            }

            let menu = elem.parentElement.parentElement;
            let btn = menu.parentElement.querySelector('button');
            
            for (let i = 0; i < menu.children.length; i++)
            {
                menu.children[i].firstChild.classList.remove("active");
                menu.children[i].firstChild.classList.remove("suppress-hover");
            }
            elem.classList.add("active");
            elem.classList.add("suppress-hover");
            
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-success');
            btn.innerHTML = (status == 2) ? '<i class="bi bi-check"></i> Currently Reading ' : (status == 3) ? '<i class="bi bi-check"></i> Read ' : '<i class="bi bi-check"></i> Want to Read ';
        });
    });
});

document.querySelectorAll('button[name="book-action-delete"]').forEach((elem) => {
    elem.addEventListener('click', () => {
        let book_id = elem.getAttribute('book_id');
        request.delete_book(book_id).then((response) => {
            if (response == false) {
                console.warn('Error removing book');
                return;
            }
            
            let menu = elem.parentElement.parentElement;
            let btn = menu.parentElement.querySelector('button');

            let list = []
            for (let i = 0; i < menu.children.length; i++)
            {
                menu.children[i].firstChild.classList.remove("active");
                menu.children[i].firstChild.classList.remove("suppress-hover");
                if (menu.children[i].firstChild.classList.contains('dropdown-divider') || menu.children[i].firstChild.getAttribute('name') === 'book-action-delete')
                {
                    list.push(menu.children[i]);
                }
            }
            list.forEach((el) => {
                el.remove();
            })

            btn.classList.add('btn-success');
            btn.classList.remove('btn-primary');
            btn.innerHTML = "Want to Read ";
        })
    });
});
