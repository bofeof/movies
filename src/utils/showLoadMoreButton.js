export default function showLoadMoreButton(windowWidth, moviesFiltered, galleryHeight) {
  let movieArray;
  let hiddenStatus;

  // detect section
  const movieArrayM = document.querySelector('.movies .movies-preloader .movies-list')?.children;
  const movieArrayS = document.querySelector('.saved-movies .movies-preloader .movies-list')?.children;

  if (movieArrayM) {
    movieArray = Array.from(movieArrayM);
    hiddenStatus = movieArray.map((movie) => movie.offsetTop < galleryHeight).includes(false);
  }

  if (movieArrayS) {
    movieArray = Array.from(movieArrayS);
    hiddenStatus = movieArray.map((movie) => movie.offsetTop < galleryHeight).includes(false);
  }

  return hiddenStatus;
}
