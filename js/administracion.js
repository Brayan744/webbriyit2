document.addEventListener("DOMContentLoaded", async function () {
    let usuarios = [];

    // 1. Cargar usuarios desde JSON si no hay datos en localStorage
    async function cargarUsuariosDesdeJSON() {
        try {
            const respuesta = await fetch("json/usuarios.json"); // Asegúrate de que el archivo JSON esté en la carpeta correcta
            if (!respuesta.ok) throw new Error("No se pudo cargar el JSON");
            return await respuesta.json();
        } catch (error) {
            console.error("Error cargando JSON:", error);
            return [];
        }
    }

    // 2. Cargar usuarios desde localStorage o JSON
    async function cargarUsuarios() {
        const datosLocal = localStorage.getItem("usuarios");
        if (datosLocal) {
            usuarios = JSON.parse(datosLocal);
        } else {
            usuarios = await cargarUsuariosDesdeJSON();
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
        renderUsuarios();
    }

    function guardarUsuariosEnLocalStorage() {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // 4. Renderizar la tabla de usuarios
    function renderUsuarios() {
        const tbody = document.getElementById("tbodyUsuarios");
        tbody.innerHTML = ""; // Limpiar la tabla

        usuarios.forEach((user, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${user.usuario}</td>
                <td>${user.contraseña}</td>
                <td>${user.rol}</td>
                <td>
                    <button onclick="editarUsuario(${index})">Editar</button>
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    }

    // 5. Agregar un usuario
    function agregarUsuario(usuario, contraseña, rol) {
        usuarios.push({ usuario, contraseña, rol });
        guardarUsuariosEnLocalStorage();
        renderUsuarios();
    }

    // 6. Eliminar un usuario
    window.eliminarUsuario = function (index) {
        usuarios.splice(index, 1);
        guardarUsuariosEnLocalStorage();
        renderUsuarios();
    };

    // 7. Editar un usuario
    window.editarUsuario = function (index) {
        const user = usuarios[index];
        document.getElementById("usuario").value = user.usuario;
        document.getElementById("contraseña").value = user.contraseña;
        document.getElementById("rol").value = user.rol;

        usuarios.splice(index, 1);
        guardarUsuariosEnLocalStorage();
        renderUsuarios();
    };

    // 8. Manejo del formulario para agregar usuario
    document.getElementById("formUsuario").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const usuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("contraseña").value;
        const rol = document.getElementById("rol").value;

        agregarUsuario(usuario, contraseña, rol);
        this.reset(); // Limpiar formulario
    });

    // Cargar usuarios al inicio
    await cargarUsuarios();
});

