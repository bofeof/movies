import './BurgerMenu.css';

export default function BurgerMenu({ menuOpened, onCloseMenu }) {

  function handleCloseMenu(){
    onCloseMenu();
  }

  return (
    <div className={`burger-menu ${menuOpened ? 'burger-menu_opened' : ''}`}>
      <div className="burger-menu__container">
        <button className="burger-menu__close-button" type="button" onClick={handleCloseMenu}>
          {}
        </button>
        <button className="burger-menu__button" type="button">
          Главная
        </button>
        <button className="burger-menu__button" type="button">
          Фильмы
        </button>
        <button className="burger-menu__button" type="button">
          Сохранённые фильмы
        </button>
        <button type="button" className="burger-menu__account-button">
          Аккаунт
        </button>
      </div>
    </div>
  );
}
