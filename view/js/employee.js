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
                            var tableElements = null;
                            tableElements = "<table class='employees table table-hover'>";
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
                                            '<button class="delete">' + "<i class='icofont-trash'></i>" + '</button>'   
                                            +' '+'<button class="edit">' + "<i class='edit icofont-edit'></i>" + '</button>'
                                        +'</td>';
                                        tableElements += '</tr>';
                                    }
                                tableElements += '</tbody>';
                            tableElements += "</table>"

                            var content = document.querySelector('#main');
                            content.innerHTML = tableElements;
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
                            .then(alert('User successfully registered'))
                            
                        })
                    } else {
                        alert('Response error');
                        console.log(xhr);
                    }   
                }
            }  
        })   
    }

    registerEmployee();
    loadAll();
})();

/*
var  xhr = new XMLHttpRequest();
var link = '../controllers/insertEmployee.php';
xhr.open('POST', link);
xhr.send(dados);
xhr.onreadystatechange = verifyAjax;

function verifyAjax(){
    if(xhr.readyState === 4){
        if(xhr.status === 200 || xhr.status === 304){ 
            alert('User successfully registered'); 
        }
    }else {
        alert('Response error');
        console.log(xhr);
    }   
}
*/