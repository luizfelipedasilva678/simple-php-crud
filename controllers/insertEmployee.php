<?php
    require_once("../model/CrudException.php");
    require_once("../model/Employee.php");
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");
    
    $con = ConnectionSingleton::getInstace()->getPDOConnection();
    $data = json_decode($_POST['employee'], true);
    $employee = new Employee($data);
   
    try{
        $em = new EmployessDAO($con);
        $em->insertEmployee($employee);
    }catch(CrudException $e){
        echo $e->getMessage();
    }
?>