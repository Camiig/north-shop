
const toggleBtn = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (toggleBtn && navList) {
  // Abre/cierra el menú al hacer click en el botón
  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  // Cierra el menú al hacer click en cualquier enlace del menú
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
    });
  });
}

// Función para deslizar el carrusel de reseñas
function scrollResenias(direction) {
  const slider = document.getElementById("reseniasSlider");
  const scrollAmount = 300;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
