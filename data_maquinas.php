<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch ($_GET['accion']) {
    case 'listar':
        $sql = "SELECT m.id, m.nombre, s.nombre AS sector  
                FROM maquinas m 
                INNER JOIN sectores s ON m.sector = s.id 
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

    case 'porsector':
        $sql = "SELECT * FROM maquinas WHERE sector = $_GET[sector]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;
}

?>