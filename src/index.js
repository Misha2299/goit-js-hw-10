import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

// const loaderEl = document.querySelector('.loader');
// const errorEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

select.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  Notiflix.Loading.standard('Loading data, please wait...');
  catInfo.innerHTML = '';

  const breedPr = fetchCatByBreed(event.target.value);

  breedPr
    .then(breed => {
      createMarkupCard(breed[0]);
      Notiflix.Loading.remove();
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createMarkupSelect(breeds) {
  const markupSelect = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join();

  select.innerHTML = markupSelect;

  select.style.visibility = 'inherit';
  new SlimSelect({
    select: '.breed-select',
  });
}

function createMarkupCard(breed) {
  const { url, breeds } = breed;
  const { name, description, temperament } = breeds[0];

  const markupSelect = `
  <h1>${name}</h1>
  <p>${description}</p>
  <p><strong>Temperament: </strong>${temperament}</p>
  <img src=${url}>`;

  catInfo.innerHTML = markupSelect;
}

Notiflix.Loading.standard('Loading data, please wait...');

const breedsPr = fetchBreeds();

breedsPr
  .then(breeds => {
    createMarkupSelect(breeds);

    Notiflix.Loading.remove();
  })
  .catch(() => {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });
