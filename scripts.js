document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos después de que el DOM esté cargado

    document.getElementById('dietas-link').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarVista('dietas');
    });
    
    document.getElementById('relojes-link').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarVista('relojes');
    });
    
    document.getElementById('carrito-compras-link').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarVista('carrito');
    });

    document.getElementById('perfil').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarVista('perfil');
    });
    document.getElementById('salud-link').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarVista('salud');
    });
});

const username = "admin";
const password = "admin";


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
    if (enteredUsername === username && enteredPassword === password) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('error-message').textContent = "Usuario o contraseña incorrectos.";
    }
});


function mostrarVista(vista) {
    fetch(`${vista}.html`)
        .then(response => response.text())
        .then(data => {

            document.getElementById('view-container').innerHTML = data;
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

            if (vista === 'dietas') {

                document.getElementById(vista + '-link').classList.add('active');

                inicializarGrafico();
                
            } else if (vista === 'carrito') {

                document.getElementById('carrito-compras-icon').classList.add('active');
                actualizarCarrito();

            } else if (vista === 'relojes') {

                document.getElementById(vista + '-link').classList.add('active');

            } else if (vista === 'compra') {

                actualizarPago();
            } else if (vista === 'perfil') {
                document.getElementById('perfil_img').classList.add('active');

            }  else if (vista === 'salud') {
                document.getElementById('salud-link').classList.add('active');

            }  


        })

        .catch(error => console.error('Error al cargar la vista:', error));
}

function actualizarPago() {

    const totalContainer = document.getElementById('reloj-seleccionado');
    const precioTotal = calcularPrecioTotal();
    totalContainer.textContent = `S/ ${precioTotal}`;
}

function inicializarGrafico() {
    const ctx = document.getElementById('progresoChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
            datasets: [{
                label: 'Progreso',
                data: [0, 10, 20, 30, 25, 15],
                fill: false,
                borderColor: '#4caf50',
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40
                }
            }
        }
    });
}

function confirmarPago() {
    if (confirm("¿Estás seguro que deseas realizar el pago?")) {
        alert("¡Pago realizado con éxito!");
    } else {
        alert("Pago cancelado.");
    }
}

let carrito = [];

function agregarAlCarrito(nombre, imagen, precio) {
    const producto = { nombre, imagen, precio };
    carrito.push(producto);
    mostrarMensaje('Producto añadido al carrito satisfactoriamente.');
    actualizarCarrito();
    console.log('Carrito actual:', carrito);
}

function calcularPrecioTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });
    return total.toFixed(2); 
}
function actualizarCarrito() {
    const carritoProductosContainer = document.getElementById('carrito-productos');
    const totalContainer = document.getElementById('carrito-total');

    if (carrito.length === 0) {
        carritoProductosContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalContainer.textContent = '';
        
        // Deshabilitar el botón "Pagar" cuando no hay productos
        const pagarButton = document.getElementById('pagar-button');
        if (pagarButton) {
            pagarButton.disabled = true;
        }
    } else {
        carritoProductosContainer.innerHTML = '';
        carrito.forEach((producto) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto');
            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: ${producto.precio}</p>
                <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
            `;
            carritoProductosContainer.appendChild(productoElement);
        });

        // Mostrar el precio total
        const precioTotal = calcularPrecioTotal();
        totalContainer.textContent = `Total: ${precioTotal} S/`;

        // Habilitar el botón "Pagar" cuando hay productos
        const pagarButton = document.getElementById('pagar-button');
        if (pagarButton) {
            pagarButton.disabled = false;
        }
    }
}

    

    

function mostrarMensaje(mensaje) {
    const mensajeElement = document.getElementById('mensaje-confirmacion');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add('mostrar');

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeElement.classList.remove('mostrar');
    }, 3000);
}

function mostrarCarrito() {
    document.getElementById('modal-carrito').classList.remove('hidden');
}

function cerrarModalCarrito() {
    document.getElementById('modal-carrito').classList.add('hidden');
}

function eliminarProducto(nombreProducto) {
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    actualizarCarrito();
}

function pagar() {
    mostrarVista('compra');
}

function validarFormulario() {

    // Validar el formulario en JavaScript
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const fechaCaducidad = document.getElementById('fecha-caducidad').value.trim();
    const codigoSeguridad = document.getElementById('codigo-seguridad').value.trim();
    const numTarjeta = document.getElementById('num-tarjeta').value.trim();

    // Validación básica para los campos

    if (nombre === '' || apellido === '' || email === '' || direccion === '' ||
        ciudad === '' || provincia === '' || zip === '' || telefono === '' ||
        numTarjeta === '' || fechaCaducidad === '' || codigoSeguridad === '') {
        alert('Por favor completa todos los campos.');
        return false;
    }

    // Validación específica para fecha de caducidad
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(fechaCaducidad)) {
        alert('Por favor ingresa una fecha de caducidad válida en formato MM/YY.');
        return false;
    }

    // Validación específica para código de seguridad
    if (!/^[0-9]{3,4}$/.test(codigoSeguridad)) {
        alert('Por favor ingresa un código de seguridad válido (3 o 4 dígitos numéricos).');
        return false;
    }

    confirmarPago()
    
    // Si la validación pasa, puedes enviar el formulario
    return true;
}

function actualizarPerfil() {
    // Obtener los valores actualizados de los campos del perfil
    var nombre = document.getElementById("nombre-perfil").value;
    var apellido = document.getElementById("apellido-perfil").value;
    var email = document.getElementById("email-perfil").value;
    var direccion = document.getElementById("direccion-perfil").value;
    var ciudad = document.getElementById("ciudad-perfil").value;
    var provincia = document.getElementById("provincia-perfil").value;
    var zip = document.getElementById("zip-perfil").value;
    var telefono = document.getElementById("telefono-perfil").value;

    // Aquí podrías enviar estos datos a través de una solicitud AJAX a tu servidor
    // o simplemente mostrar un mensaje de confirmación en la consola para propósitos demostrativos
    console.log("Datos actualizados:");
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Email:", email);
    console.log("Dirección:", direccion);
    console.log("Ciudad:", ciudad);
    console.log("Provincia:", provincia);
    console.log("Código Postal:", zip);
    console.log("Teléfono:", telefono);

    // Aquí podrías implementar el código para enviar los datos a tu servidor
    // por ejemplo, utilizando fetch() o XMLHttpRequest para enviar una solicitud POST

    // Ejemplo de cómo podrías manejar la actualización visualmente (simulación)
    alert("Perfil actualizado correctamente");
}
