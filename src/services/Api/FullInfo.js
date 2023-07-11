const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2ZjNmQ2ZDk3Y2RjYjQ2MWY4ODRlODNiYjk4YTc5OSIsInN1YiI6IjY0YTcwNjczOTY1MjIwMDBhZTg0MjcwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._FssleSwH7ZT_5bsWB87BjRy28BwzRkGD1qx-exsCrk',
  },
};

const getInfo = movieId =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

export default getInfo;
