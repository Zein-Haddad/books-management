import { stars } from './stars.js';

document.querySelectorAll('[name="star"]').forEach((elem) => {
    stars.fill_stars(elem, Number(elem.getAttribute('value')))
});
