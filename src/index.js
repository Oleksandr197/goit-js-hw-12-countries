import './css/styles.css';
import './css/modern-normalize.css';
import API from './js/fetchCountries.js';
 import debounce from 'lodash.debounce';
// const debounce = require('lodash.debounce');

// import { info } from "@pnotify/core";


import listContriesTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';

import { info, error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputRef = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');
let countrySearch = '';

inputRef.addEventListener( 'input', debounce(() => {
    onSearch();
  }, 500),
);

function onSearch() {
  // evt.preventDefault();
  countrySearch = inputRef.value;
   

  API.fetchCountries(countrySearch)
    .then(isFetchSucces)
    .catch(onFetchError);
}

function isFetchSucces(countries) {
  if (countries.length > 10) {
    clearMarkup();
    manyCountries();
  } else if (countries.length <= 10 && countries.length > 1) {
    clearMarkup();
    renderMarkup(listContriesTpl, countries);
  } else if (countries.length === 1) {
    clearMarkup();
    renderMarkup(countryCardTpl, countries[0]);
  } else {
    // clearMarkup();
    onFetchError();
  }
}

function renderMarkup(list, countries) {
  const markup = list(countries);
  cardContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  cardContainer.innerHTML = '';
}

function onFetchError() {
   error({
    title: 'Визначтесь з пошуком',
    text: 'Співпадінь не знайдено!',
    delay: 2000,
      });
}

function manyCountries() {
  info({
    title: 'Введіть більше літер',
    text: 'Знайдено забагато збігів. Введіть більш конкретний запит!',
    delay: 2000,
    
  });
}

