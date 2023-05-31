const url_b="http://localhost:8082/ofud/api/v1";

const tabButtons = document.querySelectorAll('.tab-button');
const tabContentPanes = document.querySelectorAll('.tab-content .tab-pane, .tab-pane2');

async function tabButtonsFunction(){
    let vali = await validacion_Calendario();
    let vali2= await validacion_seleccion();
    let vali3=true;
    let vali4=true;
    for( const button of tabButtons) {
        if(button.classList.contains("calendario")){
            if(!vali){
                button.addEventListener('click', () => {
                    alert('pestaña inhabilitada');
                 });
            }else{
                cambiar_boton(button);
            }
        }
        if(button.classList.contains("seleccion")){
            if(!vali2){
                button.addEventListener('click', () => {
                    alert('pestaña inhabilitada');
                 });      
            }else{
                cambiar_boton(button);
            }
        }
        if(button.classList.contains("asistencia")){
            if(!vali3){
                button.addEventListener('click', () => {
                    alert('pestaña inhabilitada');
                 });    
            }else{
                cambiar_boton(button);
            }
        }
        if(button.classList.contains("liquidacion")){
            button.addEventListener('click', () => {
                alert('pestaña inhabilitada');
             });    
            if(!vali4){
                
            }else{
                cambiar_boton(button);
            }
        }
    }
}

function cambiar_boton(button){
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        tabContentPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        button.classList.add('active');
        document.querySelector(`.tab-content .tab-pane[data-tab="${targetTab}"]`).classList.add('active');
    });

}
/*Validar calendario*/ 
async function validacion_Calendario(){
    var estado
    url = url_b+'/calendarios/validar';
    await fetch (url).then(response=>response.json())
    .then(data=>{
        estado=data.state;
    }).catch(error => {
        console.log('Error en la solicitud:', error);
    });
    return estado;
}
/*Validar seleccion*/
async function validacion_seleccion(){
    var estado
    url = url_b+'/calendarios/estadoplaneacion';
    await fetch (url).then(response=>response.json())
    .then(data=>{
        estado=data.state;
    }).catch(error => {
        console.log('Error en la solicitud:', error);
    });
    return estado;
}
/*Validar asistencia*/
async function validacion_asistencia(){
    var estado
    url = url_b+'/calendarios/estadoplaneacion';
    await fetch (url).then(response=>response.json())
    .then(data=>{
        estado=data.state;
    }).catch(error => {
        console.log('Error en la solicitud:', error);
    });
    return estado;
}


/*Pone inactivo el calendaro*/
function peticion_terminar(id) {
    console.log(id);
    url = url_b`/calendarios/terminar?${id}`;
    console.log(url);
    fetch(url, {
        method: 'PUT'
    }).then(response => {
        if (response.ok) {
            console.log('Request completado exitosamente.');
        } else {
            console.log('Error en la solicitud.');
        }
    })
        .catch(error => {
            console.log('Error en la solicitud:', error);
        });
}
/*Lista Calendarios*/
const listCalendarios = () => {
    url = url_b+'/calendarios/';
    fetch(url).then(response => response.json())
        .then(data => {
            let content = "";
            data.forEach((calendario) => {

                content +=
                    `<tr>
                    <td>${calendario.titulo}</td>
                    <td>${calendario.tipoCal}</td>
                    <td>${calendario.fechaInicio}</td>
                    <td>${calendario.fechaFin}</td>
                    <td>${calendario.estado}</td>
                    <td><button id='consec=${calendario.consec}&idObra=${calendario.idObra}&idTipo=${calendario.idTipoCal}' class="Boton_terminar" onclick=>Terminar</button></td>
                    </tr>`
            });

            Cuerpo_calendario.innerHTML = content;
            const Boton_Terminar = document.querySelectorAll('.Boton_terminar');

            Boton_Terminar.forEach(button=>{
                var id = button.id;
                button.addEventListener('click', () => {
                    peticion_terminar(id)
                })
            });            
        })
}
/*Lista Selección*/
const listSeleccion= async() => {
    url=url_b+'/estudiantes/seleccionar';
     await fetch(url).then(response => response.json())
     .then(data => {
        let content= "";
        data.forEach((estudiantes)=>{
        content+=
        `<tr>
        <td>${estudiantes.codigo}</td>
        <td>${estudiantes.nombre}</td>
        <td>${estudiantes.apellido}</td>
        <td>${estudiantes.facultad}</td>
        <td>${estudiantes.proyecto}</td>
        <td>${estudiantes.instrumento}</td>
        </tr>`
     });
     Cuerpo_seleccion.innerHTML=content;
     })
}
function init(){
    const nameElement = document.getElementById('name')
    nameElement.textContent = localStorage.getItem('name');
    tabButtonsFunction()
    window.addEventListener('load', async () => {
        listCalendarios();
        listSeleccion();
        const myDate = new Date(); // Aquí puedes reemplazarlo con tu propia fecha

        const year = myDate.getFullYear();
        const month = String(myDate.getMonth() + 1).padStart(2, '0');
        const day = String(myDate.getDate()).padStart(2, '0');
        const hours = String(myDate.getHours()).padStart(2, '0');
        const minutes = String(myDate.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        console.log(formattedDateTime);
        /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */

        document.getElementById('datetime').value = formattedDateTime;
    });
}
init();

