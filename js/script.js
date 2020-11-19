//Se declaran las variables globales
var informacion = {
    "numero": "",
    "titulos": [],
    "matriz": [],
    "procesado": {},
    "imprimir": []
}; //Objecto donde se almacena toda la informacion del formulario


//Se declaran las constantes
var POSIBLES_VALORES = [0, 1], //Posibles valores para llenar la matriz
    IDTABLE = 'table', //Id de la tabla Html
    DEFAULT = 3, //Numero de filas por defecto
    MINIMO = 2, //Numero minimo de filas
    IDPROPIEDADES = 'tableProperty',
    TARJETAPROPIEDADES = 'tarjetaPropiedades',
    MENSAJE_CUMPLE = 'Cumple',
    MENSAJE_NOCUMPLE = 'No cumple',
    IDGRAFO = 'grafos',
    IDRECORRIDO = 'recorrido';

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

function getProcesado() {
    return informacion.procesado;
}

function getImprimir() {
    return informacion.imprimir;
}

function getTitulos() {
    return informacion.titulos;
}

function setProcesado(clave, valor) {
    informacion.procesado[clave] = valor;
}

function setImprimir(clave, valor, texto) {
    if (valor === true) {
        valor = MENSAJE_CUMPLE;
    } else if (valor === false) {
        valor = MENSAJE_NOCUMPLE;
    }

    informacion.imprimir.push({
        "titulo": clave,
        "valor": valor,
        "regla": texto
    });
}

function getMatriz() {
    return informacion.matriz;
}

function getTitulos() {
    return informacion.titulos;
}

function getNumero() {
    return informacion.numero;
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
}

/*
obtener la informacion de la matriz
*/
function obtenerInformacion() {
    var numero = $("#numero").val(),
        datos = [],
        titulos = [];

    for (let i = 0; i < numero; i++) {
        datos[i] = [];
        for (let j = 0; j < numero; j++) {
            datos[i][j] = document.getElementById('valor' + i + j).value;
        }
    }

    for (let i = 1; i <= numero; i++) {
        titulos[i - 1] = document.getElementById('titulo0' + i).value;
    }

    informacion.numero = numero;
    informacion.matriz = datos;
    informacion.titulos = titulos;
    informacion.procesado = {};
    informacion.imprimir = [];
}
/*
Funcion para validar las dimensiones de la matriz que sea numerica y mator al valor MINIMO
parametos: numero return boolean
*/
function validaNumero(numero) {
    if (numero >= MINIMO && numero.match(/^[0-9.]+$/) !== null) {
        return true;
    }
    return false;
}

/*
funtion para mostrar mensaje como alerta
parametro: mensaje
*/
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

function llenarTablaDinamica(numero) {
    for (let i = 0; i <= numero; i++) {
        for (let j = 0; j <= numero; j++) {
            $('#valor' + i + j).val(Math.floor(Math.random() * 2));
        }
    }
}

function agregarPropiedad(id) {
    $('#' + id).html('');
    var celdas = "",
        propiedades = getImprimir();

    if (Array.isArray(propiedades)) {
        propiedades.forEach(function(prop) {
            celdas += '<tr><th scope="row">' + prop.titulo + '</th><td>' + prop.regla + '</td><td>' + prop.valor + '</td></tr>';
        });
    }

    $('#' + id).append(celdas);
}


function relaciones(matriz) {
    var combinaciones = "R = { ",
        numero = getNumero(),
        titulos = getTitulos();

    for (var filas = 0; filas < numero; filas++) {
        for (var columnas = 0; columnas < numero; columnas++) {
            if (matriz[filas][columnas] == 1) {
                combinaciones += '(' + titulos[filas] + ', ' + titulos[columnas] + '), ';
            }
        }
    }

    combinaciones += '}';

    return replaceAll(combinaciones, ', }', ' }');;
}

