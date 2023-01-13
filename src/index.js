import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '500px',
  position: 'left-top',
});

const axios = require('axios').default;

const KEY_API_PIXABAY = '32781851-5380a4cc45169f3ca42a551c9';
const URL_PIXABAY = `https://pixabay.com/api/`;
let MAX_LOAD = 500;
const per_page = 40;
let currentPage = 0;

const divGallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const footer = document.querySelector('.footer');
const endedInfo = document.querySelector('.ended-info');

form.addEventListener('submit', searchUser);
loadMoreBtn.addEventListener('click', loadMoreByBtn);

function searchUser(event) {
  event.preventDefault();
  footer.classList.add('hidden');
  currentPage = 0;
  const userRequest = event.currentTarget.elements.searchQuery.value;
  divGallery.innerHTML = '';
  endedInfo.innerHTML = '';
  fetchRequest(userRequest);
}

function loadMoreByBtn() {
  const userRequest = form.elements.searchQuery.value;
  fetchRequest(userRequest);
}

async function fetchRequest(userRequest) {
  MAX_LOAD -= 40;
  console.log(MAX_LOAD);
  currentPage += 1;
  try {
    const response = await axios.get(
      `${URL_PIXABAY}?key=${KEY_API_PIXABAY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${currentPage}`
    );
    console.log(response);

    let hits = response.data.hits;
    const totalHits = response.data.totalHits;

    if (hits.length) {
      createMarkup(response.data.hits);
    } else
      Notiflix.Notify.warning(
        `Sorry, there are no images matching your search query. Please try again.`
      );

    //
    if ((hits.length && per_page > hits.length) || MAX_LOAD < 40) {
      footer.classList.add('hidden');
      const infoByEnd = `<div class="info-by-end">We're sorry, but you've reached the end of search results.</div>`;
      endedInfo.insertAdjacentHTML('beforeend', infoByEnd);
    }

    if (currentPage === 1 && hits.length) {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(arrayPhoto) {
  const markup = arrayPhoto
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
  divGallery.insertAdjacentHTML('beforeend', markup);
  footer.classList.remove('hidden');
}
