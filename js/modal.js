
var modal = document.getElementById("myModal");


var btn = document.getElementById("add");


var span = document.getElementsByClassName("close")[0];

var input = document.getElementById('input-texto').value;

// Cuando el usuario hace clic se abre el modal
btn.onclick = function() {
  document.getElementById('input-texto').value = '';
  document.getElementById("registro-ok").style.display = "none";
  document.getElementById("mensaje").style.display = "none";
  modal.style.display = "block";
}

// Cuando el usuario hace click en la x se cierra el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario hace click fuera del modal se cierra
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}