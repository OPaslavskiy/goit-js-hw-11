const axios = require('axios').default;

const KEY_API_PIXABAY = '32781851-5380a4cc45169f3ca42a551c9';
const URL_PIXABAY = `https://pixabay.com/api/`;
let currentPage = 1;

const divGallery = document.querySelector('.gallery');

const form = document.querySelector('.search-form');

form.addEventListener('submit', searchUser);

function searchUser(event) {
  event.preventDefault();
  const userRequest = event.currentTarget.elements.searchQuery.value;
  console.log('123');
  fetchRequest(userRequest).then(card => createMarkup(card.data.hits));
}

async function fetchRequest(userRequest) {
  try {
    const response = await axios.get(
      `${URL_PIXABAY}?key=${KEY_API_PIXABAY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );
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
  divGallery.insertAdjacentHTML('afterbegin', markup);
}
