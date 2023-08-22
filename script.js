import data from "./vocab.json" assert {type: 'json'};
let dictionary;
//const dictionary = data[0];
window.render = function() {
  vocabList.innerHTML = '';
  for (let key in dictionary) {
    vocabList.innerHTML += `<li>${key}: ${dictionary[key]}</li>`;
  }
}


window.nextVocab = function() {
  let obj_keys = Object.keys(dictionary);
  let ran_key = obj_keys[Math.floor(Math.random()*obj_keys.length)];
  question.innerHTML = dictionary[ran_key];
}

window.compare = function() {
  if (dictionary[userInput.value] === question.innerHTML) {
    text.innerHTML = 'Richtig!';
  } else {
    text.innerHTML = 'Falsch!';
  }
}