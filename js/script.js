
// Menü ikonunu ve linkleri seçiyoruz
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

// İkona tıklandığında çalışacak fonksiyon
menuToggle.addEventListener('click', () => {
    // "active" sınıfını ekle/çıkar (toggle)
    navLinks.classList.toggle('active');
});