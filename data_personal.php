<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch ($_GET['accion']) {
    case 'listar':
        $sql = "SELECT p.id, p.nombre, s.nombre AS sector, p.puesto, p.telefono 
                FROM personal p 
                INNER JOIN sectores s ON p.sector = s.id ORDER BY p.id";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'agregar':
        $sql = "INSERT INTO personal ( nombre, 
                                        sector, 
                                        puesto, 
                                        telefono ) 
                                        VALUES ( 
                                        '$_POST[nombre]', 
                                         $_POST[sector], 
                                        '$_POST[puesto]', 
                                        '$_POST[telefono]' )";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;

    case 'borrar':
        //$sql = "DELETE FROM set_tipocomp WHERE id=$_GET[id]";
        //$respuesta = mysqli_query($conexion, $sql);
        //echo json_encode($respuesta);
        break;

    case 'consultar':
        $sql = "SELECT * FROM personal WHERE id=$_GET[id]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'modificar':
        $sql = "UPDATE personal SET nombre='$_POST[nombre]', 
                                    sector=$_POST[sector], 
                                    puesto='$_POST[puesto]', 
                                    telefono='$_POST[telefono]'  
                                    WHERE id=$_GET[id]";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;
}

?>