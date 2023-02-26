
import './Header.css';

import HeaderLoggedIn from './HeaderLoggedIn/HeaderLoggedIn';
import headerLogo from '../../images/logo/logo.svg';

export default function Header() {

  // const userLogIn = useContext(LoggedInContext);
  const userLogIn = false;

  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo-img" src={headerLogo} alt="Логотип сайта" />
      </div>
      <div className="header__navigation">

        {userLogIn ? (
          <HeaderLoggedIn />
        )  : (
          <>
            <button type="button" className="header__button header__signup">
              Регистрация
            </button>
            <button type="button" className="header__button header__signin">
              Войти
            </button>
        </>
        )}

      </div>
    </header>
  );
}
