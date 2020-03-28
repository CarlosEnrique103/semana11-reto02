
let day_title= document.querySelector('.section_day_header');
let section_complete=document.querySelector('.section_complete');
let add_btn= document.querySelector('.add_btn');
let tasks= document.querySelector('.item_tasks')
let image_back=document.querySelector('.image_back');
let add_task_form= document.querySelector('.add_task_form');
let btn_submit= document.querySelector('.btn_submit');
let btn_reset= document.querySelector('.btn_reset');
let date=new Date();
let btn_complete=document.querySelector('.btn_complete');
let btn_incomplete= document.querySelector('.btn_incomplete');


//TAREAS COMPLETADAS
btn_complete.addEventListener('click', function(){
        btn_complete.classList.add('active');
        btn_incomplete.classList.remove('active')
        day_title.parentElement.style.display="none";
        section_complete.style.visibility="visible";
        console.log(section_complete.querySelector('.item_tasks').childNodes.length);
 
})
//TAREAS INCOMPLETAS
btn_incomplete.addEventListener('click', function(){
        btn_complete.classList.remove('active');
        btn_incomplete.classList.add('active')
        day_title.parentElement.style.display="block";
        section_complete.style.visibility="hidden";
        if(tasks.childNodes.length<=1){
            image_back.style.display="block";
        }  
})


//INSERTANDO FECHA ACTUAL
let stringDates= date.toDateString().split(' ');
let day ='';
switch(date.getDay()){
    case 1:
        day='Lunes';
        break;
    case 2:
        day='Martes';
        break;
    case 3:
        day='Miércole';
        break;
    case 4:
        day='Jueves';
        break;
     case 5:
        day='Viernes';
        break;
    case 6:
        day='Sábado';
        break;
     case 7:
        day='Domingo';
        break;


}
console.log(stringDates)
day_title.querySelector('small').innerText=`${day.toLowerCase()} ${date.getDate()}, ${date.getFullYear()}`;

//AGREGANDO FOMRULARIO
add_btn.addEventListener('click',function(e){
    this.style.visibility="hidden";
    image_back.style.display="none";
    add_task_form.style.display="block";
});

//ACTIVAR EL BOTON CON EL INPUT 
add_task_form.querySelector('input[name=task]')
.addEventListener('focus',function(e){
    e.preventDefault();
    btn_submit.style.backgroundColor="#db4c3f";
    this.style.color='#000'

})


//BUTTON PARA ENVIAR LOS VALORES
btn_submit.addEventListener('mouseover',function(){
    this.style.backgroundColor="#bb3c30";
})
btn_submit.addEventListener('mouseout',function(){
    this.style.backgroundColor="#db4c3f";
})

btn_submit.addEventListener('click',function(e){
    e.preventDefault();
    let task = document.createElement("li");
    task.innerHTML=`
        <div class="item_task">
             <div>
            <i class="fa fa-circle-o"></i><a >${add_task_form.querySelector('input[name=task]').value}</a>
           </div>
           <div>
            <i class="fa fa-trash-o"></i>
            </div>
        </div>
    `
    let taskNew= document.createElement("li");
    taskNew.innerHTML=`
        <div class="item_task">
             <div>
            <i style="color: #5594DD;"class="fa fa-check-circle-o"></i><a >${add_task_form.querySelector('input[name=task]').value}</a>
           </div>
        </div>
    `
    if(add_task_form.querySelector('input[name=task]').value){
        tasks.appendChild(task);
        add_task_form.querySelector('input[name=task]').value="";
        task.querySelector('.fa-circle-o').addEventListener('click',function(){
            this.classList.remove('fa-circle-o')
            this.classList.add('fa-check-circle-o');
            this.style.color="#5594DD";
            task.style.textDecoration="line-through";
            setTimeout(function(){
                section_complete.querySelector('.item_tasks').appendChild(taskNew);
                tasks.removeChild(task);
            },1000)
        });
        task.querySelector('.fa-trash-o').addEventListener('click',function(){
            let color=this.style.color;
            if(confirm("Estas seguro de eliminar la tarea.")){
                this.style.color="#db4c3f";
                setTimeout(function(){
                    tasks.removeChild(task);
                 },700)
            }else{
                this.style.color=color;
            }
            
        });
    }
})

 


btn_reset.addEventListener('click',function(){
    add_task_form.style.display="none";

    if(tasks.childNodes.length<=1){
      image_back.style.display="block";
    }
    add_btn.style.visibility="visible"
})