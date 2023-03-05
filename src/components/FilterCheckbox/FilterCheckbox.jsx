import './FilterCheckbox.css';

export default function FilterCheckbox({onClickFilter, filterStatus}) {

  return (
    <div className="filter">
      <div className="filter__item">
        <label className="filter__label" htmlFor="filter-checkbox">
          <input className="filter__checkbox filter__checkbox_hidden" type="checkbox" id="filter-checkbox" onChange={onClickFilter} checked={filterStatus}/>
          <span className="filter__checkbox filter__checkbox_visible">
            <span className={`filter__dot ${filterStatus ? 'filter__dot_active':''}`} />
          </span>
        </label>
      </div>
      <p className="filter__caption">Короткометражки</p>
    </div>
  );
}
