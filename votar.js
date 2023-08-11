

$(document).ready(function() //El código dentro de esta func. se ejecutará despues de que el html se haya cargado
{ 

    cargarRegionesSelect();    //carga las regiones desde la base de datos
    cargarCandidatosSelect(); //carga los candidatos desde la base de datos

    clickVotar(); //comienzo a escuchar los clicks en el botón votar

});



/**
 * Lógica de registro del voto del usuario
 */
function clickVotar()
{
    $('#btn-votar').off();

    $('#btn-votar').click(() => { //cuando usuario hace click en votar

        const tieneValoresValidosForm = camposValidosFormularioVoto(); //validación de campos del formulario (devuelve true/false)

        if ( tieneValoresValidosForm )
        {
            guardarVotoVotante();
        }
    });
}



/**
 * La función valida los campos del formulario de voto
 * @returns {boolean} true si todos los campos del formulario son válidos - false si no todos los campos del formulario son válidos
 */
function camposValidosFormularioVoto()
{
    const camposValidos = campoNombreApellidoValido() && campoAliasValido() && campoRutValido() && 
                            campoEmailValido() && camposComoSeEnteroDeNosotrosValido() && campoComunaValido() && campoCandidatoValido();
    return camposValidos;
}



/**
 * Indica si el campo nombre del formulario es válido o no, bajo las siguientes validaciones:
 * - Única validación requerida en el enunciado -> si es str vacío es inválido.
 * @returns {boolean} true si es campo válido - false si no es campo válido
 */
function campoNombreApellidoValido()
{
    const esValido = $('#nombre').val().trim() !== ''; //valor del input nombre. trim() para quitar los espacios en blanco
    
    !esValido ? alert('El campo nombre no puede estar vacío') : '';
    
    return esValido;

}



/**
 * Indica si el campo alias del formulario es válido o no, bajo las siguientes validaciones:
 * - (Cantidad de caracteres > 5) y (debe contener min 1 letra) y (debe contener min 1 numero)
 * @returns {boolean} true si es campo válido - false si no es campo válido
 */
function campoAliasValido()
{
    const alias = $('#alias').val().trim();
    
    if ( ! contieneLetrasYNumeros(alias) )
    {
        alert('El alias debe contener al menos 1 letra y 1 número');
        return false;
    }

    if ( alias.length <= 5 )
    {
        alert('El alias debe contener más de 5 caracteres, pero actualmente tiene solo '+alias.length);
        return false;
    }

    return true;
}



/**
 * Indica si el RUT es válido, bajo las siguientes validaciones:
 * - RUT debe tener formato de rut chileno válido (se verifica la correctitud del digito verificador)
 * @returns {boolean} true si es campo válido - false si no es campo válido o si falla la llamada a la api de ruts
 */
function campoRutValido()
{
    var esValido = false;

    var rut = $('#rut').val().trim();
    var url = `https://api.libreapi.cl/rut/validate?rut=${rut}`; //url a la api de ruts chile, (es api pública)


    $.ajax({
      url: url,
      async: false,
      success: function(response) {
        console.log(response);
        esValido = (response.status === 'success') && (response.data.valid == true);
      },
      error: function() {
        console.error('problema con la llamada a la API de rut');
        esValido = false;
      }
    });
  
    !esValido ? alert('Error, por favor asegurate de que el rut sea válido y siga el formato especificado.') : '';
    return esValido;
}



/**
 * Indica si el email es válido, bajo las siguientes validaciones:
 * - validación estándar para el email
 * @returns {boolean} true si es campo válido - false si no es campo válido
 */
function campoEmailValido()
{
    var esValido = false;

    const email  = $('#email').val().trim();
	const emailValidoRegex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    esValido = emailValidoRegex.test(email);
    !esValido ? alert('Email inválido') : '';

    return esValido;
}



