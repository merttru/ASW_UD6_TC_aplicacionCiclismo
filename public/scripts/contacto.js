document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formularioContacto');

  const campos = formulario.querySelectorAll('input, textarea');
  campos.forEach(function(campo) {
    campo.addEventListener('blur', function() {
      validarCampo(campo);
    });
  });

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validarFormulario()) {
      alert('El formulario se ha enviado correctamente.');
      formulario.reset();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  });

  function validarCampo(campo) {
    if (!campo.checkValidity()) {
      mostrarError(campo);
    } else {
      ocultarError(campo);
    }
  }

  function mostrarError(campo) {
    campo.nextElementSibling.textContent = campo.validationMessage;
  }

  function ocultarError(campo) {
    campo.nextElementSibling.textContent = '';
  }

  function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const nombreValido = nombre.length >= 3;

    const formularioValido = formulario.checkValidity();

    return nombreValido && formularioValido;
  }
});
