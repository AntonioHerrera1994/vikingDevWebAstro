function calcularTotal() {
  const web = parseInt(document.getElementById("web").value);
  const campañas = parseInt(document.getElementById("campañas").value);

  const total = web + campañas;
  const resultadoDiv = document.getElementById("resultado");

  if (total > 0) {
    document.getElementById("total").innerText = total.toLocaleString('es-MX');
    resultadoDiv.style.display = "block";
  } else {
    resultadoDiv.style.display = "none";
  }
}

document.querySelectorAll("#form-cotizacion select").forEach(el => {
  el.addEventListener("change", calcularTotal);
});