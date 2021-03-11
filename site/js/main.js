// ! Chrome mobile viewport height hack
function lockSize(query) {
    const elem = document.querySelector(query);
    const vh = window.innerHeight * 0.01;
    elem.style.setProperty('--vh', `${vh}px`);
}

lockSize('body');
window.addEventListener('resize', () => lockSize('body'));
