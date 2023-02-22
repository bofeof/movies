import './Header.css'
import headerLogo from '../../images/logo/logo.svg';

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="header__logo-img" src={headerLogo} alt="Логотип сайта" />
      </div>
      <div className="header__navigation">
        <button type="button" className="header__button header__signup">
          Регистрация
        </button>
        <button type="button" className="header__button header__signin">
          Войти
        </button>
      </div>
    </div>
  );
}
