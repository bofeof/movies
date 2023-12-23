import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="proj" id="proj">
      <h2 className="proj__header">О&nbsp;проекте</h2>
      <div className="proj__steps">
        <div className="proj__step">
          <h3 className="proj__step-header">Проект включал 5&nbsp;этапов работы с любимыми фильмами</h3>
          <p className="proj__step-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="proj__step">
          <h3 className="proj__step-header">На&nbsp;выполнение работы ушло 5&nbsp;недель</h3>
          <p className="proj__step-paragraph">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
            защититься.
          </p>
        </div>
      </div>
      <div className="proj__web">
        <div className="proj__back">
          <p className="proj__duration proj__back-duration">1 неделя</p>
          <p className="proj__web-paragraph">Back-end</p>
        </div>
        <div className="proj__front">
          <p className="proj__duration proj__front-duration">4 недели</p>
          <p className="proj__web-paragraph">Front-end</p>
        </div>
      </div>
    </section>
  );
}
