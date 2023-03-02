import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className="filter">
      <div className="filter__item">
        <label className="filter__label" htmlFor="filter-checkbox">
          <input className="filter__checkbox filter__checkbox_hidden" type="checkbox" id="filter-checkbox" />
          <span className="filter__checkbox filter__checkbox_visible">
            <span className="filter__dot" />
          </span>
        </label>
      </div>
      <p className="filter__caption">Короткометражки</p>
    </div>
  );
}
