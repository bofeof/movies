import './InfoPopUp.css';

export default function InfoPopUp({ isOpen, onClose, message, title }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}>
          {}
        </button>
        <div className="popup__info">
          <div className="popup__info-status popup__info-err" />
          <h3 className="popup__info-text">{title}</h3>
          <p className="popup__message">{message}</p>
        </div>
      </div>
    </div>
  );
}
