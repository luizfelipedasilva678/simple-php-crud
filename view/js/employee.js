(function(){    
    function loadAll(){
        var $link = document.querySelector("#ajax");
        $link.addEventListener('click', function(e){
            e.preventDefault();
            var  xhr = new XMLHttpRequest();
            var link = '../controllers/loadAllEmployees.php';
            xhr.open('GET', link);
            xhr.send();
            xhr.onreadystatechange = checkAjax;
            
            function checkAjax(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200 || xhr.status === 304){  
                        try{ 
                            let response = JSON.parse(xhr.response);
                            generateTable(response);
                        }catch(e){
                            console.log('Error:  ' + e.message);
                        }
                        selectEmployee();
                        editEmployee();
                        deleteEmployee();
                    } 
                    else {
                        alert('Response error');
                        console.log(xhr);
                    }   
                }
            }
        })
    }

    function registerEmployee(){
        document.querySelector("#register").addEventListener('click', function(e){
            e.preventDefault();
            var  xhr = new XMLHttpRequest();
            var link = 'employee-register.html';
            xhr.open('GET', link);
            xhr.send();
            xhr.onreadystatechange = checkAjax;

            function checkAjax(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200 || xhr.status === 304){  
                        let content  = document.querySelector('#main');
                        content.innerHTML = xhr.responseText;
                        
                        document.querySelector("#send").addEventListener('click', function(e){
                            e.preventDefault();
                            let employee = {};
                            let firstName = document.querySelector("#firstName").value;
                            let lastName = document.querySelector("#lastName").value;
                            let email = document.querySelector("#email").value;
                            let gender = document.querySelector("#gender").value;
                            let jobTitle = document.querySelector("#jobTitle").value;
                            let dados = new FormData();
                            
                            if(firstName === '' || firstName.length < 3 || lastName === '' || lastName.length < 3){
                                alert("The first and second names cannot be empty or less than three characters");
                            }else{
                                employee.firstName = firstName;
                                employee.lastName = lastName;
                                employee.email = email;
                                employee.gender = gender;
                                employee.jobTitle = jobTitle;
                                dados.append('employee', JSON.stringify(employee));
                                
                                fetch('../controllers/insertEmployee.php', {
                                    method: 'POST',
                                    body: dados
                                })
                                .then(updateTable())
                                .then(alert('User successfully registered'))
                            }

                        })
                    } else {
                        alert('Response error');
                        console.log(xhr);
                    }   
                }
            }  
        })   
    }

    function deleteEmployee(){
        var  buttonsDelete = document.querySelectorAll(".delete");
        Array.prototype.forEach.call(buttonsDelete, elem =>{
            elem.addEventListener('click', function(e){
                let id = {};
                let identification = e.target.id;
                id.id = identification;
                let dados = new FormData();
                dados.append('id', JSON.stringify(id));

                fetch('../controllers/deleteEmployee.php', {
                    method: 'POST',
                    body: dados
                })
                .then(updateTable())
                .then(alert('User successfully deleted'))

            })
        })
    }

    function updateTable(){
        var  xhr = new XMLHttpRequest();
        var link = '../controllers/loadAllEmployees.php';
        xhr.open('GET', link);
        xhr.send();
        xhr.onreadystatechange = checkAjax;
  
        function checkAjax(){
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 304){  
                    try{ 
                        let response = JSON.parse(xhr.response);
                        generateTable(response);
                    }catch(e){
                        console.log('Error:  ' + e.message);
                    }
                    selectEmployee();
                    editEmployee();
                    deleteEmployee();
                } 
                else {
                    alert('Response error');
                    console.log(xhr);
                }   
            }
        }       
    }

    function editEmployee(){
        let editButtons = document.querySelectorAll('.edit');
        let main =  document.querySelector('#main');
        
        Array.prototype.forEach.call(editButtons, elem =>{
            elem.addEventListener('click', function(e){   
                e.preventDefault();   
                var identification = e.target.id;
                let  xhr = new XMLHttpRequest();
                let link = 'edit-employee.html';
                xhr.open('GET', link);
                xhr.send();
                xhr.onreadystatechange = checkAjax;

                function checkAjax(){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200 || xhr.status === 304){ 
                            main.innerHTML = xhr.responseText;
                            selectEmployee();
                            document.querySelector("#send").addEventListener('click', function(e){
                                e.preventDefault();
                                let employee = {};
                                let id = {};
                                let firstName = document.querySelector("#firstName").value;
                                let lastName = document.querySelector("#lastName").value;
                                let email = document.querySelector("#email").value;
                                let gender = document.querySelector("#gender").value;
                                let jobTitle = document.querySelector("#jobTitle").value;
                                let dados = new FormData();
                                
                                if(firstName === '' || firstName.length < 3 || lastName === '' || lastName.length < 3){
                                    alert("The first and second names cannot be empty or less than three characters");
                                }else{
                                    id.id = identification;
                                    employee.firstName = firstName;
                                    employee.lastName = lastName;
                                    employee.email = email;
                                    employee.gender = gender;
                                    employee.jobTitle = jobTitle;
                                    dados.append('employee', JSON.stringify(employee));
                                    dados.append('id', JSON.stringify(id));
                                    
                                    fetch('../controllers/editEmployee.php', {
                                        method: 'POST',
                                        body: dados
                                    })
                                    .then(updateTable())
                                    .then(alert('User successfully updated'))
                                }
                            })
                        } else {
                            alert('Response error');
                            console.log(xhr);
                        }   
                    }
                }  
            })
        })
    }

    function selectEmployee(){
        let editButtons = document.querySelectorAll('.edit');
        let dados = new FormData();

        Array.prototype.forEach.call(editButtons, elem =>{   
            elem.addEventListener('click', function(e){
                var  xhr = new XMLHttpRequest();
                var link = '../controllers/selectEmployee.php';
                let identification = e.target.id;
                let id = {};
                id.id = identification;
                dados.append('id', JSON.stringify(id))

                xhr.open('POST', link);
                xhr.send(dados);
                xhr.onreadystatechange = checkAjax;
                  
                function checkAjax(){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200 || xhr.status === 304){  
                            try{ 
                                let response = JSON.parse(xhr.response);
                                document.querySelector('#firstName').value = response[0].first_name;
                                document.querySelector('#lastName').value = response[0].last_name;
                                document.querySelector('#jobTitle').value = response[0].job_title;
                                document.querySelector('#gender').value = response[0].gender;
                                document.querySelector('#email').value = response[0].email;
                            }catch(e){
                                console.log('Error:  ' + e.message);
                            }
                        } 
                        else {
                            alert('Response error');
                            console.log(xhr);
                        }   
                    }
                }
            })
        })
    }

    function info(){
        fetch('info.html')
        .then(resp => resp.text())
        .then(resp => document.querySelector('#main').innerHTML = resp);
        document.querySelector("#info").addEventListener('click', function(e){
            fetch('info.html')
            .then(resp => resp.text())
            .then(resp => document.querySelector('#main').innerHTML = resp);
        })
    }

    function clock(){
        var myVar = setInterval(myTimer ,1000);
        function myTimer() {
            var d = new Date(), displayDate;
                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    displayDate = d.toLocaleTimeString('pt-BR');
                } else {
                    displayDate = d.toLocaleTimeString('pt-BR', {timeZone: 'America/Belem'});
                }
            document.querySelector(".clock").innerHTML = displayDate;
         }
    }

    function generateTable(response){
        tableElements = '<table id="mytable" class="employees table table-hover">';
            tableElements +=
                "<thead class='thead-dark'>"+ 
                    '<tr>'+ 
                        '<th>' + "Id" + '</th>'+
                        '<th>' + "First Name" + '</th>'+
                        '<th>' + "Last Name" + '</th>'+
                        '<th>' + "Email" + '</th>'+
                        '<th>' + "Gender" + '</th>'+
                        '<th>' + "Job Title" + '</th>'+ 
                        '<th>' + "Options" + '</th>'+ 
                    '</tr>' +
                "</thead>";

            tableElements += '<tbody>';
                for(let i = 0; i < response.length; i++){
                    tableElements += '<tr>';
                        tableElements +=  '<td>'+ response[i].id + '</td>';
                        tableElements +=  '<td>'+ response[i].first_name + '</td>';
                        tableElements +=  '<td>'+ response[i].last_name + '</td>';
                        tableElements +=  '<td>'+ response[i].email + '</td>';
                        tableElements +=  '<td>'+ response[i].gender + '</td>';
                        tableElements +=  '<td>'+ response[i].job_title + '</td>';
                        tableElements +=  
                        '<td>'+ 
                            `<i id="${response[i].id}" class='delete icofont-trash'></i>`+' '+  
                            `<i id="${response[i].id}" class='edit_id edit icofont-edit'></i>`
                        +'</td>';
                    tableElements += '</tr>';
                }
            tableElements += '</tbody>';
        tableElements += "</table>"
        var content = document.querySelector('#main');
        content.innerHTML = tableElements;
        $(document).ready( function () {
            $('#myTable').DataTable();
        } );
    }

    clock();
    info();
    registerEmployee();
    loadAll();
})();

