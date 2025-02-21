document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let correo = document.getElementById("correo").value;

        let datos = {
            nombre: nombre,
            apellidos: apellidos,
            correo: correo
        };

        fetch("https://script.google.com/macros/s/AKfycbzrmRg7DhAiENdc_9NIXBAQKdKpkRW0HSSoMumxeC9BwVwFEOizSZFNSB4lSNy97N8r/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        })
        .then(() => {
            alert("Datos enviados correctamente");
            document.querySelector(".contact-form").reset();
        })
        .catch(error => console.error("Error:", error));
    });
});

