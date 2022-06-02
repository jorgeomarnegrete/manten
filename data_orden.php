<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch ($_GET['accion']) {
    case 'listar':
        $sql = "SELECT o.id, o.numero, o.fecha, m.nombre AS maquina, o.falla, e.nombre AS estado   
                FROM ot o
                INNER JOIN estados e ON o.estado = e.id 
                INNER JOIN maquinas m ON o.maquina = m.id 
                ORDER BY m.id";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'agregar':
        $sql = "INSERT INTO maquinas ( nombre, 
                                        sector ) 
                                        VALUES ( 
                                        '$_POST[nombre]', 
                                         $_POST[sector] )";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;

    case 'borrar':
        //$sql = "DELETE FROM set_tipocomp WHERE id=$_GET[id]";
        //$respuesta = mysqli_query($conexion, $sql);
        //echo json_encode($respuesta);
        break;

    case 'consultar':
        $sql = "SELECT * FROM maquinas WHERE id=$_GET[id]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'modificar':
        $sql = "UPDATE maquinas SET nombre='$_POST[nombre]', 
                                    sector= $_POST[sector] 
                                    WHERE id=$_GET[id]";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;
}

?>