
//constructores

function Seguro(marca,year,tipo){
this.marca = marca;
this.year = year;
this.tipo = tipo;
}

//realiza cotizacion con datos

Seguro.prototype.cotizarSeguro = function (){
    //americano 1.15, asiatico 1.05, europeo 1.03
    let cantidad = 0;
    const base = 2000;
    switch(this.marca){
        case '1': 
          cantidad = base * 1.15;
         break;
        case '2':
           cantidad = base * 1.05;
        break;

        case '3': 
             cantidad = base * 1.35;
        break;
            default:
            break;
 
    }
    //leer año
    const diferencia = new Date().getFullYear() - this.year;

    // le resta el 3% cada año

    cantidad -= ((diferencia*3)*cantidad/100);

    if(this.tipo === 'basico'){
        cantidad = cantidad * 1.30;
    }
    else{
        cantidad = cantidad * 1.50;
    }
    
    return cantidad;
    
}

function UI(){




    //llenar años

   UI.prototype.llenarOpciones = () =>{
        const max = new Date().getFullYear(),
        min = max - 20;
        const SelectYear = document.querySelector('#year');

        for(let i = max; i>min; i--){
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            SelectYear.appendChild(opcion);
        }
    } 

 //muestra alertas

    UI.prototype.mostrarMensaje = function (mensaje, tipo) {
         
        const div = document.createElement('div');
          
          if(tipo === 'error'){
              div.classList.add('mensaje','error');
              
          }
          else {
              div.classList.add('mensaje','correcto');
          }

      div.classList.add('mensaje', 'mt-10');
      div.textContent = mensaje;

      //insertamos en el html

      const formulario = document.querySelector('#cotizar-seguro');
      formulario.insertBefore(div, document.querySelector('#resultado'));

      setTimeout(() => {
      div.remove();
      },4000
        )


    }

    UI.prototype.mostrarResultado = (total,seguro)=>{
const marca = document.querySelector('#marca').value;
let marca2 = '';
switch (marca){
    case '1':
        marca2 = 'AMERICANO';
        break;
    case '2': 
        marca2 = 'ASIATICO';
        break;
    case '3':
        marca2 = 'EUROPEO';
        break;
        default:
            break;

}
const year = document.querySelector('#year').value;
const tipo = document.querySelector('input[name="tipo"]:checked').value;
      const div = document.createElement('div');
      div.classList.add('mt-10');
      div.innerHTML =`
      <p class = "header"> Tu resumen </p>
      <p class="font-bold">Total: ${total}</p>
      <p class="font-bold">Marca: ${marca2}</p>
      <p class="font-bold">Año: ${year}</p>
      <p class="font-bold capitalize">Clase: ${tipo}</p>
      `;
      const resultadoDiv = document.querySelector('#resultado');
      

       const spinner = document.querySelector('#cargando');
       spinner.style.display = 'block';
setTimeout(() => {
    spinner.style.display = 'none'; // se borra el spinner
    resultadoDiv.appendChild(div); //muestra el cotizado
}, 3000);
    }
}
function cotizarSeguro(e) {
e.preventDefault();

//leer las marcas


const marca = document.querySelector('#marca').value;





//leer año


const year = document.querySelector('#year').value;


//leer cotizacion


const tipo = document.querySelector('input[name="tipo"]:checked').value;



if (marca === '' || year ==='' || tipo ===''){

    ui.mostrarMensaje('todos los campos son obligatorios', 'error');

       return;

} 

ui.mostrarMensaje('Cotizando.....','exito');
//ocultar cotizaciones

const seguro = new Seguro(marca,year,tipo);
const total = seguro.cotizarSeguro();

const resultados = document.querySelector('#resultado div');
 if (resultados != null){
     resultados.remove();
 }

ui.mostrarResultado(total, seguro);



}


//instanciar seguro






//instanciamiento UI

const ui = new UI();




document.addEventListener('DOMContentLoaded', () =>{
ui.llenarOpciones();
})
eventListener();
function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}



//REPASAR; TERMINAR DE VER EL VIDEO TOTAL A PAGAR; AGREGAR MAS DATOS AL RESULTADO