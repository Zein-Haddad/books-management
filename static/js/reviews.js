import { stars } from './stars.js';

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
            stars.fill_stars(hoverable_stars, hoverable_stars.value);
        });
        elem.addEventListener('click', () => {
            hoverable_stars.value = elem.getAttribute('star');
        });
    }
}
    
document.querySelector('#review-submit').addEventListener('click', (evt) => {
    let rating = hoverable_stars.value;
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
