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

export { stars }
