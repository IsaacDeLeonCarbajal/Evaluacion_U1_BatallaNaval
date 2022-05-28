var tamanoTablero = 5;
const cantBarcos = 5;

//Caracteres para mostrar como tablero
const noAtacado = '~';
const atacado = 'O';
const destruido = 'X';

class Juego {

    constructor() { }

    jugar() {
        do {
            tamanoTablero = parseInt(prompt("Ingrese el tamanio del tablero (debe ser un numero entero mayor a 2)"));

            if (isNaN(tamanoTablero) || tamanoTablero < 3) {
                alert("El tamanio del tablero debe ser un numero entero mayor a 2");
            }
        } while (isNaN(tamanoTablero) || tamanoTablero < 3);

        //Nombre de los jugadores
        let nombre1;
        let nombre2;
        let ganador = ""; //Cuando alguien gane, se guardará su nombre

        //Posiciones de los barcos de los jugadores
        let posBarcos1 = null;
        let posBarcos2 = null;

        //Cantidad de barcos destruidos por los jugadores
        let puntos1 = 0;
        let puntos2 = 0;

        //Crear los tableros
        let tablero1 = this.crearTablero(tamanoTablero);
        let tablero2 = this.crearTablero(tamanoTablero);

        //Pedir los nombres de los jugadores
        console.log("BATALLA NAVAL\n");

        nombre1 = prompt("Ingrese el nombre del jugador 1");
        nombre2 = "BOT"; //prompt("Ingrese el nombre del jugador 2");

        console.log("Jugadores: \n" + nombre1 + "\n" + nombre2);
        console.log("\n\n"); //Separador

        //Ingresar los barcos
        alert("Ingresar los barcos de " + nombre1 + "\n");
        posBarcos1 = this.pedirPosiciones(cantBarcos, false);
        console.log("El jugador " + nombre1 + " ha ingresado sus barcos");
        this.mostrarTablero(tablero1);

        console.log("\n\n"); //Separador

        alert("Ingresando los barcos de " + nombre2 + "\n");
        posBarcos2 = this.pedirPosiciones(cantBarcos, true);
        console.log("El jugador " + nombre2 + " ha ingresado sus barcos");
        this.mostrarTablero(tablero2);

        console.log("\n\n\n"); //Separador

        //Jugar
        while (ganador == "") { //Mientras no haya un ganador
            //Turno del jugador 1
            alert("Es turno de " + nombre1);
            if (this.realizarTurno(nombre1, tablero1, posBarcos2, false)) { //Si el jugador atina el ataque
                puntos1++; //Sumarle un punto
            }

            if (puntos1 == cantBarcos) { //Si el jugador 1 alcanzó los puntos necesarios
                ganador = nombre1;
                break; //Salir del while
            } 

            //Turno del jugador 2
            alert("Es turno de " + nombre2);
            if (this.realizarTurno(nombre2, tablero2, posBarcos1, true)) { //Si el jugador atina el ataque
                puntos2++; //Sumarle un punto
            }

            if (puntos2 == cantBarcos) { //Si el jugador 2 alcanzó los puntos necesarios
                ganador = nombre2;
                break; //Salir del while
            }

            console.log("\n\n"); //Separador

            console.log("Tablero de " + nombre1 + ":");
            this.mostrarTablero(tablero1);

            console.log("\nTablero de " + nombre2 + ":");
            this.mostrarTablero(tablero2);

            alert("\n\n --- >>> Fin del turno <<< ---\n\n");
            console.log("\n\n --- >>> Fin del turno <<< ---\n\n");
        }

        alert("\n\n--->>>El ganador es " + ganador + "\n");
        console.log("\n\n--->>>El ganador es " + ganador + "\n\n");

        console.log("Tablero de " + nombre1 + ":");
        this.mostrarTablero(tablero1);

        console.log("\nTablero de " + nombre2 + ":");
        this.mostrarTablero(tablero2);
    }

