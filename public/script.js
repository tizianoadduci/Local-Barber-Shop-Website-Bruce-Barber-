document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica del Carrusel con Efecto Ken Burns ---
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const intervalTime = 3500; // 4 segundos por foto

    function nextSlide() {
        // Quitamos la clase active de la actual
        slides[currentSlide].classList.remove('active');
        
        // Calculamos la siguiente
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Añadimos la clase active a la siguiente (esto reinicia la animación CSS)
        slides[currentSlide].classList.add('active');
    }

    // Iniciamos el intervalo automático
    // Nota: La primera imagen ya tiene la clase 'active' en el HTML, así que arranca sola.
    setInterval(nextSlide, intervalTime);


    // --- Animaciones al hacer Scroll (Intersection Observer) ->Esta es tanto para la animación del texto del home, como la de la sección Nuestros servicios, como la de Nosotros y promociones ---
const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // El elemento entra en el viewport: Añadimos 'visible' para animar.
            entry.target.classList.add('visible');
            // ELIMINAMOS: observer.unobserve(entry.target); 
        } else {
            // El elemento sale del viewport: Quitamos 'visible' para que se reinicie al volver a entrar.
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1 // Sigue usando 10% del umbral
});

elementsToAnimate.forEach(el => {
    observer.observe(el);
});


// --- LÓGICA DE PULSO SECUENCIAL (INICIADA POR SCROLL, es decir, comenzar los efectos y secuencia de pulso apenas se abre la sección) ---
const serviceSteps = document.querySelectorAll('.service-step');
let currentStep = 0;
const pulseInterval = 4000; // 5 segundos
let pulseStarted = false; // Bandera para que solo inicie una vez

function pulseNextStep() {
    // 1. Quitar la clase 'pulsing' del paso anterior (ciclo)
    if (currentStep > 0) {
        serviceSteps[currentStep - 1].classList.remove('pulsing');
    } else {
        serviceSteps[serviceSteps.length - 1].classList.remove('pulsing');
    }

    // 2. Aplicar la clase 'pulsing' al paso actual
    serviceSteps[currentStep].classList.add('pulsing');

    // 3. Avanzar al siguiente paso (ciclo infinito)
    currentStep = (currentStep + 1) % serviceSteps.length;
}

function startSequentialPulse() {
    // Si ya inició o no hay pasos, salir
    if (pulseStarted || serviceSteps.length === 0) return;
    pulseStarted = true; 
    
    // Iniciar inmediatamente con el primer paso (index 0)
    pulseNextStep(); 

    // Establecer el intervalo para los siguientes pasos
    setInterval(pulseNextStep, pulseInterval);
}


// --- NUEVO OBSERVER PARA INICIAR EL PULSO (esto sigue siendo para que comienze los efectos y secuencia de pulso apenas se abre la sección) ---
// Usaremos un observador diferente para la sección de servicios
const pulseObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Cuando cualquier paso de servicio entra en el viewport y el pulso no ha iniciado
        if (entry.isIntersecting) {
            startSequentialPulse();
            observer.unobserve(entry.target); // Dejamos de observar una vez que inicia
        }
    });
}, {
    threshold: 0.1
});

// Observar cada paso de servicio
serviceSteps.forEach(el => {
    pulseObserver.observe(el);
});


    // --- AÑO AUTOMÁTICO FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});