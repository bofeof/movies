import './InfoPopUp.css';

export default function InfoPopUp() {
  return (
    <div className="popup">
      <div className="popup__container">
        <button type="button" className="popup__close-button">
          {}
        </button>
        <div className="popup__info">
          <div className="popup__info-status popup__info-err" />
          <h3 className="popup__info-text">Что-то пошло не так!</h3>
          <p className="popup__message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, quos labore. Voluptas animi velit
            voluptate, vero optio cupiditate commodi quasi expedita corporis incidunt deleniti quidem praesentium, porro
            ratione inventore assumenda!
          </p>
        </div>
      </div>
    </div>
  );
}
