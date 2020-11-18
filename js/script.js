//Se declaran las variables globales
var informacion = new Array(2); //Objecto donde se almacena toda la informacion del formulario

//Se declaran las constantes
var POSIBLES_VALORES = [0, 1], //Posibles valores para llenar la matriz
    IDTABLE = 'table', //Id de la tabla Html
    DEFAULT = 3; //Numero de filas por defecto

/*
 * Funcion que imprimer con sangria y espacios en consola.
 * @param valor: Valor a mostrar sin importar el tipo.
 */
function log(valor) {
    if (typeof valor === "object") {
        console.log(JSON.stringify(valor, null, '\t'));
    } else {
        console.log(valor);
    }
}

/*
 * Funcion que reemplaza todos los valores en una cadena.
 * @param cadena: Cadena en la que se va a reemplazar
 * @param buscar: El valor que se va a buscar.
 * @param reemplazar: El valor por el cual se va a reemplazar.
 */
function replaceAll(valor, buscar, reemplazar) {
    if (typeof valor === "string") {
        return valor.split(buscar).join(reemplazar);
    }
    return valor;
}

/*
 * Funcion que reemplaza varios valores en una cadena.
 * @param cadena: Cadena en la que se va a reemplazar
 * @param objClaves: Objecto donde la clave es lo que se va a buscar 
 *                   y el valor es por lo que se va a reemplazar
 */
function replaceKey(cadena, objClaves) {
    if (typeof objClaves === "object") {
        for (var key in objClaves) {
            cadena = replaceAll(cadena, key, objClaves[key]);
        }
    }
    return cadena;
}

/*
 * Funcion que genera la tabla dinamicamente.
 * @param id: Id html de la tabla donde se va a pintar
 * @param numero: Cantidad de filas y columnas a tener
 */
function crearTabla(id, numero) {
    $('#' + id).html('');
    var celdas = "";

    for (let i = 0; i <= numero; i++) {
        let fila = "";
        let titulo = (i == 0) ? true : false;

        for (let j = 0; j <= numero; j++) {
            if (i == 0 && j == 0) {
                fila += '<th></th>';
            } else if (j == 0 || titulo == true) {
                let nodo = (i == 0) ? j : i;
                fila += '<th class="text-center"><input type="text" class="form-control text-center negrita title" onkeyup="actulizarNombre(this)" name="titulo[' + i + '][' + j + ']" id="titulo' + i + j + '" value="Nodo' + nodo + '" data-inverso="' + j + i + '"></th>';
            } else {
                fila += '<td><select class="form-control text-center" name="valor[' + (i - 1) + '][' + (j - 1) + ']" id="valor' + (i - 1) + (j - 1) + '" >{{option}}</select></td>';
            }
        }
        celdas += '<tr>' + fila + '</tr>';
    }

    celdas = replaceKey(celdas, {
        "{{option}}": generarOpciones()
    });

    $('#' + id).append(celdas);
    return celdas;
}

function generarOpciones() {
    var opcion = "";
    if (Array.isArray(POSIBLES_VALORES)) {
        POSIBLES_VALORES.forEach(function(prop) {
            opcion += '<option value=' + prop + '>' + prop + '</option>';
        });
    }
    return opcion;
}

/*
 * Funcion que actualiza el valor de su campo inverso.
 * @param vThis: Elemento html el cual se esta manipulando.
 */
function actulizarNombre(vThis) {
    var inverso = $(vThis).data("inverso"),
        valor = $(vThis).val();
    $('#titulo' + inverso).val(valor);
};

/*
 * Funciones que se ejecutan al cargar el documento.
 */
$(document).ready(function() {
    crearTabla(IDTABLE, DEFAULT);
});

/*
 * Cuando el valor del input[numero] cambia, genera la tabla nueva.
 */
$("#numero").keyup(function() {
    var numero = $(this).val();
    crearTabla(IDTABLE, numero);
});

/*
obtener la informacion de la matriz
*/
function obtenerInformacion() {
    var numero = $("#numero").val();
    if (validaNumero(numero)) {
        for (let i = 0; i < numero; i++) {
            informacion[i] = new Array(2);
            for (let j = 0; j < numero; j++) {
                informacion[i][j] = document.getElementById('valor' + i + j).value;
            }
        }
    } else {
        mostrarMensaje('la dimension debe ser mayor a 2');
    }
    log(informacion);
}
/*
Funcion para validar las dimensiones de la matriz y que sean actas de trabajar
parametos: numero return boolean
*/
function validaNumero(numero) {
    var validar = false;
    if (numero > 1) {
        validar = true;
    } else {
        validar = false;
    }
    return validar;
}
/*
Funcion para saber si la matriz es reflexiva 
parametros: matriz  return : boolean
*/
function isReflexica(_matriz) {
    var is = true;
    var nFilas = $('#numero').val();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas == columnas && is) {
                if (_matriz[filas][columnas] == 1) {
                    is = true;
                } else {
                    is = false;
                    continue;
                }
            }
        }

    }
    return is;
}
/*
Funcion para saber si la matriz es reflexiva 
parametros: matriz  return : boolean
*/
function isIrreflexiva(_matriz) {
    var is = true;
    var nFilas = $('#numero').val();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas == columnas && is) {
                if (_matriz[filas][columnas] == 0) {
                    is = true;
                } else {
                    is = false;
                    continue;
                }
            }
        }

    }
    return is;
}

/*
funtion para mostrar mensaje como alerta
parametro: mensaje
*/
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

$("#llenarMatriz").click(function() {
    var numero = $("#numero").val();
    llenarTablaDinamica(numero);
});


function llenarTablaDinamica(numero) {
    for (let i = 0; i <= numero; i++) {
        for (let j = 0; j <= numero; j++) {
            $('#valor' + i + j).val(Math.floor(Math.random() * 2));
        }
    }
}

$("#LimpiarrMatriz").click(function() {
    var numero = $("#numero").val();
    crearTabla(IDTABLE, numero);
});