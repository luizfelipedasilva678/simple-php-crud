<?php
    require_once("../model/CrudException.php");
    require_once("../model/Employee.php");
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");

    $con = ConnectionSingleton::getInstace()->getPDOConnection();
    $data = json_decode($_POST['employee'], true);
    $idMatriz = json_decode($_POST['id'], true);
    $id = (int)$idMatriz['id'];
    $employee = new Employee($data);

    try{
        $em = new EmployessDAO($con);
        $em->editEmployee($employee, $id);
    }catch(CrudException $e){
        echo $e->getMessage();
    }
?>