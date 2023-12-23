import './Techs.css';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__background">
        <h2 className="techs__header">Технологии</h2>
        <div className="techs__description">
          <h3 className="techs__description-header">7&nbsp;технологий</h3>
          <p className="techs__description-parargraph">
          которые были применены при разработке проекта
          </p>
          <ul className="techs__list">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
