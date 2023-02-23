import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="proj" id="proj">
      <h2 className="proj__header">О проекте</h2>
      <div className="proj__steps">
        <div className="proj__step">
          <h3 className="proj__step-header">Дипломный проект включал 5 этапов</h3>
          <p className="proj__step-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="proj__step">
          <h3 className="proj__step-header">На выполнение диплома ушло 5 недель</h3>
          <p className="proj__step-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
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
