import MOVIE_CARD_PARAMS from './movieConstants';
import WINDOW_WIDTH from './windowConstants';

export default function defineGalleryHeight(buttonCounter){
    // start h + n click save section * card h + gap * n row
  const gallerySettings = {
    large:
      WINDOW_WIDTH.large +
      buttonCounter *
        (MOVIE_CARD_PARAMS.large.movieHeight + MOVIE_CARD_PARAMS.large.movieGap) *
        MOVIE_CARD_PARAMS.large.movieRow,
    medium:
      WINDOW_WIDTH.medium +
      buttonCounter *
        (MOVIE_CARD_PARAMS.medium.movieHeight + MOVIE_CARD_PARAMS.medium.movieGap) *
        MOVIE_CARD_PARAMS.medium.movieRow,
    small:
      WINDOW_WIDTH.small +
      buttonCounter *
        (MOVIE_CARD_PARAMS.small.movieHeight + MOVIE_CARD_PARAMS.small.movieGap) *
        MOVIE_CARD_PARAMS.small.movieRow,
  }
  return gallerySettings
}
