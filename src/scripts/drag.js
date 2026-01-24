const filtros = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");
const galeria = document.querySelector(".galeria");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

// Elementos del modal
const modal = document.getElementById("modalProyecto");
const modalImagen = document.getElementById("modalImagen");
const modalNombre = document.getElementById("modalNombre");
const modalTech = document.getElementById("modalTech");
const modalUrl = document.getElementById("modalUrl");
const closeModal = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".modal-overlay");

let imagenesPorPagina = window.matchMedia("(max-width: 767px)").matches ? 2 : 6;
let paginaActual = 1;
let agenciaSeleccionada = document.querySelector(".filtro.activo").dataset.agencia;

function getProyectosFiltrados() {
  return Array.from(proyectos)
    .filter(p => p.dataset.agencia === agenciaSeleccionada)
    .reverse();
}

function mostrarImagenes() {
  const lista = getProyectosFiltrados();
  const inicio = (paginaActual - 1) * imagenesPorPagina;
  const fin = inicio + imagenesPorPagina;

  proyectos.forEach(p => {
    p.classList.remove("mostrar");
    p.style.display = "none";
  });

  lista.slice(inicio, fin).forEach((p, i) => {
    p.style.display = "block";
    setTimeout(() => {
      p.classList.add("mostrar");
    }, i * 100);
  });

  btnAnterior.disabled = paginaActual === 1;
  btnSiguiente.disabled = fin >= lista.length;
}

// Función para abrir modal
function abrirModal(proyecto) {
  const nombre = proyecto.dataset.nombre;
  const tech = proyecto.dataset.tech;
  const url = proyecto.dataset.url;
  const imgSrc = proyecto.querySelector("img").src;

  modalImagen.src = imgSrc;
  modalNombre.textContent = nombre;
  modalTech.textContent = tech;
  modalUrl.textContent = url;
  modalUrl.href = url;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Función para cerrar modal
function cerrarModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event listeners para proyectos
proyectos.forEach(proyecto => {
  proyecto.addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(proyecto);
  });
});

// Event listeners para cerrar modal
closeModal.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", cerrarModal);

// Cerrar con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    cerrarModal();
  }
});

// Filtros
filtros.forEach(boton => {
  boton.addEventListener("click", () => {
    filtros.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    agenciaSeleccionada = boton.dataset.agencia;
    paginaActual = 1;
    mostrarImagenes();
  });
});

// Paginación
btnAnterior.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarImagenes();
  }
});

btnSiguiente.addEventListener("click", () => {
  const total = getProyectosFiltrados().length;
  const totalPaginas = Math.ceil(total / imagenesPorPagina);
  if (paginaActual < totalPaginas) {
    paginaActual++;
    mostrarImagenes();
  }
});

mostrarImagenes();