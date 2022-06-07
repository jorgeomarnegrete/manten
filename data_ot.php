<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch( $_GET['accion']){
    case 'numero':
        $fecha = $_GET['ano'] . "-" . $_GET['mes'] . "-" . $_GET['dia'];
        $sql = "SELECT COUNT(numero) AS nuevo FROM ot WHERE fecha = '" .$fecha."'";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;
}


?>