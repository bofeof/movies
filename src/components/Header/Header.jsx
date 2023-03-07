import './Header.css';

import HeaderLoggedIn from '../HeaderLoggedIn/HeaderLoggedIn';
import headerLogo from '../../images/logo/logo.svg';

export default function Header({
  loggedIn,
  onRedirectToMain,
  onRedirectToMovies,
  onRedirectToSavedMovies,
  onRedirectToProfile,
  onRedirectToSignIn,
  onRedirectToSignUp,
}) {
  return (
    <header className="header">
      <div className="header__logo">
        <button className="header__logo-button" type="button" onClick={onRedirectToMain}>
          <img className="header__logo-img" src={headerLogo} alt="Логотип сайта" />
        </button>
      </div>
      <div className="header__navigation">
        {loggedIn ? (
          <HeaderLoggedIn
            onRedirectToMain={onRedirectToMain}
            onRedirectToMovies={onRedirectToMovies}
            onRedirectToSavedMovies={onRedirectToSavedMovies}
            onRedirectToProfile={onRedirectToProfile}
          />
        ) : (
          <>
            <button type="button" className="header__button header__signup" onClick={onRedirectToSignUp}>
              Регистрация
            </button>
            <button type="button" className="header__button header__signin" onClick={onRedirectToSignIn}>
              Войти
            </button>
          </>
        )}
      </div>
    </header>
  );
}
