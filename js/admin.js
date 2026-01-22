// Solo usuario administrador puede acceder
const adminEmail = "sergio.s@hotelrincon.com";
const usuarioActualAdmin = JSON.parse(localStorage.getItem("usuarioActual"));
if(!usuarioActualAdmin || usuarioActualAdmin.email !== adminEmail){
    alert("Acceso no autorizado");
    window.location.href = "index.html";
}

// Obtener habitaciones
let habitacionesAdmin = JSON.parse(localStorage.getItem("habitaciones")) || [];

// Mostrar habitaciones en admin
function mostrarHabitacionesAdmin(){
    const div = document.getElementById("admin-habitaciones");
    div.innerHTML = "";
    habitacionesAdmin.forEach((h,index) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <h3>${h.nombre}</h3>
            <p>Camas: <input type="number" value="${h.camas}" id="camas-${index}"></p>
            <p>Max personas: <input type="number" value="${h.maxPersonas}" id="max-${index}"></p>
            <p>Precio: <input type="number" value="${h.precio}" id="precio-${index}"></p>
            <p>Servicios: <input type="text" value="${h.servicios.join(",")}" id="servicios-${index}"></p>
            <button onclick="actualizarHabitacion(${index})">Actualizar</button>
            <button onclick="eliminarHabitacion(${index})">Eliminar</button>
        `;
        div.appendChild(tarjeta);
    });
}

// Actualizar habitación
function actualizarHabitacion(index){
    habitacionesAdmin[index].camas = parseInt(document.getElementById(`camas-${index}`).value);
    habitacionesAdmin[index].maxPersonas = parseInt(document.getElementById(`max-${index}`).value);
    habitacionesAdmin[index].precio = parseInt(document.getElementById(`precio-${index}`).value);
    habitacionesAdmin[index].servicios = document.getElementById(`servicios-${index}`).value.split(",");
    localStorage.setItem("habitaciones", JSON.stringify(habitacionesAdmin));
    alert("Habitación actualizada");
    mostrarHabitacionesAdmin();
}

// Eliminar habitación
function eliminarHabitacion(index){
    habitacionesAdmin.splice(index,1);
    localStorage.setItem("habitaciones", JSON.stringify(habitacionesAdmin));
    mostrarHabitacionesAdmin();
}

// Agregar nueva habitación
function agregarHabitacion(){
    const nombre = prompt("Nombre de la habitación:");
    const camas = parseInt(prompt("Cantidad de camas:"));
    const maxPersonas = parseInt(prompt("Cantidad máxima de personas:"));
    const precio = parseInt(prompt("Precio por noche:"));
    const servicios = prompt("Servicios separados por coma:").split(",");

    habitacionesAdmin.push({id: Date.now(), nombre, camas, maxPersonas, precio, servicios, reservas:[]});
    localStorage.setItem("habitaciones", JSON.stringify(habitacionesAdmin));
    mostrarHabitacionesAdmin();
}

// Ejecutar al cargar página
window.onload = mostrarHabitacionesAdmin;
