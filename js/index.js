let empleados = ["Miguel Angel","Miguel Salazar","Jose Jimenez","Alan Mazario","Ricardo Alonzo","Vicente Hernandez","Eduardo Herrera","Orlando Belmontes","Cristian Zaragosa","Edgar Perez","Edson Gonzales","Javier Gtz","Juan Perez","Patricia Sinnahi","Ricardo Alonzo","Marcos Rodriguez"];
let herramientas =["Escalera de extension","Metricas","Pala","Martillo","Elotromartillo","Cincel","Matraca","Caja de Herramientas"]
let actividades ={
        "LLaves y Dados":["LLave Mixta","LLave española","LLave Allen","LLave perica","LLave Stilson"],
        "Pinzas y Sujecion": ["Pinzas de electrisista","Pinzas de presion","Pinza de Etension","Pinza Mecanica","Pinza Checadora"],
        "Desarmadores":["Desarmador plano","Desarmador philphs","Desarmador de torque","Desarmador de caja"]
    };
let empleados_seleccionados = [];
let cont = 0;
let cont_herramientas = 0;
let contenido_copiado =[];
let condicion = 0;
let card = 0;
let guardar_elementos = "";
let start_carrusel = 0;
let elements_carrusel_pos = [];
$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});
let copy = null;
let empleados_select = document.getElementById("empleados");
let herramientas_select = document.getElementById("herramientas");
let empleados_herramientas_select = document.getElementById("Contenido_Union");
let activadades_select = document.getElementById("actividades");
for(let i in actividades){
    let option = document.createElement("option");
    option.textContent= i;
    option.value = i; 
    activadades_select.appendChild(option);
}

empleados.forEach(element => {
    let option = document.createElement("option");
    option.textContent= element;
    option.value = element;
    empleados_select.appendChild(option);
});
herramientas.forEach(element => {
    let option = document.createElement("option");
    option.textContent= element;
    option.value = element; 
    herramientas_select.appendChild(option);
});

$('#empleados').on('select2:select', function (e) {
    let data = e.params.data.text;
    let p = document.createElement("p");
    p.id = cont;
    let div_button_copy = document.createElement("div");
    let button_copy = document.createElement("button");
    button_copy.id = "copy"+ cont;
    button_copy.classList.add(["button_copy"]);
    button_copy.innerHTML=`<svg data-id =${cont} onclick="copy_list(this)" xmlns="http://www.w3.org/2000/svg" width="210" height="20" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
  </svg>`;
    div_button_copy.appendChild(button_copy);
    let div = document.createElement("div");
    p.textContent = data;
    div.appendChild(div_button_copy);
    div.appendChild(p);
    div.id = cont;
    let div_herramientas = document.createElement("div")
    div_herramientas.id = "div_herramientas"+cont;
    let ul = document.createElement("ul");
    ul.id = "lista" + cont;
    div_herramientas.appendChild(ul);
    div.appendChild(div_herramientas);   
    empleados_herramientas_select.appendChild(div);
     let empleados_disponibles = $("#empleados").val();
     empleados_disponibles =String(empleados_disponibles);
    empleados_seleccionados = empleados_disponibles.split(",");
    cont ++;
});
$('#empleados').on('select2:unselect', function (e) {
    let data = e.params.data.text;
    let foo = document.querySelectorAll('.Contenido_Union > div > p');
    let divs = document.querySelectorAll('.Contenido_Union > div');
    empleados_seleccionados.pop(data);

    for (let i = 0; i < foo.length; i++) {
        if(foo[i].textContent == data)
        {
            let div_eliminado = document.getElementById(foo[i].id);
            $(div_eliminado).remove();            
        }
      }
});

