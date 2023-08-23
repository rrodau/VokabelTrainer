//import data from "./languages.json" assert {type: 'json'};

// Maybe later for server side json files
/* const data = fetch('./languages.json')
              .then((response) => response.json())
              .catch((error) => {
                JSON.parse(localStorage.getItem('userDataLanguages')) || [{}]
              } )*/

const languages = JSON.parse(localStorage.getItem('userDataLanguages')) || {};
let currentLanguage = {};
let currentChapter = {};
let currentLanguagePath = '';
let currentChapterPath = '';

// const languages = {};
// localStorage.setItem('userData', JSON.stringify(languages));
window.render = function () {
  renderBurgerMenu(languages, 'getLanguageChapters');
}

const renderBurgerMenu = function(file, onclickFunctionName) {
  /**
   * A function which should render all available languages in the burger menu
   */
    let languageElement = document.getElementById('language-selection');
    languageElement.innerHTML = '';
    for (const [key, value] of Object.entries(file)) {
      console.log(languageElement.innerHTML);
      languageElement.innerHTML +=  `<a id=${key} class="mdl-navigation__link" href="#" onclick="${onclickFunctionName}('${value}')">${key}</a>`;
    }
}

window.createModal = function(onSubmitFunctionName) {
  /**
   * A function to show the modal for a new language creation  
   */
  let dialog = document.querySelector('dialog');
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
  })
  // call a function to check if language doesn't already exist
  console.log(window['renderBurgerMenu']);
  dialog.querySelector('.accept').addEventListener('click', window[onSubmitFunctionName])
}

window.createLanguage = function() {
  /**
   * A function which check if the language in the input doesn't exits already
   */
  const newLanguage = document.getElementById('new-language').value;
  folderExists(languages, newLanguage, 'userDataLanguages', 'window.render')
}

window.createChapter = function() {
  const newChapter = document.getElementById('new-language').value;
  folderExists(currentLanguage, newChapter, currentLanguagePath, 'getLanguageChapters')
}


const folderExists = function(dictionary, newKey, storageFile, functionName) {
  /**
   * A helper function for language and chapter creation which
   * checks if the folder already exists
   */
  if (!Object.keys(dictionary).find((key) => key === newKey)) {
    // Create new dictionaryWord
    dictionary[newKey] = `data${newKey}`;
    // save json
    localStorage.setItem(storageFile, JSON.stringify(dictionary));
    let dialog = document.querySelector('dialog');
    dialog.close();
    renderBurgerMenu(dictionary, functionName);
  } else {
    alert(`${newKey} already exists!`);
  }
}

window.getLanguageChapters = function(filepath) {
  currentLanguage = JSON.parse(localStorage.getItem(filepath)) || {};
  renderBurgerMenu(currentLanguage, 'getLanguageChapters');
  // change button functionality
  document.getElementById('add-new').setAttribute('onclick', "createModal('createChapter')");
  console.log(document.getElementById('add-new'));
  currentLanguagePath = filepath;
} 