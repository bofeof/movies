import { useState, useEffect } from 'react';
import searchValidator from '../../utils/searchValidator';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({
  isSavedSection,
  onShowAllMovies,
  onHideAllMovies,
  onSearchSubmit,
  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
}) {
  const [inputsValidation, setInputsValidation] = useState({ searchinput: { isValid: true, errorText: '' } });
  const isFormInvalid = inputsValidation.searchinput.isValid;

  function validateSearchInput(value) {
    const validationResult = searchValidator(value);
    setInputsValidation((pervState) => ({
      ...pervState,
      searchinput: { isValid: validationResult.isValid, errorText: validationResult.errorText },
    }));
  }

  function setDefaultInputsValidation() {
    setInputsValidation((prevValue) => ({
      ...prevValue,
      searchinput: { isValid: true, errorText: '' },
    }));
  }

  function handleSearch(evt) {
    evt.preventDefault();

    validateSearchInput(searchInputValue.searchinput);

    // if input is empy => show all saved cards
    if (isSavedSection && searchInputValue.searchinput === '') {
      return onShowAllMovies();
    }
    if (!isSavedSection && searchInputValue.searchinput === '') {
      return onHideAllMovies();
    }

    // all ok
    // send search-input to filter movies data
    return onSearchSubmit({ data: searchInputValue.searchinput });
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    onSetSearchInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateSearchInput(value);

    // if input is empy => show all saved cards
    if (isSavedSection && evt.target.value === '') {
      onShowAllMovies();
    }

    if (!isSavedSection && evt.target.value === '') {
      onHideAllMovies();
    }

  }

  function handleFocus(evt) {
    const { name, value } = evt.target;
    validateSearchInput(value);
    onSetSearchInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleBlur() {
    setDefaultInputsValidation();
  }

  useEffect(() => {
    setDefaultInputsValidation();
  }, []);

  return (
    <div className="search-form">
      <form className="search-form__inputs" noValidate>
        <input
          className="search-form__input"
          type="search"
          id="searchinput"
          name="searchinput"
          placeholder="Фильм"
          required
          value={searchInputValue.searchinput}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className="search-form__submit"
          type="submit"
          name="search-movie"
          disabled={!isFormInvalid}
          onClick={handleSearch}
        >
          Найти
        </button>
      </form>
      <span className="search-form__input-error">{!isFormInvalid ? inputsValidation.searchinput.errorText : ''}</span>

      <FilterCheckbox onClickFilter={onClickFilter} filterStatus={filterStatus} />
    </div>
  );
}
