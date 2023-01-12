const axios = require('axios').default;

const KEY_API_PIXABAY = '32781851-5380a4cc45169f3ca42a551c9';
const URL_PIXABAY = `https://pixabay.com/api/`;
let currentPage = 1;

const divGallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const footer = document.querySelector('.footer');

form.addEventListener('submit', searchUser);
loadMoreBtn.addEventListener('click', loadMoreByBtn);

function searchUser(event) {
  event.preventDefault();
  footer.classList.add('hidden');
  currentPage = 1;
  const userRequest = event.currentTarget.elements.searchQuery.value;
  divGallery.innerHTML = '';
  fetchRequest(userRequest).then(card => createMarkup(card.data.hits));
}

function loadMoreByBtn() {
  const userRequest = form.elements.searchQuery.value;
  fetchRequestMore(userRequest).then(card => createMarkup(card.data.hits));
}

async function fetchRequest(userRequest) {
  console.log(userRequest);
  try {
    const response = await axios.get(
      `${URL_PIXABAY}?key=${KEY_API_PIXABAY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );
    currentPage = +1;
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchRequestMore(userRequest) {
  console.log(userRequest);
  currentPage += 1;
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
  divGallery.insertAdjacentHTML('beforeend', markup);
  footer.classList.remove('hidden');
}
