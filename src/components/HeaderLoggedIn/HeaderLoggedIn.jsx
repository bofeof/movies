import './HeaderLoggedIn.css';
import { useCallback, useEffect, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function HeaderLoggedIn() {
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
      <button type="button" className="header__movies-button">
        Фильмы
      </button>
      <button type="button" className="header__saved-button">
        Сохранённые фильмы
      </button>
      <button type="button" className="header__account-button">
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
      <BurgerMenu menuOpened={menuOpened} onCloseMenu={handleOpenMenu} />
    </>
  );
}
