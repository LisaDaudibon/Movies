
const searchBar = document.getElementById('search-bar');
const searchForm = document.getElementById('search-bar');
const submitButton = document.getElementById('submitsearch');
const resultDiv = document.getElementById('result');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  const inputString = searchBar.value.trim();
  const words = inputString.split(' ');
  let formattedString = '';
  for (let i = 0; i < words.length; i++) {
    formattedString += words[i];
  }
  resultDiv.innerText = formattedString;
  console.log(formattedString);
});


const url = `http://www.omdbapi.com/?apikey=[24dec3b4]&${resultDiv}`;
const imgurl = 'http://img.omdbapi.com/?apikey=[24dec3b4]&'
const data = {
  title: "title",
  year: "year",
  poster: "poster"
};
const options = {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
};

function fetchMovies () {
  fetch(url, options)
    .then((response) => { return response.json(); })
    .then((response) => { console.log(response); })
    .catch((error) => { console.error(error); });
}

const moviesContainer = document.getElementById('movies-container');


const showMovies = (element, name, title, year, poster) => {
  element.innerHTML = `
    <div class="card" style="width: 22rem;" >
      <div class="card-body justify-content-center">
        <h2>${name}</h2>
        <p>${title}</p>
        <p>${year}</p>
        <img src=${poster}></img>
      </div>
    </div>
  `;
}

const movieName = 'The Matrix';
const movieTitle = 'The Matrix Reloaded';
const movieYear = '2003';
const moviePoster = 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg';

showMovies(moviesContainer, movieName, movieTitle, movieYear, moviePoster);