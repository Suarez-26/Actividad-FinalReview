// checkin.js

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Función para mostrar las reservas pendientes de check-in
function mostrarReservasPendientes() {
  const contenedor = document.getElementById("listaCheckIn");
  contenedor.innerHTML = "";

  const pendientes = reservas.filter(r => r.estado === "pendiente");

  if (pendientes.length === 0) {
    contenedor.innerHTML = "<p>No hay reservas pendientes de check-in.</p>";
    return;
  }

  pendientes.forEach((reserva, index) => {
    const div = document.createElement("div");
    div.classList.add("card-checkin");
    div.innerHTML = `
      <p><strong>Nombre:</strong> ${reserva.nombre}</p>
      <p><strong>Habitación:</strong> ${reserva.habitacion}</p>
      <p><strong>Fecha:</strong> ${reserva.fecha}</p>
      <button onclick="realizarCheckIn(${index})">Hacer Check-in</button>
    `;
    contenedor.appendChild(div);
  });
}

// Función para marcar una reserva como check-in realizado
function realizarCheckIn(index) {
  const pendientes = reservas.filter(r => r.estado === "pendiente");
  const reserva = pendientes[index];

  if (!reserva) return;

  reserva.estado = "check-in realizado";
  reserva.horaCheckIn = new Date().toLocaleString();

  // Actualiza la lista completa en localStorage
  const idxReal = reservas.findIndex(r => r.id === reserva.id);
  reservas[idxReal] = reserva;
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`Check-in realizado para ${reserva.nombre}`);
  mostrarReservasPendientes();
}

document.addEventListener("DOMContentLoaded", mostrarReservasPendientes);
