document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userTable = document.getElementById("userTable");
    const buscarUsuarioInput = document.getElementById("buscarUsuario");
    const usersFile = "../data/usuarios.json";

    async function fetchUsers() {
        try {
            const response = await fetch(usersFile);
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
        }
    }

    function renderUsers(users) {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.usuario}</td>
                <td>${user.contraseña}</td>
                <td>${user.rol}</td>
                <td>
                    <button onclick="editUser(${index})">Editar</button>
                    <button onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    async function saveUsers(users) {
        try {
            await fetch(usersFile, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(users)
            });
        } catch (error) {
            console.error("Error al guardar los usuarios:", error);
        }
    }

    userForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("contraseña").value;
        const rol = document.getElementById("rol").value;

        const response = await fetch(usersFile);
        const users = await response.json();
        users.push({ usuario, contraseña, rol });

        await saveUsers(users);
        fetchUsers();
        userForm.reset();
    });

    window.editUser = async function(index) {
        const response = await fetch(usersFile);
        const users = await response.json();

        const user = users[index];
        document.getElementById("usuario").value = user.usuario;
        document.getElementById("contraseña").value = user.contraseña;
        document.getElementById("rol").value = user.rol;

        users.splice(index, 1);
        await saveUsers(users);
        fetchUsers();
    };

    window.deleteUser = async function(index) {
        const response = await fetch(usersFile);
        const users = await response.json();

        users.splice(index, 1);
        await saveUsers(users);
        fetchUsers();
    };

    window.buscarUsuario = async function() {
        const nombre = buscarUsuarioInput.value.toLowerCase();
        if (nombre.trim() === "") return alert("Ingrese un nombre de usuario para buscar.");

        const response = await fetch(usersFile);
        const users = await response.json();

        const usuarioEncontrado = users.find(user => user.usuario.toLowerCase() === nombre);
        if (!usuarioEncontrado) {
            alert("Usuario no encontrado.");
            return;
        }

        alert(`Usuario: ${usuarioEncontrado.usuario}\nContraseña: ${usuarioEncontrado.contraseña}\nRol: ${usuarioEncontrado.rol}`);
    };

    fetchUsers();
});
function iniciarSesion() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch('../json/usuarios.json')  
        .then(response => response.json())
        .then(usuarios => {
            let usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);
            
            if (usuarioEncontrado) {
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

                // Redirigir a la página correspondiente
                if (usuarioEncontrado.rol === "Administrador") {
                    window.location.href = "html/administración.html";
                } else {
                    window.location.href = "html/iniciouser.html";
                }
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(error => console.error("Error al obtener datos:", error));
}


