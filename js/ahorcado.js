const palabras = [
  "CASA",
  "PROGRAMACION",
  "ENCAPSULAR",
  "ATRIBUTO",
  "INICIALIZAR",
  "JAVASCRIPT",
  "JAVA",
  "ENCRIPTAR",
];

let respuesta = "";
let errores = 0;
let letraIngresadas = [];
let estadoDePalabra = null;

let mensajeErrorInput = "Ingrese nuevamente la palabra. <br>";

/* Funciones */

palabraRandom();
adivinaPalabra();
actualizarErrores();
generarBotones();

/* Setea una palabra random para poder adivinarla */
function palabraRandom() {
  respuesta =
    palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
}

/* genera botones para ingresar letras */
function generarBotones() {
  let botonesHTML = "ABCDEFGJHIJKLMNÑOPQRSTUVWXYZ"
    .split("")
    .map(
      (letra) =>
        `
        <button
          class="btn-keyboard"
          id='` +
        letra +
        `'
          onClick="manejoAciertos('` +
        letra +
        `')"
        >
          ` +
        letra +
        `
        </button>
      `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = botonesHTML;
}

/* Muestra letra en caso que se haya escogido una correcta y actualiza la imagen */
function manejoAciertos(letraEscogida) {
  // si la letra no se encuentra como acierto ya ingresado se ingresa en el array de adivina
  letraIngresadas.indexOf(letraEscogida) === -1
    ? letraIngresadas.push(letraEscogida)
    : null;
  //creo que deshabilita la letra que ya esta escogida
  document.getElementById(letraEscogida).setAttribute("disabled", true);
  showLetraUsada(letraEscogida);
  if (respuesta.indexOf(letraEscogida) >= 0) {
    adivinaPalabra();
    checkGano();
  } else if (respuesta.indexOf(letraEscogida) === -1) {
    errores++;
    actualizarErrores();
    checkPerdio();
    actualizarImagenJuego();
  }
}

/* Actualiza la imagen del ahorcado */
function actualizarImagenJuego() {
  document.getElementById("ahorcado").src = "img/" + errores + ".png";
}

/* Muestra la letra utilizada */
function showLetraUsada(letra) {
  let letraUsada = document.createElement("span");
  letraUsada.innerHTML = letra.toUpperCase() + " ";
  document.getElementById("letras-usadas").appendChild(letraUsada);
}

/* 
  Check de si gano, si gano muestra el mensaje*/
function checkGano() {
  if (estadoDePalabra === respuesta) {
    document.getElementById("letras-usadas").innerHTML = "";
    document.getElementById("keyboard").innerHTML = "";
    document.getElementById("status").innerHTML = "Ganaste, felicidades!";
    document.getElementById("status").classList.add("gano");
  }
}

/* Check de si perdio, si perdio muestra cual era la palabra a adivinar e informa que perdio. */
function checkPerdio() {
  if (errores === 6) {
    document.getElementById("palabra-adivinar").innerHTML =
      "La palabra era: " + respuesta;
    document.getElementById("letras-usadas").innerHTML = "";
    document.getElementById("keyboard").innerHTML = "";
    document.getElementById("status").innerHTML =
      "Perdiste. <br>Fin del juego.";
    document.getElementById("status").classList.add("perdio");
  }
}

/* Muestra espacios o letras adivinada de la palabra */
function adivinaPalabra() {
  estadoDePalabra = respuesta
    .split("")
    .map((letra) => (letraIngresadas.indexOf(letra) >= 0 ? letra : " _ "))
    .join("");
  document.getElementById("palabra-adivinar").innerHTML = estadoDePalabra;
}

/* Muestra la cantidad de errores cometidos */
function actualizarErrores() {
  document.getElementById("errores").innerHTML = errores;
}

/* Funcion para iniciar juego */
function inicioJuego() {
  errores = 0;
  letraIngresadas = [];
  document.getElementById("ahorcado").src = "img/0.png";
  document.getElementById("status").innerHTML = "";
  document.getElementById("status").removeAttribute("perdio");
  document.getElementById("status").removeAttribute("gano");
  document.getElementById("letras-usadas").innerHTML = "Letras utilizadas: ";
  palabraRandom();
  adivinaPalabra();
  actualizarErrores();
  generarBotones();
}

function reset() {
  errores = 0;
  letraIngresadas = [];
  document.getElementById("ahorcado").src = "img/0.png";
  document.getElementById("status").innerHTML = "";
  document.getElementById("status").removeAttribute("perdio");
  document.getElementById("status").removeAttribute("gano");
  document.getElementById("letras-usadas").innerHTML = "Letras utilizadas: ";
  respuesta = palabras[palabras.length-1];
  adivinaPalabra();
  actualizarErrores();
  generarBotones();
}

/* Funciones para agregar nueva */

/* Guardar nueva palabra en el array, si esta no esta agregada en el array */
function guardarNuevaPalabra() {
  let nuevaPalabra = document.querySelector(".input-texto").value;
  document.getElementById("status").removeAttribute("perdio");
  document.getElementById("status").removeAttribute("gano");
  if (!textoValido(nuevaPalabra)) {
    mostrarMensajeError("La palabra ingresada debe estar en mayuscula.");
  } else if (caracteresEspeciales(nuevaPalabra)) {
    console.log("Else if tiene caracteres especiales" +caracteresEspeciales(nuevaPalabra));
    mostrarMensajeError("La palabra no puede contener caracteres especiales.");
  } else if (!acentos(nuevaPalabra)){
    mostrarMensajeError("La palabra no puede contener acentos.");
  } else {
    if (!palabras.includes(nuevaPalabra)) {
      document.getElementById("mensaje").style.display = "none";
      document.getElementById("registro-ok").style.display = "block";
      document.getElementById("registro-ok").innerHTML =
        "Se ha registrado la palabra correctamente";
      palabras.push(nuevaPalabra);
      reset();
    } else {
      mostrarMensajeError("La palabra ya se encuentra registrada");
    }
  } 
}

function mostrarMensajeError(mensaje) {
  document.getElementById("mensaje").style.display = "block";
  document.getElementById("registro-ok").style.display = "none";
  document.getElementById("mensaje").innerHTML =
      mensajeErrorInput + mensaje;
}

/* ================== Verificaciones ===============*/

/* Validacion si contiene caracteres especiales al ingresar nueva palabra  */
function caracteresEspeciales(palabra) {
  const caracteres = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return caracteres.test(palabra);
}

/* Valida si la palabra tiene acentos */
function acentos(palabra) {
  const acentos = /^[A-Z]+$/;
  return acentos.test(palabra);
}

/* Validacion si las letras contienen acentos al querer ingresar una nueva palabra*/
function textoValido(texto) {
  if (texto.toUpperCase() === texto) {
    return true;
  } else {
    return false;
  }
}

