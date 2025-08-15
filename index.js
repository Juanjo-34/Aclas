// Base de datos simulada (vacía visualmente al inicio)
const asistentes = [
  { codigo: "123", nombre: "Juan José", asistio: false }
];

const cuerpoTabla = document.getElementById("cuerpoTabla");
const codigoInput = document.getElementById("codigoInput");

function renderTabla() {
  cuerpoTabla.innerHTML = "";
  asistentes.forEach((p, index) => {
    if (p.asistio) {
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
    }
  });
}

function toggleAsistencia(index) {
  asistentes[index].asistio = !asistentes[index].asistio;
  renderTabla();
}

function marcarTodos(estado) {
  asistentes.forEach(p => p.asistio = estado);
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
    toast.style.backgroundColor = "#22c55e"; // verde
  } else if (tipo === "info") {
    toast.style.backgroundColor = "#3b82f6"; // azul
  } else {
    toast.style.backgroundColor = "#ef4444"; // rojo
  }

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

renderTabla();
