let clavesPermitidas = [];

const cargarClaves = async () => {
    try {
        const respuesta = await fetch("../json/claves.json"); // Ruta del JSON
        const datos = await respuesta.json();
        clavesPermitidas = datos.map(item => item.clave);
    } catch (error) {
        console.error("Error al cargar claves:", error);
    }
};

const ingresar = () => {
    const claveIngresada = document.getElementById("Clave").value;

    if (clavesPermitidas.includes(claveIngresada)) {
        alert("Bienvenido")
        window.location.href = "../html/administración.html"
    } else {
        alert("Usuario o Contraseña equivocada")
    }
};

const limpiar = () => {
    document.getElementById("Clave").value = "";

};

cargarClaves(); // Carga las claves al iniciar
