<?php
/** -----------------------------------------------------------------
 * Este archivo tendrá que devolver las comunas cargadas desde la 
 * base de datos (además el status de la operación).
 * Reicbe codigoRegion mediante get
 * Devuelve la información en formato json.
 * ------------------------------------------------------------------
 */

require_once 'conexion.php';


$codigoRegion = $_POST["codigoRegion"];

$conexion  = obtenerConexion();
$query     = "SELECT * FROM comuna where ref_region='$codigoRegion'";
$resultado = mysqli_query($conexion, $query);

if ($resultado) 
{
    $comunas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    $status   = "success";
} 
else 
{
    $comunas = [];
    $status   = "error";
}

mysqli_close($conexion);

header('Content-Type: application/json');
echo json_encode(["status" => $status, "comunas" => $comunas]); //se envia la respuesta
?>