$('#actividades').on('select2:select', function (e) {
    let contenido_actividad = null;
    let data = e.params.data.text;
    let foo = document.querySelectorAll('.Contenido_Union > div > p');
    for (let i = 0; i < foo.length; i++) {
        empleados_seleccionados.forEach((e)=> {
            if(foo[i].textContent == e && foo[i].parentNode.classList.contains('card') || foo[i].textContent == e &&  foo[i].parentNode.classList.contains('card_unselect_carrusel'))
            {
                
                let lista = document.getElementById("lista"+foo[i].id);
                let li = document.createElement("li");
                let input = document.createElement("input");
                input.type ="text";
                input.id ="input"+ cont_herramientas;
                input.setAttribute("onkeypress","return (event.charCode >= 48 && event.charCode <= 57)");
                let div_text= document.createElement("div");
                let div_button= document.createElement("div");
                let div_input = document.createElement("div");
                li.style.width= "100%";
                div_text.style.display ="inline-block";
                div_input.style.display ="inline-block";

                div_input.style.width= "20%";
                div_text.style.width= "60%";
                div_button.style.width= "20%";

                div_button.style.display ="inline-block";
                let button = document.createElement("button");
                button.innerHTML=`<svg onclick="remove_item(this)" data-id=${cont_herramientas}  class="button_trash" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>`;
              
                button.style.background ="red";
                button.style.marginLeft ="1em";
                button.style.border = "none";
                div_input.appendChild(input);
                div_text.textContent = data;
                div_text.classList.add(["text"]);
                div_text.id =cont_herramientas;
                li.id="list"+ cont_herramientas;
                let div_actividad = document.createElement("div");
                div_actividad.classList.add(["div_actividad"]);
                for(let i in actividades){
                        if(i == data){
                            let d = document.createElement("div");
                            d.textContent= data;
                            d.style.textAlign="center";
                            d.style.fontSize="medium";
                            d.style.background ="#ff00d4";
                            d.style.fontWeight="600";
                            div_actividad.appendChild(d);
                            
                            contenido_actividad =actividades[`${i}`];
                            contenido_actividad =String(contenido_actividad);
                            contenido_actividad = contenido_actividad.split(",");    
                        }
                }
                contenido_actividad.forEach((e)=>{
                    let d = document.createElement("div");
                    d.textContent= e;
                    div_actividad.appendChild(d);
                });

                li.classList.add(["div_list"]);
                li.style.background= "#000";
                li.style.color = "#fff";
                div_button.appendChild(button);
                li.appendChild(div_input);
                li.appendChild(div_text);
                li.appendChild(div_button);
                li.appendChild(div_actividad);

                lista.appendChild(li);
                cont_herramientas++;
            }
        });
      }

    
});

$('#actividades').on('select2:unselect', function (e) {
    let data = e.params.data.text;
    let foo = document.querySelectorAll('.Contenido_Union > div > div> ul>li>.text');
    for (let i = 0; i < foo.length; i++) {
        if(foo[i].textContent == data && foo[i].parentNode.parentNode.parentNode.parentNode.classList.contains('card') || foo[i].textContent == data && foo[i].parentNode.parentNode.parentNode.parentNode.classList.contains('card_unselect_carrusel'))
        {
            let div_eliminado = document.getElementById("list"+foo[i].id);
            $(div_eliminado).remove();       
        }
    }

});
$('#herramientas').on('select2:select', function (e) {
    let data = e.params.data.text;
    let foo = document.querySelectorAll('.Contenido_Union > div > p');
    for (let i = 0; i < foo.length; i++) {
        empleados_seleccionados.forEach((e)=> {
            if(foo[i].textContent == e && foo[i].parentNode.classList.contains('card') || foo[i].textContent == e &&  foo[i].parentNode.classList.contains('card_unselect_carrusel') )
            {
                
                let lista = document.getElementById("lista"+foo[i].id);
                let li = document.createElement("li");
                let input = document.createElement("input");
                input.type ="text";
                input.id ="input"+ cont_herramientas;
                input.setAttribute("onkeypress","return (event.charCode >= 48 && event.charCode <= 57)");
                let div_text= document.createElement("div");
                let div_button= document.createElement("div");
                let div_input = document.createElement("div");
                li.style.width= "100%";
                div_text.style.display ="inline-block";
                div_input.style.display ="inline-block";

                div_input.style.width= "20%";
                div_text.style.width= "60%";
                div_button.style.width= "20%";

                div_button.style.display ="inline-block";
                let button = document.createElement("button");
                button.innerHTML=`<svg onclick="remove_item(this)" data-id=${cont_herramientas}  class="button_trash" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>`;
              
                button.style.background ="red";
                button.style.marginLeft ="1em";
                button.style.border = "none";
                div_input.appendChild(input);
                div_text.textContent = data;
                div_text.classList.add(["text"]);
                div_text.id =cont_herramientas;
                li.id="list"+ cont_herramientas;
                div_button.appendChild(button);
                li.appendChild(div_input);
                li.appendChild(div_text);
                li.appendChild(div_button);

                lista.appendChild(li);
                cont_herramientas++;
            }
        });
      }

    
});
$('#herramientas').on('select2:unselect', function (e) {
    let data = e.params.data.text;
    let foo = document.querySelectorAll('.Contenido_Union > div > div> ul>li>.text');
    for (let i = 0; i < foo.length; i++) {
        if(foo[i].textContent == data && foo[i].parentNode.parentNode.parentNode.parentNode.classList.contains('card') || foo[i].textContent == data && foo[i].parentNode.parentNode.parentNode.parentNode.classList.contains('card_unselect_carrusel'))
        {
            let div_eliminado = document.getElementById("list"+foo[i].id);
            $(div_eliminado).remove();       
        }
    }

});

