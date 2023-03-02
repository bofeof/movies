import './HeaderLoggedIn.css';
import { useCallback, useEffect, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function HeaderLoggedIn({
  onRedirectToMain,
  onRedirectToMovies,
  onRedirectToSavedMovies,
  onRedirectToProfile,
}) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  const handleOpenMenu = useCallback(() => {
    setMenuOpened(!menuOpened);
  }, [menuOpened]);

  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowWidth > 768 ? (
    <>
      <button type="button" className="header__movies-button" onClick={onRedirectToMovies}>
        Фильмы
      </button>
      <button type="button" className="header__saved-button" onClick={onRedirectToSavedMovies}>
        Сохранённые фильмы
      </button>
      <button type="button" className="header__account-button" onClick={onRedirectToProfile}>
        Аккаунт
      </button>
    </>
  ) : (
    // burger menu
    <>
      <button type="button" className="header__menu" onClick={handleOpenMenu}>
        <span className="header__menu-line" />
        <span className="header__menu-line" />
        <span className="header__menu-line" />
      </button>
      <BurgerMenu
        menuOpened={menuOpened}
        onCloseMenu={handleOpenMenu}
        onRedirectToMain={onRedirectToMain}
        onRedirectToMovies={onRedirectToMovies}
        onRedirectToSavedMovies={onRedirectToSavedMovies}
        onRedirectToProfile={onRedirectToProfile}
      />
    </>
  );
}
