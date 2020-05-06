<?php
    declare(strict_types=1);
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
                $this->sql = "select id,first_name, last_name, email, gender, job_title from employees where id>1000";
                $this->stmt = $this->connection->prepare($this->sql);
                $this->stmt->bindParam(":qtd", $quantity);
                $this->stmt->execute();
                $result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }catch(PDOException $e){
                throw new CrudException("Error CrudException: " . $e->getMessage()); 
            }
        }

        public function insertEmployee(Employee $employee){
            try{
                $this->sql = "INSERT INTO employees (id,first_name,last_name,email,gender,job_title) VALUES (null,?,?,?,?,?)";
                $this->stmt = $this->connection->prepare($this->sql);
                $this->stmt->bindValue(1, $employee->getFirstName());
                $this->stmt->bindValue(2, $employee->getLastName());
                $this->stmt->bindValue(3, $employee->getEmail());
                $this->stmt->bindValue(4, $employee->getGender());
                $this->stmt->bindValue(5, $employee->getJobTitle());
                $this->stmt->execute();
            }catch(PDOException $e){
                throw new CrudException("Error CrudException: " . $e->getMessage());
            }
        }


    }
?>