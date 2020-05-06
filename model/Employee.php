<?php
    declare(strict_types=1);
    class Employee{

        private $firstName;
        private $lastName;
        private $email;
        private $gender;
        private $jobTitle;

        public function __construct(array $employee = null)
        {
            $this->firstName = $employee['firstName'];
            $this->lastName = $employee['lastName'];
            $this->email = $employee['email'];
            $this->jobTitle = $employee['jobTitle'];
            $this->gender = $employee['gender'];
        }

        /* setters */
        public function setFirstName(string $firstName){
            if(strlen($firstName) > 3){
                $this->firstName = $firstName;
            }
        }

        public function setLastName(string $lastName){
            if(strlen($lastName) > 3){
                $this->lastName = $lastName;
            }
        }

        public function setEmail(string $email){
            if(strlen($email) > 3){
                $this->email = $email;
            }
        }

        public function setGender(string $gender){
            if(strtoupper($gender) == 'MALE' || strtoupper($gender) == 'FEMALE'){
                $this->gender = $gender;
            }
        }

        public function setJobTitle(string $jobTitle){
            if(strlen($jobTitle) > 5){
                $this->jobTitle = $jobTitle;
            }
        }

        /* getters */
        public function getFirstName():string{
            return $this->firstName;
        }

        public function getLastName():string{
            return $this->lastName;
        }

        public function getJobTitle():string{
            return $this->jobTitle;
        }

        public function getEmail():string{
            return $this->email;
        }

        public function getGender():string{
            return $this->gender;
        }
    }
?>