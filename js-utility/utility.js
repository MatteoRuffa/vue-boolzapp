import {getRndInteger} from './js-utility/utility.js';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*
const numberProva = [items1, ..., itemsx];

//INDEXOF
const index = numberProva.indexOf(items1); //elemento array che si vuole eliminare

//FOREACH
numberProva.forEach((element, index, array)=>{
  consol.log(element);  //non necessita un retorn
});

//MAP
const nuovoArray = numberProva.map((element, index, array)=>{
    return element; //crea un nuovo array composto da quello che impostiamo nelle ()
});                 // si puo anche crere semplicemente un clone dell'array originale

//FILTER
const pari = numberProva.filter((items)=>{
  if (items % 2 === 0){     //crea un nuovo array composto da alcuni elemnti dell'array originale in base alle condizioni che gli mettiamo 
    return true;            // segue solo i parametri booleani
  }
  return false;
})
*/