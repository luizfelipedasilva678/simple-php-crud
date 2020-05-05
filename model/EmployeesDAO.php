<?php
    require_once("Employee.php");
    
    class EmployessDAO{
        private $connection = null;

        public function __construct(PDO $connection)
        {
            $this->connection = $connection;    
        }

        public function loadAll(){
            $sql = "select first_name, last_name, email, gender, job_title from employees where id< 10";
            $result = $this->connection->query($sql)->fetchAll((PDO::FETCH_ASSOC));
            return $result;
        }
    }
?>