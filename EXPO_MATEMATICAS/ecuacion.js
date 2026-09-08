let intentos = 0;
let aciertos = 0;

function generarEcuacion() {
  const pregunta = document.getElementById("pregunta");
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";

  // Generar ecuación simple: a*x + b = resultado
  let x = Math.floor(Math.random() * 10) + 1;
  let a = Math.floor(Math.random() * 5) + 1;
  let b = Math.floor(Math.random() * 10);
  let resultado = a * x + b;

  pregunta.textContent = `¿Cuál es el valor de x en: ${a}x + ${b} = ${resultado}?`;

  // Crear opciones (una correcta y dos incorrectas)
  let opciones = [x];
  while (opciones.length < 3) {
    let opcion = Math.floor(Math.random() * 10) + 1;
    if (!opciones.includes(opcion)) {
      opciones.push(opcion);
    }
  }

  // Mezclar opciones
  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach(opcion => {
    let btn = document.createElement("button");
    btn.textContent = opcion;
    btn.addEventListener("click", () => verificarRespuesta(opcion, x, btn));
    opcionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(opcion, correcta, boton) {
  intentos++;
  if (opcion === correcta) {
    aciertos++;
    boton.classList.add("correcto");
    setTimeout(() => {
      alert(`¡Correcto! Intentos: ${intentos}, Aciertos: ${aciertos}`);
      generarEcuacion();
    }, 500);
  } else {
    boton.classList.add("incorrecto");
  }
}

// Inicializar
generarEcuacion();