/**
 * Indica si la seleccion de items (checkboxs) es válida, bajo las siguientes validaciones:
 * - deberán haber sido seleccionado como min. 2 checkboxs
 * @returns {boolean} true si hay al menos 2 valores de los checkboxs seleccionados - false si hay menos de 2 seleccionados
 */
function camposComoSeEnteroDeNosotrosValido()
{
    var esValido = false;

    var elementosSeleccionados = [];
    $('input[type="checkbox"]:checked').each(function() {
        elementosSeleccionados.push($(this).val());
    });

    esValido = elementosSeleccionados.length >=2 ? true : false;
    !esValido ? alert('Debes seleccionar al menos 2 items en ¿Cómo te enteraste de nosotros? Seleccionados: '+elementosSeleccionados.length) : '';

    return esValido;
}



/**
 * Indica si el campo comuna es válido, bajo las siguientes validaciones:
 * - el valor no debe ser null
 * @returns {boolean} true si hay comunas en el select - false si no hay comunas en el select
 */
function campoComunaValido()
{
    var esValido = false;

    esValido = $('#comuna').val() != null ;
    !esValido ? alert('Error. No hay comunas.') : '';

    return esValido;
}



/**
 * Indica si el campo candidato es válido, bajo las siguientes validaciones:
 * - el valor no debe ser null
 * @returns {boolean} true si hay candidatos en el select - false si no hay candidatos en el select
 */
function campoCandidatoValido()
{
    var esValido = false;

    esValido = $('#comuna').val() != null ;
    !esValido ? alert('Error. No hay candidatos.') : '';

    return esValido;
}



/**
 * Toma el string pasado como parámetro y determina si cumple con la expresión regular
 * de 'contener letras (al menos 1) y números (al menos 1)'.
 * Ej: str: 'hola' devolverá false, str: '123' devolverá false, str: 'h123', devolverá true
 * @param {string} str - cadena de texto
 * @returns {boolean} true si str cumple con la expresión regular, false en caso contrario
 */
function contieneLetrasYNumeros(str) {
    // Expresión regular que busca al menos una letra y al menos un número en el string
    var letraYNumeroRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    
    return letraYNumeroRegex.test(str);
}



/**
 * Esta función cargará las regiones desde la base de datos en el select de regiones.
 * al terminar la carga, agregará un listener para escuchar los cambios en los options del select.
 */
function cargarRegionesSelect()
{
    $.ajax({
        url: "cargarRegiones.php",
        dataType: "json",
        success: function(respuesta) 
        {
            console.log(respuesta);
            var options_html = ``;
            for ( let i=0 ; i<respuesta.regiones.length ; i++ )
            {
                options_html += `<option value="${respuesta.regiones[i].codigo}">${respuesta.regiones[i].nombre}</option>`;
            }

            $('#region').html(options_html); //cargo los options en el select region
        },
        error: function(xhr, status, error) 
        {
            console.log(status, error);
            console.log(xhr.responseText);
            alert("No se pudieron cargar las regiones. Por favor revisa tu conexión a internet, o vuelve a intentarlo más tarde.");
        },
        complete: function()
        {
            cargarComunasSelect($('#region').val()); //cargo las comunas de la región seleccionada por default

            $("#region").off();
            $("#region").on("change", function() { //acá se irán actualizando las comunas
                var codigoRegion = $(this).val();
                cargarComunasSelect(codigoRegion);
            });
        }
    });
}



/**
 * Dado un codigo de región, cargará 2 comunas de esa región (ya que, el proyecto es modo demostración)
 * en el select de comunas
 * @param {str} codigoRegion - codigo definido para la región
 */
