header = document.querySelector('header').getBoundingClientRect();
main = document.querySelector('main');
footer = document.querySelector('footer').getBoundingClientRect();

height = screen.height - header.height - footer.height;
main.style.minHeight = `${height}px`;