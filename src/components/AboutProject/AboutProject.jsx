import './AboutProject.css';

export default function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__steps">
        <div className="about-project__step">
          <h3>Дипломный проект включал 5 этапов</h3>
          <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__step">
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div>
        <p>1 неделя</p>
        <p>4 недели</p>
      </div>
      <div>
        <p>Back-end</p>
        <p>Front-end</p>
      </div>
    </div>
  );
}
