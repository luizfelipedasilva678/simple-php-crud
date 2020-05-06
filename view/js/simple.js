document.querySelector('#menu').addEventListener('click', function(e){
    
    navigation = document.querySelector('nav').classList.toggle('change-nav');
    navigation2 = document.querySelector('nav');
    body = document.querySelector('body');

    if(navigation2.classList.contains('change-nav')){
        body.style.gridTemplateAreas =' "header header" "main main" "main main" "footer footer" ';
    }else{
        body.style.gridTemplateAreas =' "header header" "navigation main" "navigation main" "navigation footer" ';
    }
})