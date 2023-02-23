import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__project">Статичный сайт</p>
          <a className="portfolio__link" href="https://bofeof.github.io/how-to-learn"  rel="noreferrer" target="_blank">
            &#8599;
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__project">Адаптивный сайт</p>
          <a className="portfolio__link"  rel="noreferrer" href="https://bofeof.github.io/russian-travel/index.html" target="_blank">
            &#8599;
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__project">Одностраничное приложение</p>
          <a className="portfolio__link"  rel="noreferrer" href="https://bofeof.nomoredomains.club" target="_blank">
            &#8599;
          </a>
        </li>
      </ul>
    </div>
  );
}
