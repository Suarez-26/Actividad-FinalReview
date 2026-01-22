// Obtener usuario logueado
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
if(!usuarioActual){
    alert("Debes iniciar sesión para reservar.");
    window.location.href = "login.html";
}

// Obtener habitaciones desde localStorage
let habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [
    { id:1, nombre:"Habitación Deluxe", camas:2, maxPersonas:4, precio:120, servicios:["Internet","Minibar","Jacuzzi"], reservas:[] },
    { id:2, nombre:"Habitación Estándar", camas:1, maxPersonas:2, precio:80, servicios:["Internet","Minibar"], reservas:[] },
    { id:3, nombre:"Suite Familiar", camas:3, maxPersonas:6, precio:200, servicios:["Internet","Minibar","Jacuzzi"], reservas:[] }
];

// Guardar habitaciones iniciales si no existen
if(!localStorage.getItem("habitaciones")) localStorage.setItem("habitaciones", JSON.stringify(habitaciones));

// Verificar disponibilidad
function verificarDisponibilidad(habitacion, fechaEntrada, fechaSalida){
    return !habitacion.reservas.some(r => fechaEntrada < new Date(r.salida) && fechaSalida > new Date(r.entrada));
}

// Mostrar habitaciones disponibles
document.getElementById("formulario-reserva").addEventListener("submit", function(e){
    e.preventDefault();
    const fechaEntrada = new Date(document.getElementById("fecha-entrada").value);
    const fechaSalida = new Date(document.getElementById("fecha-salida").value);
    const personas = parseInt(document.getElementById("personas").value);

    habitaciones = JSON.parse(localStorage.getItem("habitaciones"));

    const disponibles = habitaciones.filter(h => personas <= h.maxPersonas && verificarDisponibilidad(h, fechaEntrada, fechaSalida));
    const resultadoDiv = document.getElementById("resultado-habitaciones");
    resultadoDiv.innerHTML = "";

    if(disponibles.length === 0){
        resultadoDiv.innerHTML = "<p>No hay habitaciones disponibles para esas fechas.</p>";
        return;
    }

    disponibles.forEach(h => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
            <h3>${h.nombre}</h3>
            <p>Camas: ${h.camas}</p>
            <p>Max personas: ${h.maxPersonas}</p>
            <p>Servicios: ${h.servicios.join(", ")}</p>
            <p>Precio por noche: $${h.precio}</p>
            <button onclick="reservar(${h.id}, '${fechaEntrada}', '${fechaSalida}', ${personas})">Reservar</button>
        `;
        resultadoDiv.appendChild(div);
    });
});

// Función para reservar
function reservar(id, fechaEntrada, fechaSalida, personas){
    habitaciones = JSON.parse(localStorage.getItem("habitaciones"));
    const habitacion = habitaciones.find(h => h.id === id);

    // Crear reserva con info del usuario
    const reserva = { entrada: fechaEntrada, salida: fechaSalida, personas, usuario: usuarioActual.email };

    // Agregar reserva a la habitación
    habitacion.reservas.push(reserva);
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    alert("Reserva realizada con éxito!");
    location.reload();
}

// Función para cancelar reservas del usuario
function mostrarMisReservas(){
    const div = document.getElementById("mis-reservas");
    if(!div) return;

    div.innerHTML = "";
    habitaciones.forEach(h => {
        h.reservas.forEach((r, index) => {
            if(r.usuario === usuarioActual.email){
                const resDiv = document.createElement("div");
                resDiv.classList.add("tarjeta");
                resDiv.innerHTML = `
                    <h3>${h.nombre}</h3>
                    <p>Entrada: ${new Date(r.entrada).toLocaleDateString()}</p>
                    <p>Salida: ${new Date(r.salida).toLocaleDateString()}</p>
                    <p>Personas: ${r.personas}</p>
                    <button onclick="cancelarReserva(${h.id}, ${index})">Cancelar Reserva</button>
                `;
                div.appendChild(resDiv);
            }
        });
    });
}

function cancelarReserva(idHabitacion, indexReserva){
    habitaciones = JSON.parse(localStorage.getItem("habitaciones"));
    habitaciones.find(h => h.id === idHabitacion).reservas.splice(indexReserva,1);
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    alert("Reserva cancelada.");
    location.reload();
}

// Ejecutar al cargar página
window.onload = mostrarMisReservas;



// Examen
function guardarReserva(nombre, habitacion, fecha) {
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const nuevaReserva = {
    id: Date.now(),
    nombre,
    habitacion,
    fecha,
    estado: "pendiente"
  };
  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}