async function remove_item(e){
    let div_eliminado = document.getElementById("list"+e.getAttribute('data-id'));
    $(div_eliminado).remove();   
}

let enviar = document.getElementById("enviar_peticiones");
enviar.addEventListener("click",(e)=>{
    empleados_seleccionados = [];
    elements_carrusel_pos = [];
    start_carrusel = 0;
    $("#empleados").val('').trigger('change')
    $("#herramientas").val('').trigger('change')
    $("#actividades").val('').trigger('change')

    empleados_herramientas_select.innerHTML = "";
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      
      Toast.fire({
        icon: 'success',
        title: 'Se han enviado las solicitudes'
      })
});

async function copy_list(e){
let buttons = document.querySelectorAll(".Contenido_Union > div > div> button");
copy = document.querySelectorAll(`#lista${e.getAttribute('data-id')}>li`);

if (condicion == 0) {
    contenido_copiado=[];
    for (let i = 0; i < copy.length; i++) {
        let cantidad = copy[i].id.replace(/[^0-9]+/g, ""); // esto retorna '1234'
        cantidad = document.getElementById("input"+ cantidad).value;
        contenido_copiado.push({cantidad:cantidad,herramienta:copy[i].textContent.trim()});
}
for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id != "copy"+e.getAttribute('data-id')) {
            buttons[i].classList.remove(["button_copy"]);
            buttons[i].classList.add(["button_paste"]);

        }

}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  
Toast.fire({
    icon: 'success',
    title: 'Contenido Copiado'
  })
