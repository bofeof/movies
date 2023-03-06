/* eslint-disable no-unused-vars */

import { useCallback, useState, useContext } from 'react';

import WindowContext from '../../contexts/WindowContext';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

// import Preloader from '../Preloader/Preloader';

export default function Movies({ isSavedSection, beatMovies, onClickFilter, filterStatus, isLoadError }) {
  const windowWidth = useContext(WindowContext);
  const [filteredBeatMovies, setFilterBeatMovies] = useState([]);

  const handleFilterMovies = useCallback(
    (filterData) => {
      const newMovieData = beatMovies.filter(
        (movie) =>
          (movie?.nameRU.toLowerCase().includes(filterData.data.toLowerCase()) ||
            movie?.nameEN.toLowerCase().includes(filterData.data.toLowerCase())) &&
          (filterStatus ? movie?.duration <= 40 : movie?.duration >= 0)
      );

      setFilterBeatMovies(() => newMovieData);

    },
    [beatMovies, filterStatus]
  );

  function showLoadMoreButton(){
    if (windowWidth > 800 && filteredBeatMovies.length > 12){
      return true
    }
    if (windowWidth < 768 && filteredBeatMovies.length >= 8){
      return true
    }
    if (windowWidth < 500 && filteredBeatMovies.length >= 5){
      return true
    }
    return false
  }

  return (
    <div className="movies">
      <SearchForm onClickFilter={onClickFilter} filterStatus={filterStatus} onSearchSubmit={handleFilterMovies} />
      <MoviesCardList isSavedSection={isSavedSection} movies={filteredBeatMovies} isLoadError={isLoadError}/>
      {showLoadMoreButton() && <ShowMoreButton />}
    </div>
  );
}
