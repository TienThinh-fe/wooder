// Header click and scroll
let menu = document.querySelectorAll('header .menu a')
let headerHeight = document.querySelector('header').offsetHeight
let sectionArray = []

function removeActiveClass(menu) {
    menu.forEach(function (menuElement, menuIndex) {
        menuElement.classList.remove('active');
    })
}

menu.forEach(function (element, index) {
    let href = element.getAttribute('href');
    let className = href.replace('#', '');
    let sectionClassName = '.' + className
    let section = document.querySelector(sectionClassName);
    sectionArray.push(section)

    element.addEventListener('click', function (e) {
        e.preventDefault();
        let positionSection = section.offsetTop;
        window.scrollTo({
            top: positionSection - headerHeight,
            behavior: 'smooth'
        })
        removeActiveClass(menu);
        element.classList.add('active');
    })
})

window.addEventListener('scroll', function (e) {
    let positionRoll = this.window.pageYOffset;

    sectionArray.forEach(function (section, index) {
        if (positionRoll > section.offsetTop - headerHeight - 2 && positionRoll < section.offsetTop + section.offsetHeight + 2) {
            removeActiveClass(menu);
            menu[index].classList.add('active')
        } else {
            menu[index].classList.remove('active');
        }
    })
})




// Nav
const menuBtn = document.querySelector(".btnmenu");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav ul li a");

menuBtn.addEventListener("click", function () {
    if (menuBtn.classList.contains("clicked")) {
        menuBtn.classList.remove("clicked");
        nav.classList.remove("open");
    } else {
        menuBtn.classList.add("clicked");
        nav.classList.add("open");
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
        nav.classList.remove("open");
        menuBtn.classList.remove("clicked");
    }
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(
            `.${link.getAttribute("href").replace("#", "")}`
        );
        window.scrollTo({
            top:
                section.getBoundingClientRect().top + window.scrollY - headerHeight + 5,
            behavior: "smooth",
        });
        nav.classList.remove("open");
        menuBtn.classList.remove("clicked");
    });
});


// Slider
let listItemSlider = document.querySelectorAll('.slider__item');
let currentSlider = 0;
let pagingNumber = document.querySelector('#number')
let dot = document.querySelectorAll('.paging__dotted li');

listItemSlider.forEach(function (itemSlider, index) {
    if (itemSlider.classList.contains('-active')) {
        currentSlider = index;
    }
})

function showNumber(index) {
    pagingNumber.innerHTML = (index).toString().padStart(2, '0');
}

// Default active
showNumber(currentSlider + 1);
dot[currentSlider].classList.add('active');

document.querySelector('.--next').addEventListener('click', function () {
    if (currentSlider < listItemSlider.length - 1) {
        goto(currentSlider + 1)
    } else {
        goto(0);
    }
})

document.querySelector('.--prev').addEventListener('click', function () {
    if (currentSlider > 0) {
        goto(currentSlider - 1)
    } else {
        goto(listItemSlider.length - 1);
    }
})

dot.forEach(function (li, index) {
    li.addEventListener('click', function () {
        goto(index);
    })
})

function goto(index) {
    listItemSlider[currentSlider].classList.remove('-active')
    listItemSlider[index].classList.add('-active')
    dot[currentSlider].classList.remove('active');
    currentSlider = index
    showNumber(currentSlider + 1);
    dot[index].classList.add('active');
}



// Language
const languageOptions = document.querySelector(".lang__option");
const languageOptionsList = document.querySelectorAll(".lang__option a");

const currentLanguageEl = document.querySelector(".lang__current span");


currentLanguageEl.addEventListener("click", function (e) {
    e.stopPropagation();
    languageOptions.style.display = 'block'
});

languageOptionsList.forEach(function (option) {
    option.addEventListener("click", () => {
        let langOption = option.textContent;
        let langTemp = currentLanguageEl.textContent;
        currentLanguageEl.textContent = langOption;
        option.textContent = langTemp;
        languageOptions.classList.remove("active");
    });
});

document.addEventListener("click", function (e) {
    languageOptions.style.display = 'none   '
});


// Pop up video
let buttonPlayVideo = document.querySelectorAll('.play_btn')
let popupVideo = document.querySelector('.popup-video')
let closePopup = document.querySelector('.popup-video .close')
let iframe = document.querySelector('.popup-video iframe')

buttonPlayVideo.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let videoID = btn.getAttribute('data-video-id');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID)
        popupVideo.style.display = "flex";
    })
})

closePopup.addEventListener('click', function () {
    popupVideo.style.display = 'none';
    iframe.setAttribute('src', '');
})

document.querySelector('.popup-video').addEventListener('click', function (e) {
    popupVideo.style.display = 'none';
    iframe.setAttribute('src', '');
})



// Back to top Function
let backToTop = document.querySelector('.btntop');

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

let positionSectionProduct = document.querySelector('.products').offsetTop;
let positionFooter = document.querySelector('footer').offsetTop;
let header = document.querySelector('header')

window.addEventListener('scroll', function () {
    let positionScroll = this.window.pageYOffset;
    if (positionScroll > positionSectionProduct) header.style.backgroundColor = 'black'
    if (positionScroll < positionSectionProduct) header.style.backgroundColor = 'transparent'
    if (positionScroll > positionSectionProduct && positionScroll < positionFooter) {
        backToTop.style.display = 'block'
    } else backToTop.style.display = 'none'
})