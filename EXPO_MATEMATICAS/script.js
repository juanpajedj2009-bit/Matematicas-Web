function mcd(a, b) {
  return b === 0 ? Math.abs(a) : mcd(b, a % b);
}

function simplificar(numerador, denominador) {
  let divisor = mcd(numerador, denominador);
  numerador /= divisor;
  denominador /= divisor;

  if (denominador < 0) {
    numerador = -numerador;
    denominador = -denominador;
  }
  return { numerador, denominador };
}

function mostrarResultado(numerador, denominador) {
  let contenedorResultado = document.getElementById('resultado');
  if (denominador === 1) {
    contenedorResultado.innerHTML = `<span class="signo">=</span> <span>${numerador}</span>`;
  } else {
    contenedorResultado.innerHTML = `
      <span class="signo">=</span>
      <div class="fraccion">
        <span>${numerador}</span>
        <div class="linea"></div>
        <span>${denominador}</span>
      </div>
    `;
  }
}

function obtenerValores() {
  let a = parseInt(document.getElementById('num1').value) || 0;
  let b = parseInt(document.getElementById('den1').value) || 1;
  let c = parseInt(document.getElementById('num2').value) || 0;
  let d = parseInt(document.getElementById('den2').value) || 1;
  return { a, b, c, d };
}

function actualizarOperador(simbolo) {
  document.getElementById('operador').textContent = simbolo;
}

document.getElementById('sumar').addEventListener('click', function() {
  let { a, b, c, d } = obtenerValores();
  if (b === 0 || d === 0) return alert("Error: El denominador no puede ser 0");
  let numerador = (a * d) + (c * b);
  let denominador = b * d;
  let res = simplificar(numerador, denominador);
  actualizarOperador("+");
  mostrarResultado(res.numerador, res.denominador);
});

document.getElementById('restar').addEventListener('click', function() {
  let { a, b, c, d } = obtenerValores();
  if (b === 0 || d === 0) return alert("Error: El denominador no puede ser 0");
  let numerador = (a * d) - (c * b);
  let denominador = b * d;
  let res = simplificar(numerador, denominador);
  actualizarOperador("−");
  mostrarResultado(res.numerador, res.denominador);
});

document.getElementById('multiplicar').addEventListener('click', function() {
  let { a, b, c, d } = obtenerValores();
  if (b === 0 || d === 0) return alert("Error: El denominador no puede ser 0");
  let numerador = a * c;
  let denominador = b * d;
  let res = simplificar(numerador, denominador);
  actualizarOperador("×");
  mostrarResultado(res.numerador, res.denominador);
});

document.getElementById('dividir').addEventListener('click', function() {
  let { a, b, c, d } = obtenerValores();
  if (b === 0 || d === 0 || c === 0) return alert("Error: No se puede dividir por 0");
  let numerador = a * d;
  let denominador = b * c;
  let res = simplificar(numerador, denominador);
  actualizarOperador("÷");
  mostrarResultado(res.numerador, res.denominador);
});