    /**
     * Pedir cantBarcos posiciones para poner los baros del jugador y guardarlas en un arreglo.
     * 
     * @param {number} cantBarcos Cantidad de barcos que se deben ingresar.
     * @param {boolean} esBot Si es un turno del bot
     * @returns Un arreglo con las posiciones de los barcos.
     */
    pedirPosiciones(cantBarcos, esBot) {
        let posiciones = []; //Posiciones de cada uno de los barcos
        let cont = 0; //Cantidad de barcos ingresados
        let error;
        
        while (cont < cantBarcos) {
            let pos;
            error = false; //Inicializar variable

            if (!esBot) { //Si es un turno del jugador
                alert("Barco " + (cont + 1));
                pos = Posicion.pedirPosicion(tamanoTablero); //Pedir la posicion del barco
            } else { //Si es un turno del bot
                pos = new Posicion(this.enteroRandom(0, tamanoTablero), this.enteroRandom(0, tamanoTablero));
            }

            if (pos != null) { //Si la posicion es valida
                for (let i = 0; i < cont; i++) { //Revisar el resto de posiciones
                    if (posiciones[i].equals(pos)) { //Si la posicion ya esta ocupada            
                        if (!esBot) { //Si es un turno del jugador
                            alert("La posicion " + pos.toString() + " ya esta ocupada"); //Sólo avisar si es el jugador
                        }
                        error = true;
                        break; //Salir del for
                    }
                }

                if (!error) { //Si la posicion es valida
                    posiciones.push(pos); //Guardar la posicion
                    cont++;
                }
            }
        }

        return posiciones;
    }

    /**
     * Pedir a un jugador que realice su turno.
     * Se le pide atacar a una posicion, y se le indica si el ataque alcanzó a un objetivo o no.
     * 
     * @param {String} nombre Nombre del jugador que va a atacar
     * @param {array} tablero Arreglo bidimensional con el estado del tablero
     * @param {array} posEnemigo Coleccion de las posiciones de los barcos del enemigo
     * @param {boolean} esBot Si es un turno del bot
     * @returns true si el ataque fue exitoso, false si no
     */
     realizarTurno(nombre, tablero, posEnemigo, esBot) {
        let ataque; //Posicion en la que se va a atacar

        if (!esBot) { //Si es un turno del jugador
            alert(nombre + ", que casilla quieres atacar?");

            do { //Pedir una posicion valida
                ataque = Posicion.pedirPosicion(tamanoTablero); //Pedir la posicion

                if (ataque == null) {
                    alert("Posicion invalida");
                }
            } while (ataque == null);
        } else { //Si es un turno del bot
            ataque = new Posicion(this.enteroRandom(0, tamanoTablero), this.enteroRandom(0, tamanoTablero)); //Posicion en la que se va a atacar

            alert(nombre + " ataca la casilla " + ataque.toString());
        }

        if (tablero[ataque.x][ataque.y] == atacado || tablero[ataque.x][ataque.y] == destruido) {
            alert("Esa posicion ya habia sido atacada, vuelve a intentarlo");
            console.log(nombre + " intentó atacar de nuevo la posición " + ataque.toString());
            return this.realizarTurno(nombre, tablero, posEnemigo, esBot); //Volver a atacar
        } else { //Si la posicion no habia sido atacada
            for (let i = 0; i < posEnemigo.length; i++) {
                if (posEnemigo[i].equals(ataque)) { //Si el enemigo tiene un barco en la posicion atacada
                    alert("El ataque fue exitoso");
                    console.log(nombre + " destruyó un barco en la posición " + ataque.toString());
                    tablero[ataque.x][ataque.y] = destruido; //Actualizar el tablero
                    return true; //Indicar que el ataque fue exitoso
                }
            }

            //Si se llega aqui, significa que el ataque no fue correcto
            alert("El ataque no alcanzo nigun objetivo");
            console.log(nombre + " atacó sin exito la posición " + ataque.toString());
            tablero[ataque.x][ataque.y] = atacado;
            return false; //Indicar que el ataque no alcanzó objetivo
        }
    }

    mostrarTablero(tablero) {
        let texto = "   ";

        for (let x = 0; x < tablero[0].length; x++) {
            texto += "[" + (x + 1) + "]"; //Mostrar los números del eje x
        }

        texto += "\n";

        for (let y = 0; y < tablero[0].length; y++) {
            texto += (y + 1) + "  "; //Mostrar los numero del eje y

            for (let x = 0; x < tablero[0].length; x++) {
                texto += "[" + tablero[x][y] + "]"; //Mostrar cada una de las casillas
            }

            texto += "\n";
        }

        console.log(texto);
    }

    /**
     * Crear un arreglo bidimensional que representa un tablero
     * 
     * @param {number} tamano Tamano del tablero
     * @returns Un arreglo bidimensional que representa el tablero inicial
     */
    crearTablero(tamano) {
        let tablero = [];

        for (let x = 0; x < tamano; x++) { //En todo lo largo
            let aux = [];

            for (let y = 0; y < tamano; y++) { //En todo lo alto
                aux.push(noAtacado); //Agregar un caracter de casilla no atacada
            }

            tablero.push(aux);
        }

        return tablero;
    }

    enteroRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}
