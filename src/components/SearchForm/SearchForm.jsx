import { useState, useEffect } from 'react';
import searchValidator from '../../utils/searchValidator';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({onSubmit}) {
  const [searchInputValue, setSearchInputValue] = useState({ searchinput: '' });
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
    // console.log('data ok, send next')
    onSubmit(
      {data: searchInputValue.searchinput }
    )
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setSearchInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateSearchInput(value);
  }

  function handleFocus(evt) {
    const { name, value } = evt.target;
    validateSearchInput(value);
    setSearchInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleBlur() {
    setDefaultInputsValidation();
  }

  useEffect(() => {
    setSearchInputValue((prevValue) => ({
      ...prevValue,
      searchinput: '',
    }));

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
      <FilterCheckbox />
    </div>
  );
}
