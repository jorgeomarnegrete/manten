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
        $sql = "INSERT INTO set_tipocomp ( tipo, 
                                nombre, 
                                reserva, 
                                iva_incluido ) VALUES ( 
                                    '$_POST[tipo]', 
                                    '$_POST[nombre]', 
                                    $_POST[reserva], 
                                    $_POST[iva_incluido] )";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;

    case 'borrar':
        $sql = "DELETE FROM set_tipocomp WHERE id=$_GET[id]";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;

    case 'consultar':
        $sql = "SELECT * FROM set_tipocomp WHERE id=$_GET[id]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'modificar':
        $sql = "UPDATE set_tipocomp SET tipo='$_POST[tipo]', 
                                                nombre='$_POST[nombre]', 
                                                reserva=$_POST[reserva], 
                                                iva_incluido=$_POST[iva_incluido]    
                                                WHERE id=$_GET[id]";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;
}

?>