condicion =1;
}
else if (condicion == 1) {
    for (let i = 0; i < buttons.length; i++) {

            buttons[i].classList.add(["button_copy"]);
            buttons[i].classList.remove(["button_paste"]);
        
        
        }
    let lista = document.getElementById("lista"+e.getAttribute('data-id'));
    contenido_copiado.forEach((element)=>{
        let li = document.createElement("li");
        li.style.width= "100%";
        li.id="list"+ cont_herramientas;
        let div_text= document.createElement("div");
        let div_button= document.createElement("div");
        div_text.style.display ="inline-block";
                div_text.style.width= "80%";
                div_button.style.width= "20%";
                div_button.style.display ="inline-block";
                let button = document.createElement("button");
                button.innerHTML=`<svg onclick="remove_item(this)" data-id=${cont_herramientas}  class="button_trash" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>`;
              let input = document.createElement("input");
              input.type ="text";
              input.id ="input"+ cont_herramientas;   
              input.value = element.cantidad;
              input.setAttribute("onkeypress","return (event.charCode >= 48 && event.charCode <= 57)");

              let div_input = document.createElement("div");
              div_text.style.display ="inline-block";
              div_input.style.display ="inline-block";  
                button.style.background ="red";
                button.style.marginLeft ="1em";
                button.style.border = "none";
                div_text.textContent = element.herramienta;
                div_text.classList.add(["text"]);
                div_text.id =cont_herramientas;
                li.id="list"+ cont_herramientas;
                div_input.style.width= "20%";
                div_text.style.width= "60%";
                div_button.style.width= "20%";  
                div_button.appendChild(button);
                div_input.appendChild(input);
                li.appendChild(div_input);

                li.appendChild(div_text);
                li.appendChild(div_button);

                lista.appendChild(li);
                cont_herramientas ++;
                condicion =0;
    })
}
}
let cont_filtro = 0;
let searchs__ids_filters= [];
let searchs__ids_actuales = [];
let search = document.getElementById("search");
let p = document.createElement("p");
p.classList.add("Sin_filtros");
empleados_herramientas_select.appendChild(p);
search.addEventListener("input",(e)=>{
   

    let foo = document.querySelectorAll('.Contenido_Union > div > p');
    if(search.value==""){
        p.innerHTML = "";
        cont_filtro = 1;
        for (let i = 0; i < searchs__ids_actuales.length; i++) {
                if (document.getElementById(searchs__ids_actuales[i]).classList.contains('card_unselect_carrusel'))
                 {
                    document.getElementById(searchs__ids_actuales[i]).classList.remove("card_unselect_carrusel");

                    document.getElementById(searchs__ids_actuales[i]).classList.add('card');
   
                 }
            
               
            }
            
            for (let i = 0; i < searchs__ids_filters.length; i++) {
                
                document.getElementById(searchs__ids_filters[i]).classList.remove("card");
                document.getElementById(searchs__ids_filters[i]).classList.add("card_unselect_carrusel");
                
            }
            searchs__ids_filters = [];
            searchs__ids_actuales = [];
    }
    if(search.value!=""){
        cont_filtro = 0;
        for (let i = 0; i < foo.length; i++) {
        let pasa = 1;        
            for (let d = 0; d <search.value.length; d++) {

                if (foo[i].textContent[d].toUpperCase().includes(search.value[d].toUpperCase())) {

                }else{ 
                    pasa = 0;
                }
            }
            if (foo[i].parentNode.classList.contains('card')){
                searchs__ids_actuales.push(foo[i].id);
            }
            if(pasa==0){
                foo[i].parentNode.classList.remove("card");
                if (!foo[i].parentNode.classList.contains('card_unselect_carrusel')){
                foo[i].parentNode.classList.add("card_unselect_carrusel");}
            }
            else{
                if (foo[i].parentNode.classList.contains('card_unselect_carrusel')){
                    foo[i].parentNode.classList.remove("card_unselect_carrusel");
                    foo[i].parentNode.classList.add("card");
                    searchs__ids_filters.push(foo[i].id);

                }
               
                cont_filtro =1;
            }
           
        }
     
    }
    if (cont_filtro == 0) {
        p.innerHTML = "No se encontraron resultados";

    }
});
let cont_move_right = 0;
let button_left = document.getElementById("button_left");
let button_right = document.getElementById("button_right");
empleados_herramientas_select.addEventListener("DOMSubtreeModified",(e)=>{
    let foo = document.querySelectorAll('.Contenido_Union > div');
    
    
    if (elements_carrusel_pos.length==0)
        {cont_move_right = 0;}
    for (let i = 0; i < foo.length; i++) {
        if (i<=3 && elements_carrusel_pos.length == 0) {
            if (foo[i].classList.contains("card_unselect_carrusel")) {
                foo[i].classList.remove(["card_unselect_carrusel"]);                
            }
            foo[i].classList.add(["card"]);

        }
        else {
            if (foo[i].classList.contains("card_unselect_carrusel")) {
                foo[i].classList.remove(["card_unselect_carrusel"]);                
            }
            foo[i].classList.add(["card_unselect_carrusel"]);

        }
    }
    if (elements_carrusel_pos.length>=3) {
        for (let d = 0; d < elements_carrusel_pos.length; d++) {
            if (document.getElementById(elements_carrusel_pos[d])) {
                if (document.getElementById(elements_carrusel_pos[d]).classList.contains("card_unselect_carrusel")) {
                    document.getElementById(elements_carrusel_pos[d]).classList.remove(["card_unselect_carrusel"]);                
                }
                document.getElementById(elements_carrusel_pos[d]).classList.add(["card"]);
            }
                
            
          
        }
}
if (foo.length>=1 && foo.length<=4) {
    cont_move_right = 0;
    for (let i = 0; i < foo.length; i++) {
        foo[i].classList.add("card");
        if (foo[i].classList.contains("card_unselect_carrusel")) {
            foo[i].classList.remove("card_unselect_carrusel");
        }
    }
}


if (foo.length>4) {
    if (foo.length-4 <= cont_move_right)  {
        cont_move_right -=4;
        click_event = new CustomEvent('click');
        btn_element = document.querySelector('#button_left');
        btn_element.dispatchEvent(click_event);

    }
    
    else{
        let posicion_carrusel = foo.length;
        if (foo.length % 4 != 0){
            while (posicion_carrusel % 4 != 0) {
                posicion_carrusel --;
                console.log(posicion_carrusel);
            }
        }

        for (let d = posicion_carrusel-4; d < posicion_carrusel; d++) {
            document.getElementById(d).classList.remove("card_unselect_carrusel");
            document.getElementById(d).classList.add("card");
            
        }
    }
//     if (foo.length % 4 == 0) {
//         if (!document.getElementById(foo.length).classList.contains("card")) {
//             cont_move_right = foo.length;
//             for (let i = foo.length-4; i < foo.length; i++) {
            
//                 foo[i].classList.add("card");
//                 if (foo[i].classList.contains("card_unselect_carrusel")) {
//                     foo[i].classList.remove("card_unselect_carrusel");
//                 }
//             }      
//         }
      
//  }

}

});

