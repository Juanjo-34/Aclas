// Base de datos simulada (21 personas)
const asistentes = [
  { codigo: "123", nombre: "Juan José", asistio: false },
  { codigo: "124", nombre: "María Pérez", asistio: false },
  { codigo: "125", nombre: "Carlos López", asistio: false },
  { codigo: "126", nombre: "Ana Gómez", asistio: false },
  { codigo: "127", nombre: "Luis Martínez", asistio: false },
  { codigo: "128", nombre: "Paula Torres", asistio: false },
  { codigo: "129", nombre: "Sofía Ramírez", asistio: false },
  { codigo: "130", nombre: "Jorge Díaz", asistio: false },
  { codigo: "131", nombre: "Elena Ríos", asistio: false },
  { codigo: "132", nombre: "Mateo Herrera", asistio: false },
  { codigo: "133", nombre: "Camila Vargas", asistio: false },
  { codigo: "134", nombre: "Andrés Castro", asistio: false },
  { codigo: "135", nombre: "Valentina Jiménez", asistio: false },
  { codigo: "136", nombre: "Tomás Morales", asistio: false },
  { codigo: "137", nombre: "Daniela Sánchez", asistio: false },
  { codigo: "138", nombre: "Gabriel Fernández", asistio: false },
  { codigo: "139", nombre: "Isabella Ruiz", asistio: false },
  { codigo: "140", nombre: "Sebastián Pardo", asistio: false },
  { codigo: "141", nombre: "Natalia Cárdenas", asistio: false },
  { codigo: "142", nombre: "Felipe Ortega", asistio: false },
  { codigo: "143", nombre: "Lucía Mendoza", asistio: false }

];

// Lista de personas que ya se mostraron en la tabla
let mostrados = [];

const cuerpoTabla = document.getElementById("cuerpoTabla");
const codigoInput = document.getElementById("codigoInput");

function renderTabla() {
  cuerpoTabla.innerHTML = "";
  mostrados.forEach((p, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.codigo}</td>
      <td>${p.nombre}</td>
      <td class="center">
        <label>
          <input type="checkbox" ${p.asistio ? "checked" : ""} onchange="toggleAsistencia(${index})">
          ${p.asistio ? "Sí" : "No"}
        </label>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}

function toggleAsistencia(index) {
  mostrados[index].asistio = !mostrados[index].asistio;
  renderTabla();
}

function marcarTodos(estado) {
  mostrados.forEach(p => p.asistio = estado);
  renderTabla();
}

function registrarAsistencia() {
  const codigo = codigoInput.value.trim();

  if (!codigo) {
    mostrarToast("⚠️ Por favor, ingresa un código.", "error");
    return;
  }

  const persona = asistentes.find(p => p.codigo === codigo);

  if (persona) {
    if (!persona.asistio) {
      persona.asistio = true;
      mostrarToast(`✅ Asistencia registrada para ${persona.nombre}`, "success");
    } else {
      mostrarToast(`ℹ️ ${persona.nombre} ya estaba marcado como asistente`, "info");
    }

    // Si la persona no está en la tabla, la agregamos
    if (!mostrados.includes(persona)) {
      mostrados.push(persona);
    }
  } else {
    mostrarToast(`❌ Código "${codigo}" no encontrado`, "error");
  }

  codigoInput.value = "";
  renderTabla();
}

function mostrarToast(mensaje, tipo = "error") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;

  if (tipo === "success") {
    toast.style.backgroundColor = "#22c55e";
  } else if (tipo === "info") {
    toast.style.backgroundColor = "#3b82f6";
  } else {
    toast.style.backgroundColor = "#ef4444";
  }

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

renderTabla();

