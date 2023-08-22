import data from "./vocab.json" assert {type: 'json'};
let userData = JSON.parse(localStorage.getItem('userData')) || {};
let percentChapter;
updatePercent();
let dictionary;
let currVocab;
let numVocabs;
let numCorrect;
let currIdx;



function updatePercent() {
  let resultsPerChapter = [];
  for (let i = 0; i < data.length; i++) {
    percentChapter = calculateAverage(userData[i]);
    document.getElementById('chapter' + i).innerHTML = `Chapter ${i + 1}  <span style="color: green;">${percentChapter}%</span>`;
  }
}

function calculateAverage(data) {
  if (data.length === 0) {
    return 0;
  }
  console.log(data);
  let sum = data.reduce((acc, val) => val + acc, 0);
  console.log(sum);
  return Math.floor(sum / data.length);
}
window.render = function () {
  let currentDictionary;
  //<a id="chapter0" class="mdl-navigation__link" href="#" onclick="getChapter(0)">Chapter 1</a>
  tablebody.innerHTML = '';
  for (let i in Object.keys(data)) {
    console.log(i);
    currentDictionary = data[i];
    console.log(currentDictionary)
    for (let key in currentDictionary) {
      tablebody.innerHTML += `<tr><td>${key}</td><td>${currentDictionary[key]}</td></tr>`;
    }
  }
}


window.compare = function () {
  let solution = dictionary[userInput.value];
  if (solution === question.innerHTML) {
    text.style.color = 'green';
    text.innerHTML = 'Richtig!';
    numCorrect++;
  } else {
    text.style.color = 'red';
    text.innerHTML = `Falsch!`;
    possibleSolution.style.display = "block";
  }
  userInput.readOnly = true;
  compareButton.style.display = 'none';
  nextButton.style.display = 'block';
}


window.nextVocab = function () {
  if (currVocab >= numVocabs) {
    console.log("hello");
    test.style.display = "none";
    showResults();
    return false;
  }
  userInput.value = '';
  compareButton.style.display = 'block';
  nextButton.style.display = 'none';
  currVocab++;
  userInput.readOnly = false;
  text.innerHTML = '';
  let obj_keys = Object.keys(dictionary);
  let ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
  question.innerHTML = dictionary[ran_key];
  possibleSolution.innerHTML = ran_key;
  possibleSolution.style.display = "none";
}

window.showResults = function() {
  results.innerHTML = `<h1>${numCorrect}/${numVocabs} correctly answered. </h1>`
  results.style.display = 'block';
  userData[currIdx].push(Math.floor((numCorrect / Object.keys(dictionary).length) * 100));
  console.log(userData);
  updatePercent();
  localStorage.setItem('userData', JSON.stringify(userData));
}

window.startTest = function () {
  currVocab = 0;
  numCorrect = 0;
  table.style.display = 'none';
  results.style.display = 'none'
  test.style.display = 'block';
  nextButton.addEventListener('click', nextVocab);
  nextVocab();
}

window.getChapter = function (idx) {
  dictionary = data[idx];
  let dialog = document.querySelector('dialog');
  console.log(dialog);
  modalvocab.innerHTML = `<input type="number" id="numvocabs" min="1" value="${Object.keys(dictionary).length}">`;
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
  })
  dialog.querySelector('.accept').addEventListener('click', function () {
    if (numvocabs.value < 1) {
      numvocabs.value = 1;
    } if (numvocabs.value > Object.keys(dictionary).length) {
      numvocabs.value = Object.keys(dictionary).length;
    }
    dialog.close();
    currIdx = idx;
    numVocabs = numvocabs.value;
    startTest();
  })
}

