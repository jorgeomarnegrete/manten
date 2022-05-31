<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch ($_GET['accion']) {
    case 'listar':
        $sql = "SELECT * FROM estados";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'agregar':
        $sql = "INSERT INTO estados ( nombre ) VALUES ( '$_POST[nombre]' )";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;

    case 'borrar':
        //$sql = "DELETE FROM set_tipocomp WHERE id=$_GET[id]";
        //$respuesta = mysqli_query($conexion, $sql);
        //echo json_encode($respuesta);
        break;

    case 'consultar':
        $sql = "SELECT * FROM estados WHERE id=$_GET[id]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'modificar':
        $sql = "UPDATE estados SET nombre='$_POST[nombre]' WHERE id=$_GET[id]";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;
}

?>