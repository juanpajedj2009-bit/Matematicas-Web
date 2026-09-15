// ==============================
// EJERCICIO 1 - FRACCIONES
// ==============================

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

    return {
        numerador,
        denominador
    };
}

function mostrarResultado(numerador, denominador) {
    let contenedorResultado = document.getElementById("resultado");

    if (denominador === 1) {
        contenedorResultado.innerHTML =
            `<span class="signo">=</span> <span>${numerador}</span>`;
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
    let a = parseInt(document.getElementById("num1").value) || 0;
    let b = parseInt(document.getElementById("den1").value) || 1;
    let c = parseInt(document.getElementById("num2").value) || 0;
    let d = parseInt(document.getElementById("den2").value) || 1;

    return {
        a,
        b,
        c,
        d
    };
}

function actualizarOperador(simbolo) {
    document.getElementById("operador").textContent = simbolo;
}


// SUMAR

document.getElementById("sumar").addEventListener("click", function () {

    let { a, b, c, d } = obtenerValores();

    if (b === 0 || d === 0) {
        return alert("Error: El denominador no puede ser 0");
    }

    let numerador = (a * d) + (c * b);
    let denominador = b * d;

    let res = simplificar(numerador, denominador);

    actualizarOperador("+");
    mostrarResultado(res.numerador, res.denominador);
});


// RESTAR

document.getElementById("restar").addEventListener("click", function () {

    let { a, b, c, d } = obtenerValores();

    if (b === 0 || d === 0) {
        return alert("Error: El denominador no puede ser 0");
    }

    let numerador = (a * d) - (c * b);
    let denominador = b * d;

    let res = simplificar(numerador, denominador);

    actualizarOperador("−");
    mostrarResultado(res.numerador, res.denominador);
});


// MULTIPLICAR

document.getElementById("multiplicar").addEventListener("click", function () {

    let { a, b, c, d } = obtenerValores();

    if (b === 0 || d === 0) {
        return alert("Error: El denominador no puede ser 0");
    }

    let numerador = a * c;
    let denominador = b * d;

    let res = simplificar(numerador, denominador);

    actualizarOperador("×");
    mostrarResultado(res.numerador, res.denominador);
});


// DIVIDIR

document.getElementById("dividir").addEventListener("click", function () {

    let { a, b, c, d } = obtenerValores();

    if (b === 0 || d === 0 || c === 0) {
        return alert("Error: No se puede dividir por 0");
    }

    let numerador = a * d;
    let denominador = b * c;

    let res = simplificar(numerador, denominador);

    actualizarOperador("÷");
    mostrarResultado(res.numerador, res.denominador);
});
// ==============================
// EJERCICIO 2 - ECUACIONES
// ==============================

const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");

let intentos = 0;
let errores = 0;
let respuestaCorrecta = 0;

function nuevaEcuacion() {
    let a = Math.floor(Math.random() * 9) + 2;
    let x = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;

    let resultado = (a * x) + b;

    respuestaCorrecta = x;

    pregunta.textContent = `${a}x + ${b} = ${resultado}`;

    let respuestas = [
        x,
        x + Math.floor(Math.random() * 5) + 1,
        Math.max(0, x - (Math.floor(Math.random() * 5) + 1))
    ];

    // Mezclar las 3 opciones
    respuestas.sort(() => Math.random() - 0.5);

    opciones.innerHTML = "";

    respuestas.forEach(function (respuesta) {
        let boton = document.createElement("button");

        boton.textContent = respuesta;

        boton.addEventListener("click", function () {

            if (respuesta === respuestaCorrecta) {
                boton.style.backgroundColor = "green";
                boton.style.color = "white";

                intentos++;

                mostrarEstadisticas();

                setTimeout(function () {
                    nuevaEcuacion();
                }, 500);

            } else {
                boton.style.backgroundColor = "red";
                boton.style.color = "white";

                errores++;

                mostrarEstadisticas();
            }
        });

        opciones.appendChild(boton);
    });

    mostrarEstadisticas();
}

function mostrarEstadisticas() {
    let estadisticas = document.getElementById("estadisticas");

    if (!estadisticas) {
        estadisticas = document.createElement("p");
        estadisticas.id = "estadisticas";
        opciones.parentNode.appendChild(estadisticas);
    }

    estadisticas.textContent =
        `Intentos: ${intentos} | Errores: ${errores}`;
}

nuevaEcuacion();  

// ==============================
// EJERCICIO 4 - ÁREAS Y PERÍMETROS
// ==============================

const figuraSelect = document.getElementById("figura");
const inputsDiv = document.getElementById("inputs");
const resultadoDiv = document.getElementById("resultadoAreas");
const calcularBtn = document.getElementById("calcular");
const figuraDibujo = document.getElementById("figuraDibujo");


function mostrarInputs(figura) {

    inputsDiv.innerHTML = "";
    figuraDibujo.innerHTML = "";

    // CUADRADO

    if (figura === "cuadrado") {

        inputsDiv.innerHTML = `
            <input type="number" id="lado" placeholder="Lado">
        `;

        figuraDibujo.innerHTML = `
            <svg>
                <rect
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    fill="skyblue">
                </rect>
            </svg>
        `;
    }


    // RECTÁNGULO

    else if (figura === "rectangulo") {

        inputsDiv.innerHTML = `
            <input type="number" id="base" placeholder="Base">
            <input type="number" id="altura" placeholder="Altura">
        `;

        figuraDibujo.innerHTML = `
            <svg>
                <rect
                    x="10"
                    y="30"
                    width="100"
                    height="50"
                    fill="lightgreen">
                </rect>
            </svg>
        `;
    }


    // TRIÁNGULO

    else if (figura === "triangulo") {

        inputsDiv.innerHTML = `
            <input type="number" id="base" placeholder="Base">
            <input type="number" id="altura" placeholder="Altura">
            <input type="number" id="lado1" placeholder="Lado 1">
            <input type="number" id="lado2" placeholder="Lado 2">
            <input type="number" id="lado3" placeholder="Lado 3">
        `;

        figuraDibujo.innerHTML = `
            <svg>
                <polygon
                    points="10,90 90,90 50,10"
                    fill="orange">
                </polygon>
            </svg>
        `;
    }


    // CÍRCULO

    else if (figura === "circulo") {

        inputsDiv.innerHTML = `
            <input type="number" id="radio" placeholder="Radio">
        `;

        figuraDibujo.innerHTML = `
            <svg>
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="pink">
                </circle>
            </svg>
        `;
    }


    // TRAPECIO

    else if (figura === "trapecio") {

        inputsDiv.innerHTML = `
            <input type="number" id="base1" placeholder="Base mayor">
            <input type="number" id="base2" placeholder="Base menor">
            <input type="number" id="altura" placeholder="Altura">
        `;

        figuraDibujo.innerHTML = `
            <svg>
                <polygon
                    points="20,90 80,90 100,40 0,40"
                    fill="violet">
                </polygon>
            </svg>
        `;
    }
}


// CAMBIAR FIGURA

figuraSelect.addEventListener("change", function () {
    mostrarInputs(figuraSelect.value);
});


// MOSTRAR FIGURA INICIAL

mostrarInputs(figuraSelect.value);


// ==============================
// CALCULAR
// ==============================

calcularBtn.addEventListener("click", function () {

    const figura = figuraSelect.value;

    let area = 0;
    let perimetro = 0;


    // CUADRADO

    if (figura === "cuadrado") {

        const lado = parseFloat(
            document.getElementById("lado").value
        );

        if (isNaN(lado) || lado <= 0) {

            resultadoDiv.textContent =
                "Ingresa un lado válido";

            return;
        }

        area = lado * lado;
        perimetro = 4 * lado;
    }


    // RECTÁNGULO

    else if (figura === "rectangulo") {

        const base = parseFloat(
            document.getElementById("base").value
        );

        const altura = parseFloat(
            document.getElementById("altura").value
        );

        if (
            isNaN(base) ||
            isNaN(altura) ||
            base <= 0 ||
            altura <= 0
        ) {

            resultadoDiv.textContent =
                "Ingresa una base y altura válidas";

            return;
        }

        area = base * altura;
        perimetro = 2 * (base + altura);
    }


    // TRIÁNGULO

    else if (figura === "triangulo") {

        const base = parseFloat(
            document.getElementById("base").value
        );

        const altura = parseFloat(
            document.getElementById("altura").value
        );

        const l1 = parseFloat(
            document.getElementById("lado1").value
        );

        const l2 = parseFloat(
            document.getElementById("lado2").value
        );

        const l3 = parseFloat(
            document.getElementById("lado3").value
        );

        if (
            isNaN(base) ||
            isNaN(altura) ||
            isNaN(l1) ||
            isNaN(l2) ||
            isNaN(l3) ||
            base <= 0 ||
            altura <= 0 ||
            l1 <= 0 ||
            l2 <= 0 ||
            l3 <= 0
        ) {

            resultadoDiv.textContent =
                "Completa todos los datos del triángulo";

            return;
        }

        area = (base * altura) / 2;
        perimetro = l1 + l2 + l3;
    }


    // CÍRCULO

    else if (figura === "circulo") {

        const radio = parseFloat(
            document.getElementById("radio").value
        );

        if (isNaN(radio) || radio <= 0) {

            resultadoDiv.textContent =
                "Ingresa un radio válido";

            return;
        }

        area = Math.PI * radio * radio;
        perimetro = 2 * Math.PI * radio;
    }


    // TRAPECIO

    else if (figura === "trapecio") {

        const base1 = parseFloat(
            document.getElementById("base1").value
        );

        const base2 = parseFloat(
            document.getElementById("base2").value
        );

        const altura = parseFloat(
            document.getElementById("altura").value
        );

        if (
            isNaN(base1) ||
            isNaN(base2) ||
            isNaN(altura) ||
            base1 <= 0 ||
            base2 <= 0 ||
            altura <= 0
        ) {

            resultadoDiv.textContent =
                "Completa todos los datos del trapecio";

            return;
        }


        // Área del trapecio

        area = ((base1 + base2) * altura) / 2;


        // Se calcula el lado inclinado automáticamente
        // suponiendo un trapecio isósceles

        const lado = Math.sqrt(
            Math.pow((base1 - base2) / 2, 2) +
            Math.pow(altura, 2)
        );


        // Perímetro

        perimetro =
            base1 +
            base2 +
            (2 * lado);
    }


    // RESULTADO

    resultadoDiv.textContent =
        `Área = ${area.toFixed(2)}, Perímetro = ${perimetro.toFixed(2)}`;

});