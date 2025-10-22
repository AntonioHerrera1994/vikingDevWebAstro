const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remueve la clase 'active' de todos
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    // Agrega 'active' al seleccionado
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});





