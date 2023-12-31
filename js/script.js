
//selezioniamo elemento contenitore
const gridElement = document.getElementById("grid");
//dichiaro bottone
const buttonPlay = document.getElementById("buttonplay");
//dichiaro il select
const selectDifficolta = document.getElementById("hard");


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

        //inizzializzo il punteggio a 0
        let punteggio = 0;

        for (let i = 1; i <= elements; i++) {

            const newElement = createMyElement("div", "square", i);
            gridElement.append(newElement);


            newElement.addEventListener("click",

                function () {

                    newElement.classList.add("clicked");


                    //verifico se l'elemento cliccato contiene una mina
                    if (mine.includes(i)) {
                        // cambia il colore dell'elemento a rosso
                        newElement.style.backgroundColor = "red";
                        
                        //comunicazione punteggio
                        document.getElementById("punteggio").innerHTML = "Hai perso! Il tuo punteggio è di: " + punteggio;

                    } else {
                        // incremento il punteggio se continuo a cliccare
                        punteggio++
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