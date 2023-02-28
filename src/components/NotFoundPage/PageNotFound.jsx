import './PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="pagenotfound">
      <p className="pagenotfound__code">404</p>
      <p className="pagenotfound__message">Страница не найдена</p>
      <a className="pagenotfound__link" href="/">
        Назад
      </a>
    </div>
  );
}
