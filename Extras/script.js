document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. Funcionalidad del Carrusel de Fotos
    // ------------------------------------
    const carouselImgs = document.querySelectorAll('.carousel-img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showImage(index) {
        // Oculta todas las imágenes
        carouselImgs.forEach(img => img.classList.remove('active'));
        // Muestra la imagen actual, asegurando que el índice esté dentro del rango
        carouselImgs[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % carouselImgs.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + carouselImgs.length) % carouselImgs.length;
        showImage(currentIndex);
    }

    // Event Listeners para los botones
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
    }

    // Autoplay del carrusel
    let carouselInterval = setInterval(nextImage, 5000); // Cambia cada 5 segundos

    // Pausar al pasar el ratón
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseover', () => clearInterval(carouselInterval));
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextImage, 5000);
        });
    }

    // Inicializar el carrusel
    if (carouselImgs.length > 0) {
        showImage(currentIndex);
    }

    // ------------------------------------
    // 2. Animaciones al hacer Scroll (Intersection Observer)
    // ------------------------------------
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'animated'
                entry.target.classList.add('animated');
                // Deja de observar el elemento una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1 // El 10% del elemento debe ser visible
    });

    // Observar cada elemento
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Forzar la animación de los elementos visibles al inicio (como los del hero)
    setTimeout(() => {
        document.querySelector('.hero-section h1').classList.add('animated');
        document.querySelector('.hero-section p').classList.add('animated');
    }, 100);

});