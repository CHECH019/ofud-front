const url_b="http://localhost:8082/ofud/api/v1";

const tabButtons = document.querySelectorAll('.tab-button');
const tabContentPanes = document.querySelectorAll('.tab-content .tab-pane, .tab-pane2');
let  fecha_s;
const enviar_asis = document.getElementById('enviar_asistencia');
const viaticos = document.getElementById('viaticos');
const electivas = document.getElementById('electivas');
/*Boton viaticos*/
viaticos.addEventListener('click',async()=>{
    url =url_b+'/pdf/generate';
    await fetch (url).then(response=>response.blob())
    .then(blob => {
        // Crear un objeto URL a partir del blob
        const url = URL.createObjectURL(blob);
    
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf';
    
        // Agregar el enlace al documento y hacer clic en él
        document.body.appendChild(link);
        link.click();
    
        // Limpiar el objeto URL y el enlace temporal
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error al descargar el archivo PDF:', error);
      });
    

})
electivas.addEventListener('click',async ()=>{
    url =url_b+'/estudiantes/email';
    await fetch (url)
})

/*Cambio de pestañas*/
async function tabButtonsFunction(){
    let vali = await validacion_Calendario();
    let vali2= await validacion_seleccion();
    
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
            button.addEventListener('click', async () => {
                let vali3= await validacion_calendario_fecha();
                cambiar_boton(button);
                listAsistencia();
                
                if(Object.keys(vali3).length === 0){
                        alert('pestaña inhabilitada');   
                }else{
                    cambiar_boton(button);
                    listAsistencia();
                    enviar_asis.addEventListener('click',async()=>{
                        
                        let codigo=codigos();
                        insert_asistencia(codigo,vali3.consec,vali3.idObra);
                    })
                }
             });      
            
        }
        if(button.classList.contains("liquidacion")){
            button.addEventListener('click', async() => {
                
            let vali4=await validar_liq(); 
            if(vali4!=0){
                alert('pestaña inhabilitada');
            }else{
                cambiar_boton(button);
            }
        });
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
/*Validar calendario_fecha*/
const validacion_calendario_fecha= async() => {
   url=url_b+`/calendarios/ensayo?date=${fecha_s}`;
   console.log(url)
   let calen;
     await fetch(url).then(response => response.json())
     .then(data => {
        calen=data;
     })
     .catch(error => {
        console.log('Error en la solicitud:', error);
    });
    return calen;
    }
/*Validar liquidacion*/
const validar_liq=async()=>{

    url=url_b+`/calendarios/count?date=${fecha_s}`;
    let count;
    await fetch(url).then(response => response.json())
    .then(data =>{
        count=data.count;
    })
    return count;
}
/*Pone inactivo el calendaro*/
async function peticion_terminar(id) {
    console.log(id);
    url = url_b+`/calendarios/terminar?${id}`;
    console.log(url);
    await fetch(url, {
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
/*Insertar asistencias*/
async function insert_asistencia(codsEstudiante,consec,idObra){

    const data = {
        codsEstudiante,
        consec,
        idObra
    };
    url = url_b+`/estudiantes/asistencia`;
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
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
function codigos(){
        // Obtener la tabla
    const tabla = document.getElementById('tabla_asistencia');

    // Obtener todas las filas de la tabla
    const filas = tabla.querySelectorAll('tbody tr');

    // Recorrer las filas y verificar los checkboxes marcados
    const codigosSeleccionados = [];
    for (let i = 0; i < filas.length; i++) {
        const fila = filas[i];
        const checkbox = fila.querySelector('input[type="checkbox"][value="present"]');

    // Verificar si el checkbox está marcado y tiene el valor "present"
        if (checkbox && checkbox.checked) {
            const codigo = fila.querySelector('td:first-child').textContent;
            codigosSeleccionados.push(codigo);
        }
    }

    return codigosSeleccionados;

}
/*Lista Calendarios*/
const listCalendarios = async () => {
    url = url_b+'/calendarios/';
    await fetch(url).then(response => response.json())
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
const listAsistencia= async() => {
    url=url_b+'/estudiantes/seleccionados';
     await fetch(url).then(response => response.json())
     .then(data => {
        let content= "";
        data.forEach((estudiantes)=>{
        content+=
        `<tr id="conte">
        <td>${estudiantes.codigo}</td>
        <td>${estudiantes.nombre}</td>
        <td>${estudiantes.apellido}</td>
        <td>${estudiantes.facultad}</td>
        <td>${estudiantes.proyecto}</td>
        <td>${estudiantes.instrumento}</td>
        <td><input type="checkbox" class="cbox" value="present"></td>
        </tr>`
     });
     Cuerpo_asistencia.innerHTML=content;
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

        /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */

        document.getElementById('datetime').value = formattedDateTime;
    });
}
init()
function fecha(){
    const date= document.getElementById('datetime').value;
    
    const myDate = new Date(date) ; // Aquí puedes reemplazarlo con tu propia fecha

    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');
    const hours = String(myDate.getHours()).padStart(2, '0');
    const minutes = String(myDate.getMinutes()).padStart(2, '0');
    const seconds = String(myDate.getSeconds()).padStart(2, '0');

    fecha_s = `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`;
}
fecha()
setInterval(fecha, 1000);



