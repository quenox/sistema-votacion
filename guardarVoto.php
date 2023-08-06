
<?php
/** -----------------------------------------------------------------
 * Este archivo tendrá que guardar en la base de datos tanto al voto
 * como al votante en la base de datos y la fuente informativa (TV, Amigo, Redes Sociales...).
 * Devuelve la información en formato json.
 * ------------------------------------------------------------------
 */

 require_once 'conexion.php';


// Verificar que todas las variables hayan sido enviadas por POST
if ( isset($_POST['nombre']) && isset($_POST['alias']) && 
        isset($_POST['rut']) && isset($_POST['email']) && 
            isset($_POST['comuna']) && isset($_POST['candidato']) && isset($_POST['fuente_inf']) ) 
{
    header('Content-Type: application/json');

    $respuesta1 = guardar_votante($_POST['nombre'], $_POST['alias'], $_POST['rut'], $_POST['email'], $_POST['comuna']); //guardar en tabla votante
    $respuesta2 = guardar_voto($_POST['candidato'], $_POST['rut']); //id candidato, id votante (se guardan en la tabla voto)

    if ( $respuesta2["status"] == "error" )
        echo json_encode([$respuesta1, $respuesta2]);

    else //si no hubo errores en insertar el voto, ejecuto la función guardar_fuente_informativa
    {
        $respuesta3 = guardar_fuente_informativa($_POST['rut'], json_decode($_POST['fuente_inf'])); //guardar en tabla fuente_informativa (los checkboxs seleccionados)
        echo json_encode([$respuesta1, $respuesta2, $respuesta3]);
    }
}


else
{
    $respuesta1 = array(
        'status' => 'error',
        'message' => 'Solicitud incorrecta.',
        'error' => ''
    );
    
    // Enviar respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode([$respuesta1]);
}








// ------------------ Funciones -----------------------------

function guardar_votante($nombre, $alias, $rut, $email, $comuna) //Guardo el votante en la base de datos
{
    if ( !filter_var($email, FILTER_VALIDATE_EMAIL) ) 
    {
        $respuesta = array('operation' => 'guardar votante','status' => 'error', 'message' => 'Email inválido.', 'error' => 'Email inválido.');
        return $respuesta;
    }

    $conexion  = obtenerConexion();
    $query     = "INSERT INTO votante (rut, nombre_apellido, alias, email, ref_comuna) VALUES ($rut, '$nombre', '$alias', '$email', '$comuna')";
    
    $respuesta = array();

    if ( mysqli_query($conexion, $query) ) 
    {
        $respuesta = array(
            'operation' => 'guardar votante',
            'status'    => 'success',
            'message'   => 'votante almacenado correctamente.',
            'error'     => ''
        );
    }
    
    else
    {
        $respuesta = array(
            'operation' => 'guardar votante',
            'status'    => 'error',
            'message'   => 'Error, query incorrecta: ' . mysqli_error($conexion),
            'error'     => mysqli_errno($conexion) == 1062 ? 'Votante ya registrado' : '' //1062 es duplicated entry en mysql
        );
    }

    mysqli_close($conexion);
    return $respuesta;
}


function guardar_voto($ref_candidato, $ref_votante) //Guardo el voto en la base de datos
{
    $conexion = obtenerConexion();
    $query    = "INSERT INTO voto (ref_candidato, ref_votante) VALUES ('$ref_candidato', '$ref_votante')";
    
    $respuesta = array();

    if ( mysqli_query($conexion, $query) )
    {
        $respuesta = array(
            'operation' => 'guardar voto',
            'status'    => 'success',
            'message'   => 'voto almacenado correctamente.',
            'error'     => ''
        );
    }

    else 
    {
        $respuesta = array(
            'operation' => 'guardar voto',
            'status'    => 'error',
            'message'   => 'Error, query incorrecta: ' . mysqli_error($conexion),
            'error'     => mysqli_errno($conexion) == 1062 ? 'Error, solo es posible votar 1 vez.' : '' //1062 es duplicated entry en mysql
        );
    }

    mysqli_close($conexion);
    return $respuesta;
}



function guardar_fuente_informativa($ref_votante, $lista_fuente_informativa)
{

    $conexion  = obtenerConexion();    
    $respuesta = array(
        'operation'     => 'guardar fuente informativa',
        'total_inserts' => count($lista_fuente_informativa),
        'inserts_ok'    => array(),
        'inserts_fail'  => array()
    );

    for ( $i=0 ; $i < count($lista_fuente_informativa) ; $i++ ) //nro iteraciones = cantidad de items del checkbox que fueron seleccionados
    {
        $query = "INSERT INTO fuente_informativa (ref_votante, tipo) VALUES ('$ref_votante', '$lista_fuente_informativa[$i]')";

        if ( mysqli_query($conexion, $query) )
        {
            array_push($respuesta['inserts_ok'], $lista_fuente_informativa[$i]);
        }
    
        else 
        {
            array_push($respuesta['inserts_fail'], $lista_fuente_informativa[$i]);
        }
    }
    
    mysqli_close($conexion);
    return $respuesta;   
}


?>