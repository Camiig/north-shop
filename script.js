document.addEventListener('DOMContentLoaded', function () {
  console.log("Script funcionando");

  const toggleBtn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    // Cierra el menú al hacer click en cualquier enlace
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });
}

  // Función para deslizar el carrusel de reseñas
  function scrollResenias(direction){
    const slider = document.getElementById("reseniasSlider");
    const scrollAmount = 300;
    slider.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  window.scrollResenias = scrollResenias; // Lo hago global para el onclick del HTML

  const productos = [
    {
      nombre: "Hoodie casa Lannister",
      precio: 30000,
      imagen: "img/hoodie-lannister.jpg",
      alt: "hoodie casa lannister"
    },
    {
      nombre: "Remera casa Stark",
      precio: 25000,
      imagen: "img/remera-stark.jpg",
      alt: "remera casa stark"
    },
    {
      nombre: "Remera John Snow",
      precio: 25000,
      imagen: "img/remera-johnsnow.jpg",
      alt: "remera John Snow"
    },
    {
      nombre: "Remera Game Of Thrones",
      precio: 25000,
      imagen: "img/remera-GOT.jpg",
      alt: "remera GOT"
    },
    {
      nombre: "Gorra casa Lannister",
      precio: 12000,
      imagen: "img/gorra-casa-lannister.jpg",
      alt: "gorra casa lannister"
    },
    {
      nombre: "Gorra Dracarys",
      precio: 12000,
      imagen: "img/gorra-dracarys.jpg",
      alt: "gorra Dracarys"
    },
    {
      nombre: "Funda Game Of Thrones",
      precio: 8000,
      imagen: "img/funda-GOT.jpg",
      alt: "funda GOT"
    },
    {
      nombre: "Funda winter is coming",
      precio: 8000,
      imagen: "img/funda-winter-is-coming.jpg",
      alt: "funda winter is coming"
    },
    {
      nombre: "Funda casa Lannister",
      precio: 8000,
      imagen: "img/funda-lannister.jpg",
      alt: "funda casa lannister"
    },
    {
      nombre: "Mate Game Of Thrones",
      precio: 18000,
      imagen: "img/mate.jpg",
      alt: "matero GOT"
    },
    {
      nombre: "Monopoly Game Of Thrones",
      precio: 20500,
      imagen: "img/monopoly.jpg",
      alt: "monopoly GOT"
    },
    {
      nombre: "Tazas",
      precio: 10200,
      imagen: "img/tazas-casas.jpg",
      alt: "tazas GOT"
    }
  ];

  function mostrarProductos(){
    var contenedor = document.getElementById("contenedor-productos");

    for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];

      contenedor.insertAdjacentHTML("beforeend", `
        <div class="producto">
          <img src="${producto.imagen}" alt="${producto.alt}">
          <div class="producto-info">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
          </div>
          <button class="btn-agregar" type="button" data-id="${producto.nombre}">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      `);
    }
  }

  mostrarProductos();

  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  //Agregar evento para los botones de "agregar al carrito"
  var contenedor = document.getElementById("contenedor-productos");

  contenedor.addEventListener("click", function(evento){
    var boton = evento.target.classList.contains("btn-agregar") 
      ? evento.target 
      : evento.target.closest(".btn-agregar");

    if (boton) {
      var nombreProducto = boton.getAttribute("data-id");
      console.log("Agregando producto:", nombreProducto); // Línea de prueba
      agregarAlCarrito(nombreProducto);
    }
  });

  //Función agregarAlCarrito(nombreProducto)
  function agregarAlCarrito(nombreProducto){
    console.log("Agregando producto:", nombreProducto);
    var productoEncontrado = carrito.find(function(item) {
      return item.nombre === nombreProducto;
    });

    if (productoEncontrado){
      productoEncontrado.cantidad += 1;
    } else {
      var productoOriginal = productos.find(function(p) {
        return p.nombre === nombreProducto;
      });

      carrito.push({
        nombre: productoOriginal.nombre,
        precio: productoOriginal.precio,
        cantidad: 1
      });
    }

    actualizarCarrito();
  }

  //Mostrar los productos en el carrito
  function actualizarCarrito(){
    var lista = document.getElementById("carrito-lista");
    var total = document.getElementById("total-carrito");
    var cantidad = document.getElementById("cantidad-carrito");

    lista.innerHTML = "";

    var totalPrecio = 0;
    var totalCantidad = 0;

    carrito.forEach(function(producto){
      totalPrecio += producto.precio * producto.cantidad;
      totalCantidad += producto.cantidad;

      lista.insertAdjacentHTML("beforeend", `
        <div class="carrito-item">
          ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
    <button class="btn-eliminar" data-id="${producto.nombre}">
        <i class="fa-solid fa-trash"></i>
    </button>
        </div>
      `);
    });

    total.textContent = totalPrecio;
    cantidad.textContent = totalCantidad;

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  //Eliminar productos del carrito
  var carritoContainer = document.getElementById("carrito-container");

  carritoContainer.addEventListener("click", function(evento){
    var btn = evento.target.closest(".btn-eliminar");
    if (btn) {
      var nombre = btn.getAttribute("data-id");
      eliminarDelCarrito(nombre);
    }
  });

  function eliminarDelCarrito(nombreProducto){
    carrito = carrito.filter(function(item) {
      return item.nombre !== nombreProducto;
    });

    actualizarCarrito();
  }
});






