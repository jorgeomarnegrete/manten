<?php
header('Content-Type: application/json');

require("conexion.php");

$conexion = retornarConexion();

switch( $_GET['accion']){
    case 'numero':
        //$fecha = $_GET['ano'] . "-" . $_GET['mes'] . "-" . $_GET['dia'];
        $sql = "SELECT COUNT(numero) AS nuevo FROM ot WHERE 
                            YEAR(fecha) = $_GET[ano] AND 
                            MONTH(fecha) = $_GET[mes] AND 
                            DAY(fecha) = $_GET[dia]";
        $datos = mysqli_query($conexion, $sql);
        $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
        echo json_encode($resultado);
        break;

    case 'agregar':
        $fecha = str_replace('T',' ', $_POST['fecha']);
        $sql = "INSERT INTO ot ( fecha, 
                                numero, 
                                sector, 
                                maquina,
                                tipo,
                                falla,  
                                solicita,
                                estado ) VALUES ( 
                                '$fecha', 
                                '$_POST[numero]', 
                                $_POST[sector], 
                                $_POST[maquina],
                                $_POST[tipo],
                                '$_POST[falla]',  
                                $_POST[solicita], 
                                $_POST[estado] )";
        $respuesta = mysqli_query($conexion, $sql);
        echo json_encode($respuesta);
        break;
}


?>