function cargarComunasSelect(codigoRegion)
{
    $.ajax({
        url: "cargarComunas.php",
        type: "POST",
        data: {codigoRegion},
        dataType: "json",
        success: function(respuesta) 
        {
            console.log(respuesta);
            var options_html = ``;
            for ( let i=0 ; i<respuesta.comunas.length ; i++ )
            {
                options_html += `<option value="${respuesta.comunas[i].codigo_postal}">${respuesta.comunas[i].nombre}</option>`;
            }

            $('#comuna').html(options_html); //cargo los options en el select comuna
        },
        error: function(xhr, status, error) 
        {
            console.log(status, error);
            console.log(xhr.responseText);
            alert("No se pudieron cargar las comunas. Por favor revisa tu conexión a internet, o vuelve a intentarlo más tarde.");
        },
        complete: function()
        {

        }
    });
}



/**
 * Esta función cargará los candidatos desde la base de datos en el select de candidatos.
 */
function cargarCandidatosSelect()
{
    $.ajax({
        url: "cargarCandidatos.php",
        type: "POST",
        dataType: "json",
        success: function(respuesta) 
        {
            console.log(respuesta);
            var options_html = ``;
            for ( let i=0 ; i<respuesta.candidatos.length ; i++ )
            {
                //Se añade el código del candidato para 
                //evitar el caso de que existan 2 candidatos con el mismo nombre (aunque sería una prob. baja)
                options_html += `<option value="${respuesta.candidatos[i].rut}">
                                    #${respuesta.candidatos[i].rut}
                                    -
                                    ${respuesta.candidatos[i].nombres} ${respuesta.candidatos[i].apellidop} ${respuesta.candidatos[i].apellidom}
                                </option>`;
            }

            $('#candidato').html(options_html); //cargo los options en el select candidato
        },
        error: function(xhr, status, error) 
        {
            console.log(status, error);
            console.log(xhr.responseText);
            alert("No se pudieron cargar los candidatos. Por favor revisa tu conexión a internet, o vuelve a intentarlo más tarde.");
        },
        complete: function()
        {

        }
    });
}



/**
 * Devuelve la lista de elementos (strings) seleccionados en los checkboxs del formulario.
 * @returns {string []} una lista con los elementos seleccionados en el checkbox de ¿cómo nos contactaste?
 */
function listaElementosSeleccionadosCheckBox()
{
    var elementosSeleccionados = [];
    $('input[type="checkbox"]:checked').each(function() {
        elementosSeleccionados.push($(this).val());
    });
    return elementosSeleccionados;
}


/**
 * Para poder volver a utilizar el formulario.
 */
function reiniciarFormulario()
{
    // Recarga la página actual
    location.reload();
}




/**
 * Guarda la información relacionada al voto en la base de datos.
 * Debe llamarse a la función cuando se hayan validado los campos del formulario
 */
function guardarVotoVotante()
{
    var nombre     = $('#nombre').val();
    var alias      = $('#alias').val();
    var rut        = $('#rut').val().replace(/\./g, '').split('-')[0].trim(); //parte numerica del rut, sin puntos, sin espacios
    var email      = $('#email').val();
    var comuna     = $('#comuna').val();     //el código de la comuna (codigo_postal)
    var candidato  = $('#candidato').val(); //el valor será el rut del candidato
    var fuente_inf = JSON.stringify(listaElementosSeleccionadosCheckBox()); //fuente informativa (elementos de -> ¿cómo nos contactaste?)

    $.ajax({
        url: "guardarVoto.php",
        type: "POST",
        data: {nombre, alias, rut, email, comuna, candidato, fuente_inf},
        dataType: "json",
        success: function(respuesta) 
        {
            console.log(respuesta);
            for ( let i=0 ; i<respuesta.length ; i++ )
            {
                if ( respuesta[i].operation == 'guardar voto' )
                {
                    respuesta[i].status == 'success' ? alert(respuesta[i].message) : alert(respuesta[i].error);
                }
            }
        },
        error: function(xhr, status, error) 
        {
            console.log(status, error);
            console.log(xhr.responseText);
            alert(xhr.responseText.includes('Error de conexión') ? 'Existe un posible error de conexión con la base de datos' : 'Error de conexión. No se ha podido registrar el voto');
        },
        complete: function()
        {
            reiniciarFormulario();
        }
    });

}
