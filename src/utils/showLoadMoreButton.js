export default function showLoadMoreButton(windowWidth, moviesFiltered, galleryHeight) {
  let hiddenStatus;

  const movieListElement =
    document.querySelector('.movies .movies-preloader .movies-list')?.children ||
    document.querySelector('.saved-movies .movies-preloader .movies-list')?.children;

  if (movieListElement) {
    const movieArray = Array.from(movieListElement);
    hiddenStatus = movieArray.map((movie) => movie.offsetTop < galleryHeight).includes(false);
  }

  return hiddenStatus;
}
