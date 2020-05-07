<?php    
    require_once("../model/CrudException.php");
    require_once("../model/ConnectionSingleton.php");
    require_once("../model/EmployeesDAO.php");
    $con = ConnectionSingleton::getInstace()->getPDOConnection();

    $idArray = json_decode($_POST['id'], true);
    $id = (int)$idArray['id'];
    
    try{
        $em = new EmployessDAO($con);
        $result = $em->selectEmployee($id);
    }catch(CrudException $e){
        echo $e->getMessage();
    }
    echo json_encode($result);
?>