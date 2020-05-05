<?php
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");

    $con = ConnectionSingleton::getInstace()->getPDOConnection();

    $em = new EmployessDAO($con);

    $result = $em->loadAll();
    
    echo json_encode($result);
?>