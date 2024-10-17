// Clase para manejar el usuario
class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;            //Asigna valor de parámetro 
        this.contraseña = contraseña;    //Asigna valor de parámetro
    }
}

// Clase para manejar la lista de usuarios (Almacenamiento)
class Cliente {
    constructor() { //Define constructor sin parámetros, que inicializa una lista vacía usuarios para alamcenar los usuarios
        this.usuarios = []; // Lista de usuarios
    }

    registrarUsuario(nombre, contraseña) {
        const nuevoUsuario = new Usuario(nombre, contraseña); //Crea una nueva instancia de usuario
        this.usuarios.push(nuevoUsuario); //referencia a la lista de usuarios de la instancia actual de la clase cliente, 
        //Método de arrays para agregar un nuevo elemento al final de un array
    }

    //Explicación:: Este método crea una nueva instancia de la clase Usuario con los datos nombre y contraseña y luego agrega esa instancia a la lista de usuarios.



    //new=crea instancia de la clase usuario. que esta tiene sus 2 parámetros, por ende esos datos se pasan al crear nuevo objeto

    buscarUsuario(nombre, contraseña) {  //Método para buscar un usario recibe nombre y contraseña
        return this.usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña); //Busca de lista de usuarios que coincida con nombre y contraseña
    } 
}
//usuario.nombre===nombre: comprobación de nombre si el nombre del usuario coincide con el NOMBRE que se busca
//usuario.contraseña === contraseña: Comprueba si la contraseña del usuario coincide con la contraseña proporcionada.
//usuarios=> :::: parámetro que representa cada elemento de la lista usuarios mientras se busca
//find() Método de los arrays que busca un elemento que cumpla condición. Cuando encuentra el primer elemento que cumple con esa condición, lo devuelve 

// Clase para manejar el juego
class Juego {
    constructor(cliente) { //Recibe objeto cliente, que gestiona los usuarios y lo asigna a this.cliente
        this.cliente = cliente; // Se utilizará el Cliente para gestionar usuarios
        this.usuarioActual = null; //inicializa usuarioActual en null para guardar el usuario que inicia sesión 
    }

    iniciarSesion(nombre, contraseña) { //Metodo para iniciar sesión
        const usuarioEncontrado = this.cliente.buscarUsuario(nombre, contraseña); //Si el usuario existe
        if (usuarioEncontrado) {
            this.usuarioActual = usuarioEncontrado; //Si encuentra lo asigna en usuarioActual y retorna true
            return true;
        }
        return false;
    }

    obtenerEleccionComputadora() { //Método que genera una elección aleatoria para la computadora
        const opciones = ['piedra', 'papel', 'tijeras']; //Define opciones posibles
        const indiceAleatorio = Math.floor(Math.random() * 3); //Genera un número aleatoria entre 0 y 2, para seleccionar una de las 3 opciones  //opciones.length
        return opciones[indiceAleatorio];
    }

    determinarGanador(eleccionUsuario, eleccionComputadora) { //Método que compara las elecciones del jugador y la computadora.
        if (eleccionUsuario === eleccionComputadora) {
            return '¡Es un empate!';
        } else if (
            (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijeras') ||
            (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
            (eleccionUsuario === 'tijeras' && eleccionComputadora === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return 'La computadora ganó.';
        }
    }
}

// Instancia del cliente y del juego
const cliente = new Cliente(); // Cliente maneja usuarios //crea una instancia de la clase cliente
const juego = new Juego(cliente); // Juego recibe el Cliente como referencia //crea instancia de juego, pasando la instancia cliente, para que pueda manejar usuarios

// Elementos del DOM, definimos constantes que seleccionamos elementos del DOM
const formularioInicioSesion = document.getElementById('formulario-inicio-sesion');
const formularioRegistro = document.getElementById('formulario-registro');
const contenedorFormularios = document.getElementById('contenedor-formularios');
const interfazJuego = document.getElementById('interfaz-juego');
const mostrarUsuario = document.getElementById('mostrar-usuario');
const botonesJuego = document.querySelectorAll('.game-choice');
const resultadoJuego = document.getElementById('resultado-juego');
const eleccionJugador = document.getElementById('eleccion-jugador');
const eleccionJugadorImg = document.getElementById('eleccion-jugador-img');
const eleccionMaquina = document.getElementById('eleccion-maquina');
const eleccionMaquinaImg = document.getElementById('eleccion-maquina-img');
const cerrarSesionBoton = document.getElementById('cerrar-sesion-boton');

// Cambiar entre formularios
document.getElementById('cambiar-a-registro').addEventListener('click', function(event) {
    event.preventDefault(); //Previene la acción predeterminada del evento(cambio de página)
    formularioInicioSesion.style.display = 'none';
    formularioRegistro.style.display = 'block';
});

document.getElementById('cambiar-a-inicio-sesion').addEventListener('click', function(event) {
    event.preventDefault();
    formularioRegistro.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});

// Iniciar Sesión
formularioInicioSesion.addEventListener('submit', function(event) { //al hacer submit en el formulario de inicio de sesión, se obtienen los valores de los campos nombre y contraseña
    event.preventDefault();
    const nombre = document.getElementById('usuario-inicio-sesion').value;
    const contraseña = document.getElementById('contraseña-inicio-sesion').value;

    if (juego.iniciarSesion(nombre, contraseña)) {   //si intentamos iniciar sesión. Si tenemos écito, muestra la interfaz de juego
        mostrarInterfazJuego(nombre); 
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Registrarse
formularioRegistro.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('usuario-registro').value;
    const contraseña = document.getElementById('contraseña-registro').value;

    cliente.registrarUsuario(nombre, contraseña); // Registrar en la clase Cliente
    alert('Usuario registrado exitosamente. Puedes iniciar sesión ahora.');
    formularioRegistro.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});  //Al enviar el formulario de registro, crea un nuevo usuario y lo registra en el sistema. Luego, cambia de vuelta a la pantalla de inicio de sesión

// Función para mostrar la interfaz de juego
function mostrarInterfazJuego(nombre) {
    contenedorFormularios.style.display = 'none';
    interfazJuego.style.display = 'block';
    mostrarUsuario.textContent = nombre;
} 

// Función del juego
botonesJuego.forEach(boton => {
    boton.addEventListener('click', function() {
        const eleccionUsuario = this.getAttribute('data-choice');
        const eleccionComputadora = juego.obtenerEleccionComputadora();

        // Actualizar elección del jugador y la máquina
        eleccionJugador.textContent = eleccionUsuario;
        eleccionJugadorImg.src = `imagenes/${eleccionUsuario}.png`;
        eleccionMaquina.textContent = eleccionComputadora;
        eleccionMaquinaImg.src = `imagenes/${eleccionComputadora}.png`;

        // Determinar el ganador y mostrar el resultado
        const resultado = juego.determinarGanador(eleccionUsuario, eleccionComputadora);
        resultadoJuego.textContent = resultado;
    });
}); //Se capturan los clics en los botones de elección del jugador.
//Obtiene la elección del jugador y la computadora, actualiza las imágenes y determina el ganador.

// Cerrar sesión
cerrarSesionBoton.addEventListener('click', function() {
    juego.usuarioActual = null;
    interfazJuego.style.display = 'none';
    formularioInicioSesion.style.display = 'block';
});