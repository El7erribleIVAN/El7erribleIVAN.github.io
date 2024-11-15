document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    alert('¡Gracias por registrarte! Tu descuento será enviado a tu correo.');
});