/*
Funcion para saber si la matriz es reflexiva 
parametros: matriz  return : boolean
*/
function isReflexica(matriz) {
    var is = true;
    var nFilas = getNumero();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas == columnas && is) {
                if (matriz[filas][columnas] == 1) {
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
function isIrreflexiva(matriz) {
    var is = true;
    var nFilas = getNumero();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas == columnas && is) {
                if (matriz[filas][columnas] == 0) {
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
Funcion para saber si la matriz es Simetrica 
parametros: matriz  return : boolean
*/

function isSimetrica(matriz) {
    var is = false;
    var nFilas = getNumero();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas != columnas && is == false) {
                if (matriz[filas][columnas] == 1 && matriz[columnas][filas] == 1) {
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
Funcion para saber si la matriz es Antisimetrica 
parametros: matriz  return : boolean
*/

function isAntisimetrica(matriz) {
    var is = true;
    var nFilas = getNumero();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas != columnas && is) {
                if (matriz[filas][columnas] == 1 && matriz[columnas][filas] == 1) {
                    is = false;
                } else {
                    is = true;
                    continue;
                }
            }
        }

    }
    return is;
}

function isAsimetrica(matriz) {
    var is = true;
    var nFilas = getNumero();
    var nColumnas = nFilas;
    for (var filas = 0; filas < nFilas; filas++) {
        for (var columnas = 0; columnas < nColumnas; columnas++) {
            if (filas != columnas && is) {
                if (matriz[filas][columnas] == 1 && matriz[columnas][filas] == 1) {
                    is = false;
                } else {
                    is = true;
                    continue;
                }
            } else if (filas == columnas && is) {
                if (matriz[filas][columnas] == 1) {
                    is = false;
                } else {
                    is = true;
                    continue;
                }
            }
        }
    }
    return is;
}

function multiplicar(matriz, numero) {
    var producto = [];
    for (i = 0; i < numero; i++) {
        producto[i] = [];
        for (j = 0; j < numero; j++) {
            producto[i][j] = matriz[i][j] * matriz[j][i];
        }
    }
    return producto;
}


function esTransitiva() {
    var matriz = getMatriz(),
        numero = getNumero(),
        producto = multiplicar(matriz, numero),
        transitiva = true;

    for (i = 0; i < numero; i++) {
        for (j = 0; j < numero; j++) {
            if (producto[i][j] > matriz[i][j]) {
                transitiva = false;
                continue;
            }
        }
    }

    return transitiva;
}

function esEquivalencia() {
    var procesado = getProcesado(),
        validar = ["Reflexiva", "Simetrica", "Transitiva"],
        equivalencia = true;

    if (Array.isArray(validar)) {
        validar.forEach(function(prop) {
            if (procesado[prop] === false) {
                equivalencia = false;
            }
        });
    }

    return equivalencia;
}

function esOrden() {
    var procesado = getProcesado(),
        validar = ["Reflexiva", "Antisimetrica", "Transitiva"],
        parcial = true;

    if (Array.isArray(validar)) {
        validar.forEach(function(prop) {
            if (procesado[prop] === false) {
                parcial = false;
            }
        });
    }

    return parcial;
}

function configuracion() {
    var proceso = [{
            "nombre": "Relaciones",
            "funcion": relaciones(getMatriz()),
            "regla": "Relacion de los nodos"
        },
        {
            "nombre": "Reflexiva",
            "funcion": isReflexica(getMatriz()),
            "regla": "Su diagonal principal contiene todos en 1"
        },
        {
            "nombre": "Ireflexiva",
            "funcion": isIrreflexiva(getMatriz()),
            "regla": "Su diagonal principal contiene todos en 0"
        },
        {
            "nombre": "Simetrica",
            "funcion": isSimetrica(getMatriz()),
            "regla": "Si dentro de la matriz existen equivalentes"
        },
        {
            "nombre": "Asimetrica",
            "funcion": isAsimetrica(getMatriz()),
            "regla": "Si dentro de la matriz no existen equivalentes y su diagonal principal contiene todos en 0"
        },
        {
            "nombre": "Antisimetrica",
            "funcion": isAntisimetrica(getMatriz()),
            "regla": "Si dentro de la matriz no existen equivalentes"
        },
        {
            "nombre": "Transitiva",
            "funcion": esTransitiva(),
            "regla": "Si el producto matricial es menor o igual a la matriz"
        }
    ];
    procesar(proceso);

    var finalizar = [{
            "nombre": "Equivalencia",
            "funcion": esEquivalencia(),
            "regla": "Si es refletiva, simétrica y transitiva"
        },
        {
            "nombre": "Orden",
            "funcion": esOrden(),
            "regla": "<i>Orden Parcial:</i> Si es refletiva, antisimetrica y transitiva.<br>" +
                "<i>Orden Total:</i> Si es parcial y cada par de elemento es compatibles"
        }
    ];
    procesar(finalizar);
}

function procesar(proceso) {
    if (Array.isArray(proceso)) {
        proceso.forEach(function(prop) {
            setProcesado(prop.nombre, prop.funcion);
            setImprimir(prop.nombre, prop.funcion, prop.regla);
        });
    }
}


/*
 * Funciones que se ejecutan al cargar el documento.
 */
$(document).ready(function() {
    crearTabla(IDTABLE, DEFAULT);
    var numero = $("#numero").val();
    llenarTablaDinamica(numero);
});

/*
 * Cuando el valor del input[numero] cambia, genera la tabla nueva.
 */
$("#numero").keyup(function() {
    var numero = $(this).val();
    if (!validaNumero(numero)) {
        mostrarMensaje("Valor no valido, debe ser numerico y mayor a 2");
        $("#procesar").prop('disabled', true);
    } else {
        $("#procesar").prop('disabled', false);
        crearTabla(IDTABLE, numero);
    }
    $("#" + TARJETAPROPIEDADES).addClass('d-none');
    $("#" + IDRECORRIDO).addClass('d-none');
    $("#" + IDGRAFO).addClass('d-none');
});

$("#llenarMatriz").click(function() {
    var numero = $("#numero").val();
    llenarTablaDinamica(numero);
});

$("#LimpiarrMatriz").click(function() {
    var numero = $("#numero").val();
    crearTabla(IDTABLE, numero);
});

$("#procesar").click(function() {
    obtenerInformacion();
    configuracion();
    $("#" + TARJETAPROPIEDADES).removeClass('d-none');
    $("#" + IDGRAFO).removeClass('d-none');
    $("#" + IDRECORRIDO).removeClass('d-none');
    agregarPropiedad(IDPROPIEDADES);
    log(informacion);
});