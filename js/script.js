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

    // 3. BUTON GİZLEME/GÖSTERME FONKSİYONU (YENİ)
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

/* -------------------------------------- */
/* 3. GÜVENLİK VE KORUMA KODLARI        */
/* -------------------------------------- */

// NOT: Sağ tık engeli kaldırıldı. Kullanıcılar sağ tıklayıp resmi indirebilir.

// 1. Resimlerin Sürüklenmesini Engelle (Drag & Drop)
// Bu kod, resmin tutulup masaüstüne veya başka sekmeye sürüklenmesini önler.
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

// 2. F12 ve Geliştirici Araçlarını (Kısayolları) Zorlaştırma
// İncele (Inspect) yapılmasını zorlaştırmak için kısayolları kapatıyoruz.
document.addEventListener('keydown', function(e) {
    // F12 Tuşu
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // CTRL+U (Kaynak Görüntüle)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
    // CTRL+SHIFT+I (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'i') {
        e.preventDefault();
    }
});
}