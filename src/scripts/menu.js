document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});

document.querySelector('.close').addEventListener('click',   
() => {
document.querySelector('.nav-links').classList.remove('expanded');
});


window.addEventListener('scroll', function() {
  const div = document.getElementById('miDiv');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) { // Cambia a 100px o la distancia que prefieras
    div.style.backgroundColor = 'white'; // Nuevo color de fondo
  } else {
    div.style.backgroundColor = '#ffffff00'; // Color inicial
  }
});

window.addEventListener('scroll', function() {
  const div = document.getElementById('miMenu');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) { // Cambia a 100px o la distancia que prefieras
    div.style.backgroundColor = 'white'; // Nuevo color de fondo
  } else {
    div.style.backgroundColor = 'white'; // Color inicial
  }
});

