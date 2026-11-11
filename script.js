// ===================================
// 1. PRODUCTOS DE LA CAFETERÍA
// ===================================

const productos = [
    {
        nombre: "Café americano",
        categoria: "Cafés",
        descripcion: "Café tradicional de sabor intenso.",
        precio: "$4.000",
        imagen: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Capuchino",
        categoria: "Cafés",
        descripcion: "Café espresso con leche espumosa.",
        precio: "$6.000",
        imagen: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Café latte",
        categoria: "Cafés",
        descripcion: "Café suave con leche caliente.",
        precio: "$5.500",
        imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Frappé de café",
        categoria: "Bebidas frías",
        descripcion: "Bebida fría de café con hielo.",
        precio: "$8.000",
        imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Limonada natural",
        categoria: "Bebidas frías",
        descripcion: "Refrescante limonada preparada al momento.",
        precio: "$5.000",
        imagen: "limonada.jpg"
    },
    {
        nombre: "Malteada de chocolate",
        categoria: "Bebidas frías",
        descripcion: "Deliciosa malteada cremosa.",
        precio: "$8.500",
        imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Croissant",
        categoria: "Panadería",
        descripcion: "Pan de hojaldre suave y crujiente.",
        precio: "$4.500",
        imagen: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Muffin de chocolate",
        categoria: "Panadería",
        descripcion: "Ponqué suave con sabor a chocolate.",
        precio: "$5.000",
        imagen: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Galletas artesanales",
        categoria: "Panadería",
        descripcion: "Galletas recién horneadas.",
        precio: "$3.500",
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Desayuno campesino",
        categoria: "Desayunos",
        descripcion: "Huevos, arepa, queso y bebida caliente.",
        precio: "$12.000",
        imagen: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Sándwich especial",
        categoria: "Desayunos",
        descripcion: "Sándwich preparado con ingredientes frescos.",
        precio: "$10.000",
        imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"
    },
    {
        nombre: "Tostadas con fruta",
        categoria: "Desayunos",
        descripcion: "Tostadas acompañadas de fruta fresca.",
        precio: "$9.000",
        imagen: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=700&q=80"
    }
];


// ===================================
// 2. MOSTRAR PRODUCTOS
// ===================================

const contenedorProductos = document.getElementById("productos");

function mostrarProductos(categoria) {

    contenedorProductos.innerHTML = "";

    const productosFiltrados = productos.filter(producto => {
        return producto.categoria === categoria;
    });

    productosFiltrados.forEach(producto => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">${producto.precio}</span>
            </div>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}


// ===================================
// 3. PESTAÑAS DEL MENÚ
// ===================================

const botonesTab = document.querySelectorAll(".tab");

botonesTab.forEach(boton => {

    boton.addEventListener("click", function() {

        botonesTab.forEach(tab => {
            tab.classList.remove("activa");
        });

        this.classList.add("activa");

        const categoria = this.dataset.categoria;

        mostrarProductos(categoria);
    });

});

// Mostrar cafés al abrir la página
mostrarProductos("Cafés");


// ===================================
// 4. INDICADOR ABIERTO O CERRADO
// ===================================

function actualizarEstado() {

    const ahora = new Date();
    const hora = ahora.getHours();

    const indicador = document.getElementById("estadoLocal");

    if (hora >= 7 && hora < 20) {

        indicador.textContent = "🟢 Abierto ahora - Cerramos a las 8:00 p. m.";
        indicador.style.color = "#a8f0a8";

    } else {

        indicador.textContent = "🔴 Cerrado - Abrimos a las 7:00 a. m.";
        indicador.style.color = "#ffb3b3";

    }
}

actualizarEstado();


// ===================================
// 5. FECHA MÍNIMA DE RESERVA
// ===================================

const campoFecha = document.getElementById("fecha");

function obtenerFechaLocal() {

    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

campoFecha.min = obtenerFechaLocal();


// ===================================
// 6. FORMULARIO DE RESERVAS
// ===================================

const formulario = document.getElementById("formReserva");

const resumen = document.getElementById("resumenReserva");
const datosReserva = document.getElementById("datosReserva");

let mensajeReserva = "";

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = Number(document.getElementById("personas").value);

    // Validar campos vacíos
    if (!nombre || !correo || !telefono || !fecha || !hora || !personas) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validar teléfono
    if (!/^[0-9]{7,15}$/.test(telefono)) {
        alert("Escribe un número de teléfono válido.");
        return;
    }

    // Validar fecha
    const fechaSeleccionada = new Date(fecha + "T00:00:00");
    const fechaActual = new Date(obtenerFechaLocal() + "T00:00:00");

    if (fechaSeleccionada < fechaActual) {
        alert("No puedes reservar en una fecha pasada.");
        return;
    }

    // Validar número de personas
    if (!Number.isInteger(personas) || personas < 1 || personas > 10) {
        alert("La reserva debe ser para mínimo 1 y máximo 10 personas.");
        return;
    }

    // Validar horario de atención
    if (hora < "07:00" || hora > "19:59") {
        alert("El horario para reservar es de 7:00 a. m. a 7:59 p. m.");
        return;
    }

    // Evitar reservar una hora que ya pasó hoy
    if (fecha === obtenerFechaLocal()) {

        const horaActual = new Date();
        const horaActualTexto =
            String(horaActual.getHours()).padStart(2, "0") +
            ":" +
            String(horaActual.getMinutes()).padStart(2, "0");

        if (hora <= horaActualTexto) {
            alert("Selecciona una hora futura para tu reserva.");
            return;
        }
    }

    // Crear mensaje de reserva
    mensajeReserva =
        "Hola, Aroma & Grano. Quiero solicitar una reserva:\n\n" +
        "Nombre: " + nombre + "\n" +
        "Correo: " + correo + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Fecha: " + fecha + "\n" +
        "Hora: " + hora + "\n" +
        "Número de personas: " + personas;

    // Mostrar resumen en pantalla
    datosReserva.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
        <p><strong>Personas:</strong> ${personas}</p>
    `;

    resumen.hidden = false;

    // Mostrar el resumen en pantalla
    resumen.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// ===================================
// 7. ENVIAR RESERVA POR WHATSAPP
// ===================================

const botonWhatsApp = document.getElementById("enviarWhatsApp");

botonWhatsApp.addEventListener("click", function() {

    if (!mensajeReserva) {
        alert("Primero debes completar el formulario de reserva.");
        return;
    }

    // Número de WhatsApp con código de Colombia
    const numeroWhatsApp = "573104428485";

    const mensajeCodificado = encodeURIComponent(mensajeReserva);

    const enlace =
        "https://wa.me/" + numeroWhatsApp +
        "?text=" + mensajeCodificado;

    window.open(enlace, "_blank");

});