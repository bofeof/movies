import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <div className="search-form">
      <form className="search-form__inputs">
        <input
          className="search-form__input"
          type="search"
          id="search-form-input"
          name="search-form-input"
          placeholder="Фильм"
          required
        />
        <button className="search-form__submit" type="submit" name="search-movie">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}
