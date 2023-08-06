<?php
/** -----------------------------------------------------------------
 * Este archivo tendrá que devolver las regiones cargadas desde la 
 * base de datos (además el status de la operación).
 * Devuelve la información en formato json.
 * ------------------------------------------------------------------
 */

require_once 'conexion.php';

$conexion  = obtenerConexion();
$query     = "SELECT * FROM region";
$resultado = mysqli_query($conexion, $query);

if ($resultado) 
{
    $regiones = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    $status   = "success";
} 
else 
{
    $regiones = [];
    $status   = "error";
}

mysqli_close($conexion);

header('Content-Type: application/json');
echo json_encode(["status" => $status, "regiones" => $regiones]); //se envia la respuesta
?>
