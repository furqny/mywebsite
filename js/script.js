const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentIndex = 0;

if (lightbox) {

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = image.src;
            currentIndex = index;

            updateButtons();
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    function updateButtons() {

        if (currentIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        if (currentIndex === galleryImages.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
    }

    function showImage(index) {

        if (index < 0 || index >= galleryImages.length) return;

        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;

        updateButtons();
    }

    nextBtn.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') lightbox.classList.remove('active');

        if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            showImage(currentIndex + 1);
        }

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    });
}

document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

document.addEventListener('keydown', function(e) {

    if (e.key === 'F12') {
        e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'i') {
        e.preventDefault();
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
    }
});

function changeLang(lang) {

    localStorage.setItem('selectedLang', lang);

    document.getElementById('btn-en').classList.remove('active-lang');
    document.getElementById('btn-tr').classList.remove('active-lang');
    document.getElementById('btn-' + lang).classList.add('active-lang');

    const elements = document.querySelectorAll('.lang-text');
    elements.forEach(el => {

        if (el.getAttribute(`data-${lang}`)) {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';

    if(document.getElementById('btn-en')) {
        changeLang(savedLang);
    }
});

if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 70,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": ["#6366f1", "#a855f7", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6366f1",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 160, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 3 }
            }
        },
        "retina_detect": true
    });
}
