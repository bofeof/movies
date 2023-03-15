export default function showLoadMoreButton(windowWidth, moviesFiltered, galleryHeight) {
  let movieArray;
  let hiddenStatus;

  if (moviesFiltered.length !== 0 && document.querySelector('.movies-list')?.children) {
    movieArray = Array.from(document.querySelector('.movies-list').children);
    hiddenStatus = movieArray.map((movie) => movie.offsetTop < galleryHeight).includes(false);
  }

  if (windowWidth > 800 && moviesFiltered.length > 12 && hiddenStatus) {
    return true;
  }
  if (windowWidth < 768 && moviesFiltered.length >= 8 && hiddenStatus) {
    return true;
  }
  if (windowWidth < 500 && moviesFiltered.length >= 5 && hiddenStatus) {
    return true;
  }
  return false;
}
