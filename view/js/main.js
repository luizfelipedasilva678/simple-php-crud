(function(){
    var qtd = 10;
    var $link = document.querySelector("#ajax");
    $link.addEventListener('click', function(e){
        e.preventDefault();
        var  xhr = new XMLHttpRequest();
        var link = '../controllers/loadAllEmployees.php';
        xhr.open('GET', link);
        xhr.send();
        xhr.onreadystatechange = verificaAjax;
        
        function verificaAjax(){
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 304){  
                    try{
                        
                        let response = JSON.parse(xhr.response);
                        var tableElements = null;
                        tableElements = "<table class='table table-hover'>";
                            tableElements +=
                            "<thead class='thead-dark'>"+ 
                                '<tr>'+ 
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

                        var content = document.querySelector('main');
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
})();


