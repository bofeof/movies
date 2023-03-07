import './IdentityForm.css';
import { useState, useEffect } from 'react';
import headerLogo from '../../images/logo/logo.svg';

import formValidator from '../../utils/formValidator';

export default function IdentityForm({
  header,
  buttonName,
  askSignIn,
  isRegisterForm,
  onRedirectToMain,
  onHandleSubmit,
}) {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });

  const [inputsValidation, setInputsValidation] = useState({
    name: { isValid: false, errorText: '' },
    email: { isValid: false, errorText: '' },
    password: { isValid: false, errorText: '' },
  });

  let buttonStatus;

  if (isRegisterForm) {
    buttonStatus = ![
      inputsValidation.name.isValid,
      inputsValidation.email.isValid,
      inputsValidation.password.isValid,
    ].includes(false);
  } else {
    buttonStatus = ![inputsValidation.email.isValid, inputsValidation.password.isValid].includes(false);
  }

  useEffect(() => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: '',
      email: '',
      password: '',
    }));

    setInputsValidation((prevInuptsValidation) => ({
      ...prevInuptsValidation,
      name: { isValid: false, errorText: '' },
      email: { isValid: false, errorText: '' },
      password: { isValid: false, errorText: '' },
    }));
  }, []);

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    const validationResult = formValidator(evt);
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    setInputsValidation((prevInuptsValidation) => ({
      ...prevInuptsValidation,
      [name]: {
        isValid: validationResult.isValid,
        errorText: validationResult.errorText,
      },
    }));
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    if (isRegisterForm) {
      onHandleSubmit({ password: userInfo.password, email: userInfo.email, name: userInfo.name });
    } else {
      onHandleSubmit({ password: userInfo.password, email: userInfo.email });
    }
  }

  return (
    <div className="identity">
      <div className="identity__greeting">
        <button className="identity__logo-button" type="button" onClick={onRedirectToMain}>
          <img className="identity__logo-img" src={headerLogo} alt="Логотип сайта" />
        </button>

        <h3 className="identity__header">{header}</h3>
      </div>

      <form className="identity__form" noValidate>
        <label className="identity__form-label" htmlFor="name" style={{ display: !isRegisterForm ? 'none' : null }}>
          Имя
          <input
            className={`identity__form-input ${!inputsValidation.name.isValid && 'identity__form-input_error'}`}
            type="text"
            name="name"
            autoComplete="username"
            id="name"
            placeholder="Имя"
            required="required"
            minLength="2"
            maxLength="30"
            value={userInfo.name}
            onChange={handleInputChange}
          />
        </label>
        <span className="identity__input-error" style={{ display: !isRegisterForm ? 'none' : null }}>
          {inputsValidation.name.errorText}
        </span>

        <label className="identity__form-label" htmlFor="email">
          E-mail
          <input
            className={`identity__form-input ${!inputsValidation.email.isValid && 'identity__form-input_error'}`}
            type="email"
            name="email"
            autoComplete="username"
            id="email"
            placeholder="E-mail"
            required="required"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </label>
        <span className="identity__input-error">{inputsValidation.email.errorText}</span>

        <label className="identity__form-label" htmlFor="password">
          Пароль
          <input
            className={`identity__form-input ${!inputsValidation.password.isValid && 'identity__form-input_error'}`}
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            // minLength="6"
            placeholder="Пароль"
            required="required"
            value={userInfo.password}
            onChange={handleInputChange}
          />
        </label>
        <span className="identity__input-error">{inputsValidation.password.errorText}</span>
      </form>

      <div className="identity__buttons">
        <button type="button" className="identity__form-button" onClick={handleFormSubmit} disabled={!buttonStatus}>
          {buttonName}
        </button>
        {askSignIn}
      </div>
    </div>
  );
}
