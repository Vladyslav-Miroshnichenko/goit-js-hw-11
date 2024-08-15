import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');

const createGalleryCardTemplate = imgInfo => {
  return `
  <li class="gallery-card">
    <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
  </li>
  `;
};

const onSearchFormEl = event => {
  event.preventDefault();

  const searchValue = formEl.elements.user_query.value;
  fetch(
    `https://pixabay.com/api/?key=45457641-ce63f5c92c9f6494e7448790b&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join('');

      galleryEl.innerHTML = galleryCardsTemplate;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
    });
};

formEl.addEventListener('submit', onSearchFormEl);
