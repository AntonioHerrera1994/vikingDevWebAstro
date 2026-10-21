// Cualquier enlace con data-quoter-select="<data-label del checkbox>" marca ese
// servicio en el cotizador al hacer clic. Se importa desde los componentes que lo usan;
// el módulo se ejecuta una sola vez por página aunque lo importen varios.
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-quoter-select]');
  if (!trigger) return;

  const label = trigger.dataset.quoterSelect;
  const checkbox = document.querySelector(`#cotizador .quoter__checkbox[data-label="${label}"]`);
  if (!checkbox || checkbox.checked) return;

  // click() para que el script del cotizador aplique sus reglas de grupo y recalcule
  checkbox.click();
});
