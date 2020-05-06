<?php
    require_once("Employee.php");
    require_once("CrudException.php");

    class EmployessDAO{
        private $connection = null;
        private $stmt = null;
        private $sql = null;

        public function __construct(PDO $connection)
        {
            $this->connection = $connection;    
        }
        
        public function loadAll(int $qtd){
            try{
                $quantity = $qtd;
                $this->sql = "select first_name, last_name, email, gender, job_title from employees where id<:qtd";
                $this->stmt = $this->connection->prepare($this->sql);
                $this->stmt->bindValue(":qtd", $quantity);
                $this->stmt->execute();
                $result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }catch(PDOException $e){
                throw new CrudException("Error CrudException: " . $e->getMessage()); 
            }
        }


    }
?>