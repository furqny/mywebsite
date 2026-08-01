const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// =========================================
// Active Section Scrollspy (Navbar Highlight)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute("id");
                    navItems.forEach(link => {
                        if (link.getAttribute("href") === `#${currentId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});

// Lightbox functionality
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

function changeLang(lang) {

    localStorage.setItem('selectedLang', lang);

    const btnEn = document.getElementById('btn-en');
    const btnTr = document.getElementById('btn-tr');
    if (btnEn) btnEn.classList.remove('active-lang');
    if (btnTr) btnTr.classList.remove('active-lang');
    
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active-lang');

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

