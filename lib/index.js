
$(document).ready(function() {
  let apikey = '24dec3b4&';

  $("#movieForm").submit(function(event) {
    event.preventDefault();

    let movie = $("#searchmovies").val();

    let url = 'http://www.omdbapi.com/?apikey=' + apikey;

    const moviesContainer = document.getElementById('movies-container');

    const showMovies = (element, name, title, year, poster) => {
      element.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${poster}" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h2 class="card-title">${name}</h2>
              <p class="card-text">${title} (${year})</p>
            </div>
          </div>
        </div>
      `;
    };

    $.ajax({
      method: 'GET',
      url: url + '&s=' + movie,
      success: function(data) {
        if (data.Response === "True") {
          const movies = data.Search;
          moviesContainer.innerHTML = "<div class='row'></div>";

          $.each(movies, function(index, movie) {
            // Get the full movie details for each search result
            $.ajax({
              method: 'GET',
              url: url + '&i=' + movie.imdbID,
              success: function(data) {
                let movieName = data.Title;
                let movieTitle = data.Genre;
                let movieYear = data.Year;
                let moviePoster = data.Poster;
                showMovies(moviesContainer.querySelector('.row'), movieName, movieTitle, movieYear, moviePoster);
              },
              error: function(xhr, status, error) {
                console.log("Error:", error);
              }
            });
          });
        } else {
          moviesContainer.innerHTML = "<p>No movies found</p>";
        }
      },
      error: function(xhr, status, error) {
        console.log("Error:", error);
      }
    });
  });
});