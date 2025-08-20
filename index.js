// Base de datos simulada (20 estudiantes con código, nombre y grado)
let estudiantes = [
  { codigo: "123", nombre: "Juan Pérez", grado: "10°", asistencia: false },
  { codigo: "124", nombre: "María López", grado: "9°", asistencia: false },
  { codigo: "125", nombre: "Carlos Ramírez", grado: "11°", asistencia: false },
  { codigo: "126", nombre: "Laura Martínez", grado: "10°", asistencia: false },
  { codigo: "127", nombre: "Andrés Torres", grado: "8°", asistencia: false },
  { codigo: "128", nombre: "Sofía Gómez", grado: "7°", asistencia: false },
  { codigo: "129", nombre: "Valentina Ruiz", grado: "9°", asistencia: false },
  { codigo: "130", nombre: "David Morales", grado: "11°", asistencia: false },
  { codigo: "131", nombre: "Camila Herrera", grado: "10°", asistencia: false },
  { codigo: "132", nombre: "Mateo Jiménez", grado: "8°", asistencia: false },
  { codigo: "133", nombre: "Isabella Castro", grado: "9°", asistencia: false },
  { codigo: "134", nombre: "Samuel Ortiz", grado: "11°", asistencia: false },
  { codigo: "135", nombre: "Daniela Romero", grado: "10°", asistencia: false },
  { codigo: "136", nombre: "Martín Silva", grado: "7°", asistencia: false },
  { codigo: "137", nombre: "Lucía Méndez", grado: "9°", asistencia: false },
  { codigo: "138", nombre: "Felipe Vargas", grado: "11°", asistencia: false },
  { codigo: "139", nombre: "Ana Torres", grado: "10°", asistencia: false },
  { codigo: "140", nombre: "Julián Navarro", grado: "8°", asistencia: false },
  { codigo: "141", nombre: "Paula Cruz", grado: "9°", asistencia: false },
  { codigo: "142", nombre: "Sebastián Duarte", grado: "11°", asistencia: false }
];

// Renderizar tabla (solo muestra los que ya se registraron)
function renderTabla() {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  cuerpoTabla.innerHTML = "";

  estudiantes.forEach(est => {
    if (est.asistencia) {
      let fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${est.codigo}</td>
        <td>${est.nombre}</td>
        <td>${est.grado}</td>
        <td class="center">
          <input type="checkbox" ${est.asistencia ? "checked" : ""} 
          onchange="cambiarAsistencia('${est.codigo}', this.checked)" />
        </td>
        <td class="center">
          <button onclick="eliminarEstudiante('${est.codigo}')" class="btnEliminar">❌</button>
        </td>
      `;

      cuerpoTabla.appendChild(fila);
    }
  });
}

// Cambiar asistencia individual
function cambiarAsistencia(codigo, valor) {
  const estudiante = estudiantes.find(e => e.codigo === codigo);
  if (estudiante) {
    estudiante.asistencia = valor;
  }
}

// Registrar asistencia con código
function registrarAsistencia() {
  const input = document.getElementById("codigoInput");
  const codigo = input.value.trim().toUpperCase();
  const estudiante = estudiantes.find(e => e.codigo === codigo);

  if (estudiante) {
    if (!estudiante.asistencia) {
      estudiante.asistencia = true;
      mostrarToast(`Asistencia registrada: ${estudiante.nombre} (${estudiante.grado})`);
    } else {
      mostrarToast(`ℹ️ ${estudiante.nombre} ya estaba registrado`);
    }
    renderTabla();
  } else {
    mostrarToast("⚠️ Código no encontrado");
  }

  input.value = "";
}

// Eliminar estudiante de la tabla
function eliminarEstudiante(codigo) {
  const estudiante = estudiantes.find(e => e.codigo === codigo);
  if (estudiante) {
    estudiante.asistencia = false; // Lo quitamos de la lista de asistencia
    renderTabla();
    mostrarToast(`❌ Eliminado: ${estudiante.nombre}`);
  }
}

// Marcar todos
function marcarTodos(valor) {
  estudiantes.forEach(e => {
    if (e.asistencia) e.asistencia = valor;
  });
  renderTabla();
}

// Guardar cambios (simulado)
function guardarCambios() {
  console.log("Datos guardados:", estudiantes.filter(e => e.asistencia));
  mostrarToast("✅ Cambios guardados correctamente");
}

// Toast (mensajes flotantes)
function mostrarToast(mensaje) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = mensaje;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Inicializar
document.addEventListener("DOMContentLoaded", renderTabla);

