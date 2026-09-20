let baraja = [];
const tipos = ["C","D","H","S"];
const especiales = ["A","J","Q","K"]; //10, a=10 o 11

//manejo de DOM
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

//small html
const puntosHtml = document.querySelectorAll("small");

//inicializar div de jugador y computadora
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas")

//puntajes
let puntosJugador = 0, puntosComputadora = 0;

//funcion nueva baraja

const crearBaraja = () => {
    //crea una baraja con las cartas del 2 al 10 de todos los tipos
    for (let i = 2; i <= 10; i++) {
        for(let tipo of tipos){
        baraja.push(i + tipo);
        }
    }    
    
    // agregamos las cartas especiales
    for (let especial of especiales) {
        for (let tipo of tipos) {
            baraja.push(especial + tipo);
        }
    }   
    
    // aleatoriamente mezclamos las cartas
    baraja = _.shuffle(baraja);

    console.log(baraja);
};    

crearBaraja();

//funcion de pedir carta
const pedirCarta = () => {
    if(baraja.length == 0){
        console.warn("no hay cartas en la baraja");
        throw "no hay cartas en la baraja";
    }
    const carta = baraja.pop();
    //pop saca el ultimo elemento
    console.log(carta);
    return carta;
};

//funcion de valor de la carta

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length -1)
    let puntos = 0;
    
    if(isNaN(valor)){
        
        //j,q,k valen 10 la a vale 11
        puntos = valor =="A" ? 11 : 10;
    }else{
    
        puntos = valor * 1;
    }
    return puntos
}

// funcion de la computadora 
const turnoComputadora = (puntosMinimos) =>{
    do{
        const carta = pedirCarta();
        console.log({cartaComputadora: carta});

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta")
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21){
            break
        }
    }while(puntosComputadora < puntosMinimos && puntosMinimos <= 21);

//mensaje 
    setTimeout(() => {
        if(puntosComputadora == puntosMinimos){
        alert("nadie gana");
        }else if(puntosMinimos > 21){
            alert("la computadora gana");
        }else if(puntosComputadora > 21){
            alert("jugador gana");
        }else{
            alert("computadora gana");
        }
    }, 100);
    
};
//pedir carta desde el boton
btnPedir.addEventListener('click', () =>{
    const carta = pedirCarta();
   
    puntosJugador = puntosJugador + valorCarta(carta);
    
    puntosHtml[0].innerText = puntosJugador;
    // crear y mostrtar las cartas
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta")
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn("perdiste")
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador == 21){
        console.warn("21, ganaste")
        btnPedir.disabled = true;
    }
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {

    baraja = [];
    //error en hacer baraja = crearbaraja()
    crearBaraja();
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})
