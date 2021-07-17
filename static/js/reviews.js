import { stars } from './stars.js';
const submit_btn = document.querySelector('#review-submit');
const edit_btn = document.querySelector('#review-edit');
const delete_btn = document.querySelector('#review-delete');

let hoverable_stars = document.querySelector('#star-hover');
if (hoverable_stars != null)
{
    for (let i = 0; i < hoverable_stars.children.length; i++)
    {
        let elem = hoverable_stars.children[i];
        elem.addEventListener('mouseenter', () => {
            stars.fill_stars(hoverable_stars, elem.getAttribute('star'));
        });
        elem.addEventListener('mouseleave', () => {
            stars.fill_stars(hoverable_stars, hoverable_stars.getAttribute('value'));
        });
        elem.addEventListener('click', () => {
            hoverable_stars.setAttribute('value', elem.getAttribute('star'));
        });
    }
}

if (submit_btn != null)
{
    submit_btn.addEventListener('click', (evt) => {
        let rating = hoverable_stars.getAttribute('value');
        let review = document.querySelector('#review').value;
    
        if (rating == null)
        {
            return;
        }
            
        // evt.target refers to the button clicked
        let btn = evt.target;
        btn.disabled = true;
        btn.querySelector('span').classList.remove('d-none');
        let book_id = btn.getAttribute('book_id');
    
        fetch('/post_review', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'book_id': Number(book_id),
                'rating': rating,
                'review': review
            })
        }).then((response) => {
            if (response.status != 200)
            {
                alert('Error: ' + response.statusText);
                btn.disabled = false;
                btn.querySelector('span').classList.add('d-none');
                return;
            }
            response.json().then((data) => {
                if (data.result == true)
                {
                    location.reload();
                }
            });
        });
    });
}

if (edit_btn != null && delete_btn != null)
{
    edit_btn.addEventListener('click', () => {
        let rating = hoverable_stars.getAttribute('value');
        let review = document.querySelector('#review').value;

        edit_btn.disabled = true;
        edit_btn.querySelector('span').classList.remove('d-none');

        fetch('/edit_review', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'book_id': Number(edit_btn.getAttribute('book_id')),
                'rating': rating,
                'review': review
            })
        }).then((response) => {
            if (response.status != 200)
            {
                alert('Error: ' + response.statusText);
                edit_btn.disabled = false;
                edit_btn.querySelector('span').classList.add('d-none');
                return;
            }
            response.json().then((data) => {
                if (data.result === true)
                {
                    location.reload();
                }
            })
        }).catch((error) => {
            alert(error);
        });
    });

    delete_btn.addEventListener('click', () => {
        let book_id = delete_btn.getAttribute('book_id');

        delete_btn.disabled = true;
        delete_btn.querySelector('span').classList.remove('d-none');

        fetch(`/delete_review?book_id=${book_id}`).then((response) => {
            if (response.status != 200)
            {
                alert('Error: ' + response.statusText);
                delete_btn.disabled = false;
                delete_btn.querySelector('span').classList.add('d-none');
                return;
            }
            return response.json();
        }).then((data) => {
            if (data.result === true)
            {
                location.reload();
            }
        });
    })
}
