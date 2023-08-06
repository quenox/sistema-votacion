<?php
require_once 'config.php';



function obtenerConexion() 
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if (!$conn) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    return $conn;
}
?>
