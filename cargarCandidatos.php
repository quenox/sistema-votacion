<?php
/** -----------------------------------------------------------------
 * Este archivo tendrá que devolver los candidatos cargadados desde la 
 * base de datos (además el status de la operación).
 * Reicbe codigoRegion mediante get
 * Devuelve la información en formato json.
 * ------------------------------------------------------------------
 */

require_once 'conexion.php';

$conexion  = obtenerConexion();
$query     = "SELECT * FROM candidato";
$resultado = mysqli_query($conexion, $query);

if ($resultado) 
{
    $candidatos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    $status   = "success";
} 
else 
{
    $candidatos = [];
    $status   = "error";
}

mysqli_close($conexion);

header('Content-Type: application/json');
echo json_encode(["status" => $status, "candidatos" => $candidatos]); //se envia la respuesta
?>