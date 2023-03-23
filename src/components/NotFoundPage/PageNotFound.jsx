import './PageNotFound.css';

export default function PageNotFound({ onClick }) {
  return (
    <div className="pagenotfound">
      <p className="pagenotfound__code">404</p>
      <p className="pagenotfound__message">Страница не найдена</p>
      <button type="button" className="pagenotfound__button" onClick={onClick}>
        Назад
      </button>
    </div>
  );
}
