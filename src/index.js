const KEY_API_PIXABAY = '32781851-5380a4cc45169f3ca42a551c9';

const form = document.querySelector('.search-form');

form.addEventListener('submit', sendRequest);

function sendRequest(event) {
  event.preventDefault();
  const userRequest = event.currentTarget.elements.searchQuery.value;
  console.log('123');

  fetch(
    `https://pixabay.com/api/?key=${KEY_API_PIXABAY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.log(error));
}
