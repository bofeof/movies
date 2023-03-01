import './IdentityForm.css';
import headerLogo from '../../images/logo/logo.svg';

export default function IdentityForm({ header, buttonName, askSignIn, isRegisterForm, onRedirectToMain }) {
  return (
    <div className="identity">
      <div className="identity__greeting">
        <button className="identity__logo-button" type='button' onClick={onRedirectToMain}>
          <img className="identity__logo-img" src={headerLogo} alt="Логотип сайта" />
        </button>

        <h3 className="identity__header">{header}</h3>
      </div>

      <form className="identity__form" noValidate>
        <label className="identity__form-label" htmlFor="name" style={{ display: !isRegisterForm ? 'none' : null }}>
          Имя
          <input
            className="identity__form-input"
            type="text"
            name="name"
            autoComplete="username"
            id="name"
            placeholder="Имя"
            required="required"
            minLength="2"
            maxLength="30"
          />
        </label>
        <span className="identity__input-error" style={{ display: !isRegisterForm ? 'none' : null }}>
          {}
        </span>

        <label className="identity__form-label" htmlFor="email">
          E-mail
          <input
            className="identity__form-input"
            type="email"
            name="email"
            autoComplete="username"
            id="email"
            placeholder="E-mail"
            required="required"
          />
        </label>
        <span className="identity__input-error">{}</span>

        <label className="identity__form-label" htmlFor="password">
          Пароль
          <input
            className="identity__form-input"
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            minLength="6"
            placeholder="Пароль"
            required="required"
          />
        </label>
        <span className="identity__input-error">Что-то пошло не так...</span>
      </form>

      <div className="identity__buttons">
        <button type="button" className="identity__form-button">
          {buttonName}
        </button>
        {askSignIn}
      </div>
    </div>
  );
}
