  const filtros = document.querySelectorAll(".filtro");
  const proyectos = document.querySelectorAll(".proyecto");
  const galeria = document.querySelector(".galeria");
  const btnAnterior = document.getElementById("anterior");
  const btnSiguiente = document.getElementById("siguiente");

  let imagenesPorPagina = window.matchMedia("(max-width: 767px)").matches ? 2 : 6;
  let paginaActual = 1;
let agenciaSeleccionada = document.querySelector(".filtro.activo").dataset.agencia;

function getProyectosFiltrados() {
  return Array.from(proyectos).filter(p => p.dataset.agencia === agenciaSeleccionada);
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
    }, i * 100); // efecto "stagger" (cada imagen entra con retraso)
  });

  btnAnterior.disabled = paginaActual === 1;
  btnSiguiente.disabled = fin >= lista.length;
}


  filtros.forEach(boton => {
    boton.addEventListener("click", () => {
      filtros.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
      agenciaSeleccionada = boton.dataset.agencia;
      paginaActual = 1;
      mostrarImagenes();
    });
  });

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