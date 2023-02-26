import './HeaderLoggedIn.css';

import { useEffect, useState } from 'react';

export default function HeaderLoggedIn() {
  // check window size
  const [windowWidth, setWindowWidth] = useState();

  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowWidth >= 768 ? (
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
    <div className="header__menu">
      <span className="header__menu-line" />
      <span className="header__menu-line" />
      <span className="header__menu-line" />
    </div>
  );
}
