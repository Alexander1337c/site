const btnMenu = document.querySelector('.btn-menu');
const header = document.querySelector('.header');
const headerInner = document.querySelector('.header__inner')
const nav = document.querySelectorAll('.nav__link');
const navHeight = headerInner.getBoundingClientRect().height;

const closeMenu = function () {
    headerInner.classList.remove('active');
    btnMenu.classList.remove('active');

}

header.addEventListener('click', function (e) {
    if (e.target.closest('.container') || e.target.closest('.nav__link')) closeMenu();
})

btnMenu.addEventListener('click', function () {
    headerInner.classList.toggle('active');
    btnMenu.classList.toggle('active')
})

document.querySelector('.nav').addEventListener('click', function (e) {
    e.preventDefault();


    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});


const stickyNav = function (entries) {
    const [entry] = entries;

    const change = function (color) {
        nav.forEach(n => n.style.color = `${color}`)
    }

    if (!entry.isIntersecting) {
        headerInner.classList.add('sticky');
        change('#0cb57b')
    }
    else {
        headerInner.classList.remove('sticky');
        change('aliceblue')
    }

};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);


const allContainer = document.querySelectorAll('.container');

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('container--hidden');
    observer.unobserve(entry.target);
};

const containerObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0,
});

allContainer.forEach(function (container) {
    containerObserver.observe(container);
    container.classList.add('container--hidden');
});

const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn-left');
    const btnRight = document.querySelector('.slider__btn-right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;
    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();