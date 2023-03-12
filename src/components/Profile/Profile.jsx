/* eslint-disable react/destructuring-assignment */
import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import formValidator from '../../utils/formValidator';

export default function Profile({ onHandleSubmit, onHandleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const [userInfo, setUserInfo] = useState({ currentUser });

  const [inputsValidation, setInputsValidation] = useState({
    name: { isValid: false, errorText: '' },
    email: { isValid: false, errorText: '' },
  });

  const buttonStatus = ![inputsValidation.email.isValid, inputsValidation.name.isValid].includes(false);

  useEffect(() => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: currentUser.name,
      email: currentUser.email,
    }));

    setInputsValidation((prevInuptsValidation) => ({
      ...prevInuptsValidation,
      name: { isValid: true, errorText: '' },
      email: { isValid: true, errorText: '' },
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
    onHandleSubmit({ name: userInfo.name, email: userInfo.email });
  }

  return (
    <div className="profile">
      <p className="profile__greeting">{`Привет, ${currentUser.name}`}</p>
      <form className="profile__form" noValidate>
        <label className="profile__form-label" htmlFor="profile-name">
          Имя
          <input
            className={`profile__form-input ${!inputsValidation.name.isValid && 'profile__form-input_error'}`}
            type="text"
            name="name"
            id="profile-name"
            // pattern="^.[a-zа-я\ \-]{2,30}$"
            required
            minLength="2"
            maxLength="30"
            placeholder="Введите имя"
            onChange={handleInputChange}
            value={userInfo.name || ''}
          />
        </label>
        <span className="profile__input-error">{inputsValidation.name.errorText}</span>

        <label className="profile__form-label" htmlFor="profile-email">
          E-mail
          <input
            className={`profile__form-input ${!inputsValidation.email.isValid && 'profile__form-input_error'}`}
            type="email"
            id="profile-email"
            name="email"
            required
            placeholder="Введите почту"
            onChange={handleInputChange}
            value={userInfo.email || ''}
          />
        </label>
        <span className="profile__input-error">{inputsValidation.email.errorText}</span>
      </form>

      <button
        className="profile__button profile__button-edit"
        type="submit"
        onClick={handleFormSubmit}
        disabled={!buttonStatus}
      >
        Редактировать
      </button>
      <button className="profile__button profile__button-signout" type="button" onClick={onHandleLogOut}>
        Выйти из аккаунта
      </button>
    </div>
  );
}