button_left.addEventListener("click",(e)=>{
    let foo = document.querySelectorAll('.Contenido_Union > div');
  
    
    if (cont_move_right<=foo.length-5) {
        cont_move_right +=4;        
    }
    else
    {
        return
    }
    if (foo.length> cont_move_right-1) {
        let cont = 0;
        for (let i = 0; i < foo.length; i++) {

            if (i>=cont_move_right && cont<4) {
                cont ++;
                if (foo[i].classList.contains("card_unselect_carrusel")) {
                    foo[i].classList.remove(["card_unselect_carrusel"]);                
                }
                foo[i].classList.add(["card"]);
                if (elements_carrusel_pos.length<4) {
                    elements_carrusel_pos.push(foo[i].id);
                }
            }
            else{
                foo[i].classList.remove(["card"]);                
                foo[i].classList.add(["card_unselect_carrusel"]);
    
            }
           
         
        
           
        }
    } 
   
});
button_right.addEventListener("click",(e)=>{
    cont_move_right -= 4;
    if (cont_move_right <=-2) {
      return  cont_move_right = 0;
    }
    let array_elements_ids = [];
    let array_elements_ids_actuales = [];
    let cont = 0;
    let foo = document.querySelectorAll('.Contenido_Union > div');
    if (foo.length> 4 ) {
        for (let i = 0; i < foo.length; i++) {

            if (foo[i].classList.contains("card")) {

                array_elements_ids_actuales.push(foo[i].id);
                    if (cont == 0) {
                        let previos1 = foo[i].previousElementSibling.id;
                        let previos2 =  foo[i].previousElementSibling.previousElementSibling.id;
                        let previos3 =  foo[i].previousElementSibling.previousElementSibling.previousElementSibling.id;
                        let previos4 =  foo[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;
                        array_elements_ids.push(previos1,previos2,previos3,previos4);
                        cont= 1;
                    }
            }
            
        }
    }
    for (let i = 0; i < array_elements_ids_actuales.length; i++) {
        document.getElementById(array_elements_ids_actuales[i]).classList.remove(["card"]); 
        document.getElementById(array_elements_ids_actuales[i]).classList.add(["card_unselect_carrusel"]); 

    }
    for (let i = 0; i < array_elements_ids.length; i++) {
        document.getElementById(array_elements_ids[i]).classList.add(["card"]); 
        document.getElementById(array_elements_ids[i]).classList.remove(["card_unselect_carrusel"]); 
        
    }
 


});