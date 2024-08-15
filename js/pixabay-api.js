const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
console.log(formEl);
console.log(galleryEl);

const onSearchFormEl = event => {
  event.preventDefault();
};

formEl.addEventListener('sabmit', onSearchFormEl);
