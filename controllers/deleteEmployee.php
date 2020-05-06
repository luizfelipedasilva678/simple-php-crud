<?php
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");
    $con = ConnectionSingleton::getInstace()->getPDOConnection();

    $idMatriz = json_decode($_POST['id'], true);
    $id = (int)$idMatriz['id'];
 
    try{
        $em = new EmployessDAO($con);
        $em->deleteEmployee($id);
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>