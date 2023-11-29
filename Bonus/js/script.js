
//selezioniamo elemento contenitore
const gridElement = document.getElementById("grid");

//dichiaro bottone
const buttonPlay = document.getElementById("buttonplay");

//dichiaro il select
const selectDifficolta = document.getElementById("hard");

// dichiaro una variabile per il termine del gioco 
let giocoFinito = false;

buttonPlay.addEventListener("click",


    function () {

        //rimuovo gli elementi dopo aver cliccato nuovamente il bottone
        gridElement.innerHTML = "";


        // ottengo la difficoltà selezionata
        const difficolta = selectDifficolta.value;

        //memorizzo una variabile per gli elemeti
        let elements;


        //creo una condizione per ogni difficoltà
        if (difficolta === "Difficoltà2") {
            elements = 81;
            gridElement.classList.add("difficolta2");
        }

        else if (difficolta === "Difficoltà3") {
            elements = 49;
            gridElement.classList.add("difficolta3");
        }

        else if (difficolta === "Difficoltà1") {
            elements = 100;
            gridElement.classList.add("difficolta1");
        }


        //array mine
        const mine = genArrayRandomNum(1, elements, 16)
        console.log(mine);

        // funzione per mostrare tutte le bombe alla fine del gioco
        function mostraBombe() {

            //seleziono tutte le classi .bomba
            const bombe = document.querySelectorAll(".bomba");
            
            //for each preso da fonti esterne: consente di eseguire una funzione per ogni elemento presente nell'array
            bombe.forEach(function(bomba){

                //aggiungo la classe esplosa ad ogni elemento
                bomba.classList.add("esplosa");

            }
            );
        }

        //inizzializzo il punteggio a 0
        let punteggio = 0;

        for (let i = 1; i <= elements; i++) {

            const newElement = createMyElement("div", "square", i);
            gridElement.append(newElement);

            if (mine.includes(i)) {
                // aggiunge la classe distintiva per indicare che questa cella contiene una bomba
                newElement.classList.add("bomba");
            }

            newElement.addEventListener("click",

                function () {

                    //se il gioco non è terminato
                    if(!giocoFinito){

                        //aggiungo il click ogni volta che premo un numero fin quando non premo una mina
                        newElement.classList.add("clicked");
                    
                        //verifico se l'elemento cliccato contiene una mina
                        if (mine.includes(i)) {
                            // cambia il colore dell'elemento a rosso
                            newElement.style.backgroundColor = "red";
                            
                            //comunicazione punteggio
                            document.getElementById("punteggio").innerHTML = "Fine del gioco! Il tuo punteggio è di: " + punteggio;

                            //rimuovo la classe clicked al termine della partita
                            newElement.classList.remove("clicked");

                            //mostra bombe
                            mostraBombe();

                            //impostazione di fine gioco
                            giocoFinito = true;

                        } else {
                            // incremento il punteggio se continuo a cliccare
                            punteggio++
                        }
                    }

                    //click del numero
                    console.log(i);
                }
            )
        }

    }


)


//funzione per riutilizzo classi
function createMyElement(tagtype, classname, content) {

    const currentElement = document.createElement(tagtype);
    currentElement.classList.add(classname);

    // aggiungo il contenuto (numero) all'elemento
    currentElement.innerHTML = content;

    return currentElement;

}


//funzione che crea un array con ordinamento randomico di numeri in un range (min,max)

function genArrayRandomNum(minNum, maxNum, lengthArray) {

    //genero array 
    const arrayToGen = [];

    //creo ciclo che popolerà l'array
    while (arrayToGen.length < lengthArray) {

        //genero un numero random in un range (min,max)
        let newNumber = genRandomNumMinMax(minNum, maxNum);

        if (!arrayToGen.includes(newNumber)) {

            //push nell'array
            arrayToGen.push(newNumber);
        }

    }

    return arrayToGen;
}


//funzione che genera numero random
function genRandomNumMinMax(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}