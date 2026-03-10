/* -------------------------------------- */
/* 1. HAMBURGER MENÜ KODLARI            */
/* -------------------------------------- */
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/* -------------------------------------- */
/* 2. LIGHTBOX (GALERİ) KODLARI         */
/* -------------------------------------- */

const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentIndex = 0; 

if (lightbox) {

    // 1. Resimlere tıklanınca Lightbox'ı aç
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active'); 
            lightboxImg.src = image.src;      
            currentIndex = index;             
            
            // Açılır açılmaz butonları kontrol et (İlk veya son resim mi?)
            updateButtons();
        });
    });

    // 2. Kapatma işlemleri
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 3. BUTON GİZLEME/GÖSTERME FONKSİYONU
    function updateButtons() {
        // Eğer ilk resimdeysek (0. indeks), Geri butonunu gizle
        if (currentIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Eğer son resimdeysek (toplam sayı - 1), İleri butonunu gizle
        if (currentIndex === galleryImages.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
    }

    // 4. Resmi Değiştirme Fonksiyonu
    function showImage(index) {
        // Sınırların dışına çıkılmasını engelle (Güvenlik önlemi)
        if (index < 0 || index >= galleryImages.length) return;
        
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        
        // Her resim değiştiğinde butonları tekrar kontrol et
        updateButtons();
    }

    // 5. İleri / Geri Butonları
    nextBtn.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });
    
    // 6. Klavye Desteği
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') lightbox.classList.remove('active');
        
        // Sağ oka basınca, eğer son resimde değilsek ilerle
        if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            showImage(currentIndex + 1);
        }
        
        // Sol oka basınca, eğer ilk resimde değilsek geri git
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    });
} // <-- EKSİK OLAN IF(LIGHTBOX) KAPANIŞI BURAYA GELDİ

/* -------------------------------------- */
/* 3. GÜVENLİK VE KORUMA KODLARI        */
/* -------------------------------------- */

// 1. Resimlerin Sürüklenmesini Engelle (Drag & Drop)
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

// 2. Klavye Kısayollarını Engelle (F12, CTRL+U, CTRL+S)
document.addEventListener('keydown', function(e) {
    
    // F12 Tuşu (Geliştirici Araçları)
    if (e.key === 'F12') {
        e.preventDefault();
    }

    // CTRL + U (Kaynak Görüntüle)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }

    // CTRL + SHIFT + I (İncele / Inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'i') {
        e.preventDefault();
    }

    // CTRL + S (Sayfayı Kaydet)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault(); 
    }
});


/* -------------------------------------- */
/* 4. ÇOKLU DİL SİSTEMİ (i18n)          */
/* -------------------------------------- */

function changeLang(lang) {
    // 1. Seçilen dili tarayıcı hafızasına kaydet
    localStorage.setItem('selectedLang', lang);

    // 2. Butonların renklerini ayarla
    document.getElementById('btn-en').classList.remove('active-lang');
    document.getElementById('btn-tr').classList.remove('active-lang');
    document.getElementById('btn-' + lang).classList.add('active-lang');

    // 3. Sitedeki "lang-text" sınıfına sahip tüm yazıları bul ve değiştir
    const elements = document.querySelectorAll('.lang-text');
    elements.forEach(el => {
        // data-en veya data-tr özelliğindeki yazıyı alıp HTML'e bas
        if (el.getAttribute(`data-${lang}`)) {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        }
    });
}

// Sayfa yüklendiğinde hafızadaki dili kontrol et
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    
    // Eğer butonlar sayfada varsa dili değiştir
    if(document.getElementById('btn-en')) {
        changeLang(savedLang);
    }
});


/* -------------------------------------- */
/* 5. PARTICLES.JS (HAREKETLİ ARKA PLAN)  */
/* -------------------------------------- */

if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 70, // Ekranda uçuşan nokta sayısı (Göz yormaması için 70 ideal)
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": ["#6366f1", "#a855f7", "#ffffff"] }, // Senin renklerin: İndigo, Mor ve Beyaz
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
                "color": "#6366f1", // Çizgi rengi
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5, // Uçuşma hızı
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
                "onhover": { "enable": true, "mode": "grab" }, // Fare yaklaşınca çizgilerle tutunur
                "onclick": { "enable": true, "mode": "push" }, // Tıklayınca yeni parçacık ekler
                "resize": true
            },
            "modes": {
                "grab": { "distance": 160, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 3 } // Tıklayınca 3 tane fırlatır
            }
        },
        "retina_detect": true
    });
}