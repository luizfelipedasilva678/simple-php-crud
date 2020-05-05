<?php
    declare(strict_types=1); 
    class ConnectionSingleton{
        
        private static $instance = null;
        private $connection = null;

        public function __construct(){
            $host = 'localhost';
            $password = '';
            $user = 'root';
            $database = 'store';
            $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
            
            try{
                $this->connection = new PDO("mysql:host={$host};dbname={$database}",$user,$password,$options);
            }catch(PDOException $e){
                echo $e->getMessage();
                die("Connection error: ".$e->getMessage());
            }
        }

        public static function getInstace():ConnectionSingleton{
            if(!isset(self::$instance))
				self::$instance = new ConnectionSingleton();
			return self::$instance;
        }

        public function getPDOConnection():PDO{
            return $this->connection;
        }
    }
?>