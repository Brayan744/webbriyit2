let usuarios = [];

async function cargarUsuarios() {
    try {
        let respuesta = await fetch("./json/usuarios.json"); 
        usuarios = await respuesta.json();
    } catch (error) {
        console.error("Error cargando los usuarios:", error);
    }
}

// Cargar usuarios al inicio
cargarUsuarios();

const ingresar = async () => {
    if (usuarios.length === 0) {
        await cargarUsuarios();
    }

    let usuarioInput = document.getElementById("usuario").value;  
    let contraseñaInput = document.getElementById("contraseña").value;

    let usuarioEncontrado = usuarios.find(user => 
        user.usuario === usuarioInput && user.contraseña === contraseñaInput
    );

    if (usuarioEncontrado) {
        alert(`Bienvenido, ${usuarioEncontrado.nombre}. Rol: ${usuarioEncontrado.rol}`);
        
        // Guardar usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

        // Redirigir a la página de inicio
        window.location.href = "./html/iniciouser.html"; 
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
};

function cerrarSesion(event) {
    event.preventDefault(); // Evita que el enlace redirija de inmediato
    localStorage.removeItem("usuario"); // Elimina solo los datos de sesión
    setTimeout(() => {
        window.location.href = "../index.html"; // Redirige después de borrar los datos
    }, 100); // Pequeña pausa para asegurar que se eliminen los datos
}







const limpiar = () => {
    document.getElementById("usuario").value = "";  
    document.getElementById("contraseña").value = "";
};

// Manejo de sesión en la página de inicio
document.addEventListener("DOMContentLoaded", function () {
    let usuario = localStorage.getItem("usuario");
    console.log("Usuario en localStorage al cargar la página:", usuario);

    // Si no hay usuario, redirigir al login
    if (!usuario) {
        console.log("No hay usuario, redirigiendo al login...");
        window.location.href = "../index.html";  
    } else {
        let usuarioObjeto = JSON.parse(usuario);
        document.getElementById("nombreUsuario").innerText = usuarioObjeto.nombre;
    }

    
});
