class Posicion {
    x = 0;
    y = 0;

    /**
     * Pedir una posición para colocar en el tablero.
     * @param {number} maxPos La posición máxima que se puede elegir (El tamaño del tablero).
     * @returns Un objeto Posicion con la posición ingresada.
     */
    static pedirPosicion(maxPos) {
        let texto = prompt("Ingrese la posicion (posicion 'x' e 'y' de 1 a " + maxPos + " separadas por un espacio)"); //Posicion pedida por el usuario

        let nums = this.separarStringEnNumeros(texto, " "); //Separar los numeros

        if (!nums) { //Si se ingresó una entrada inválida
            alert("La entrada no es valida. El formato es 'n n'");
            return null; //No devolver una posición
        }
        if (nums.length != 2) { //Si no se ingresaron dos numeros
            alert("La entrada no es valida. Se deben ingresar dos numeros separados por un espacio");
            return null; //No devolver una posición
        }
        if ((nums[0] < 1 || nums[0] > maxPos) || (nums[1] < 1 || nums[1] > maxPos)) { //Si alguno de los numeros ingresados está fuera del rango
            alert("Los numeros deben estar entre 1 y " + maxPos);
            return null; //No devolver una posición
        }

        //Si todo está correcto
        return new Posicion(nums[0] - 1, nums[1] - 1); //Devolver la posicion (basada en cero)
    }

    /**
     * Separa un string, vaciando los valores eparados en un arreglo.
     * 
     * @param {string} texto El texto que se busca separar.
     * @param {string} separador El caracter o texto que se usará para separar cada elemento.
     * @returns Un arreglo con los datos en formato numerico que se encuentren.
     */
    static separarStringEnNumeros(texto, separador) {
        texto += separador; //Para que agregue el ultimo elemento
        let resultado = []; //Arreglo de números resultante

        let elemento = "";

        for (let i = 0; i < texto.length; i++) {
            const caracter = texto[i]; //Cada caracter del texto

            if (caracter == separador) { //Cuando se encuentra un separador
                if (elemento != "") { //Cuando hay mas de un separador juntos
                    let num = parseInt(elemento);

                    if (isNaN(num)) { //Si el elemento no es un numero
                        console.log("RETURN NULL");
                        return null; //No devolver nada
                    } else {
                        resultado.push(num); //Agregar el numero al arreglo
                        elemento = ""; //Reiniciar la variable
                    }
                }
            } else { //Si este caracter no es eeparador
                elemento += caracter; //Agregar string a la variable
            }
        }

        return resultado;
    }

    /**
     * Construir una posicion a partir de dos numeros enteros.
     * 
     * Se utiliza un sistema basado en cero.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Obtener los valores de la posición.
     * 
     * @returns Una string con los valores de la posición.
     */
    toString() {
        return "(" + (this.x + 1) + ", " + (this.y + 1) + ")";
    }

    /**
     * Comparar dos posiciones y saber apuntan a la misma casilla.
     * @param {Posicion} pos La posición a comparar.
     * @returns true si los valores de ambas posiciones son iguales, false si no.
     */
    equals(pos) {
        return ((this.x == pos.x) && (this.y == pos.y));
    }
}
