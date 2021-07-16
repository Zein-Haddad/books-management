// star template
// <span class="text-warning"><i class="bi bi-star" star="1"></i><i class="bi bi-star" star="2"></i><i class="bi bi-star" star="3"></i><i class="bi bi-star" star="4"></i><i class="bi bi-star" star="5"></i></span>
// treat span tag as 'stars'

// hoverable star template
/* <div class="fs-1 text-warning" name="star-hover" value="">
    <i class="bi bi-star" star="1"></i>
    <i class="bi bi-star" star="2"></i>
    <i class="bi bi-star" star="3"></i>
    <i class="bi bi-star" star="4"></i>
    <i class="bi bi-star" star="5"></i>
</div> */

const stars = (() => {
    const fill_stars = (stars, n) => {
        for (let i = 0; i < 5; i++)
        {
            if (i <= (n - 1))
            {
                // Filled stars
                stars.children[i].classList.add('bi-star-fill');
                stars.children[i].classList.remove('bi-star');
            }
            else
            {
                // Empty stars
                stars.children[i].classList.add('bi-star');
                stars.children[i].classList.remove('bi-star-fill');
            }
        }
    }

    return {fill_stars}
})();


// Code for writing a review
try
{
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

        
    });
} catch(error) {}

