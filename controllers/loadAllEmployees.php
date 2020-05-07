<?php
    require_once("../model/CrudException.php");
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");
    $con = ConnectionSingleton::getInstace()->getPDOConnection();

    try{
        $em = new EmployessDAO($con);
        $result = $em->loadAll($_POST['values']=15);
    }catch(CrudException $e){
        echo $e->getMessage();
    }
    echo json_encode($result);
?>