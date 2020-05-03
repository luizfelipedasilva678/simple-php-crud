<?php
    require_once("Employee.php");
    
    class EmployessDAO{
        private $connection = null;

        public function __construct(PDO $connection)
        {
            $this->connection = $connection;    
        }

        public function loadAll(){
            $sql = "select first_name, email from employees";

            
        }
    }
?>