import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://bofeof.github.io/how-to-learn" rel="noreferrer" target="_blank">
            <p className="portfolio__project">Статичный сайт</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://bofeof.github.io/russian-travel/index.html"
            rel="noreferrer"
            target="_blank"
          >
            <p className="portfolio__project">Адаптивный сайт</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://bofeof.nomoredomains.club" rel="noreferrer" target="_blank">
            <p className="portfolio__project">Одностраничное приложение</p>
            <p className="portfolio__arrow">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
