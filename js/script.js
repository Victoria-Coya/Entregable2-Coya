//Productos
const productos = [
    { id: 1, nombre: "Camiseta", precio: 5000 },
    { id: 2, nombre: "Pantalón", precio: 12000 },
    { id: 3, nombre: "Zapatillas", precio: 50000 }
];

//Variables
let carrito = [];
let total = 0;

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
}

// Función para cargar el carrito de localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    if (totalGuardado) {
        total = parseFloat(totalGuardado);
    }
}

// Función para mostrar productos disponibles
function mostrarProductos() {

    const contenedorProductos = document.getElementById('productos')
    contenedorProductos.innerHTML = '';

    let mensaje = "Productos disponibles:\n";
    productos.forEach(prod => {
        mensaje += `${prod.id}. ${prod.nombre} - $${prod.precio}\n`;
    });

    productos.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `${prod.nombre} - $${prod.precio} <button onclick="agregarProducto(${prod.id})">Agregar al carrito</button>`;
        contenedorProductos.appendChild(div);
    });

    return mensaje;
}

// Función para agregar productos al carrito
function agregarProducto(id) {

    const productoSeleccionado = productos.find(producto => producto.id === id);

    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        total += productoSeleccionado.precio;
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }
}


// Función para mostrar el resumen de la compra
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = '';
    let mensaje = "<ul>";
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "No hay productos en el carrito.";
    } else {

        carrito.forEach((item) => {
            mensaje += `<li>${item.nombre} - $${item.precio}</li>`;
        });
    }

    mensaje += `</ul><strong>Total: $${total}</strong>`;
    contenedorCarrito.innerHTML = mensaje;
}

// Función principal
function iniciarSimulador() {
    alert("Bienvenido a la tienda online");
    agregarProducto();
    mostrarCarrito();
    let confirmar = confirm("¿Desea confirmar la compra?");
    if (confirmar) {
        alert("Compra realizada con éxito. ¡Gracias por su compra!");
    } else {
        alert("Compra cancelada.");
    }
}

document.getElementById('confirmarCompra').onclick = function () {
    if (carrito.length > 0) {
        const confirmar = confirm("¿Desea confirmar la compra?");
        if (confirmar) {
            alert("Compra realizada con éxito. ¡Gracias por su compra!"); carrito = [];
            total = 0;
            mostrarCarrito();
        } else {
            alert("Compra cancelada.");
        }
    } else {
        alert("No hay productos en el carrito para confirmar.");
    }
}

function iniciarSimulador() {
    cargarCarritoDesdeLocalStorage();
    mostrarProductos();
    mostrarCarrito();
}

iniciarSimulador();