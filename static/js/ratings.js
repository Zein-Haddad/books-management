import { stars } from './stars.js';

document.querySelectorAll('[name="star"]').forEach((elem) => {
    stars.fill_stars(elem, Number(elem.getAttribute('value')))
});

document.querySelectorAll('[name="review-text"]').forEach((elem) => {
    elem.innerHTML = elem.innerHTML.replace(/(?:\r\n|\r|\n)/g, '<br>');
});
