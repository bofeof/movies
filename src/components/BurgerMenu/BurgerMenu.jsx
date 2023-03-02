import './BurgerMenu.css';

export default function BurgerMenu({
  menuOpened,
  onCloseMenu,
  onRedirectToMain,
  onRedirectToMovies,
  onRedirectToSavedMovies,
  onRedirectToProfile,
}) {
  return (
    <div className={`burger-menu ${menuOpened ? 'burger-menu_opened' : ''}`}>
      <div className="burger-menu__container">
        <button className="burger-menu__close-button" type="button" onClick={onCloseMenu}>
          {}
        </button>
        <button className="burger-menu__button" type="button" onClick={onRedirectToMain}>
          Главная
        </button>
        <button className="burger-menu__button" type="button" onClick={onRedirectToMovies}>
          Фильмы
        </button>
        <button className="burger-menu__button" type="button" onClick={onRedirectToSavedMovies}>
          Сохранённые фильмы
        </button>
        <button type="button" className="burger-menu__account-button" onClick={onRedirectToProfile}>
          Аккаунт
        </button>
      </div>
    </div>
  );
}
