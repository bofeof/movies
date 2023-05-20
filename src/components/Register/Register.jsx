import './Register.css';
import { useCallback } from 'react';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Register({ registerOption }) {
  function redirectToAuth(evt) {
    evt.preventDefault();
    registerOption.onRedirectToAuth();
  }

  const redirectToMain = useCallback(
    (evt) => {
      evt.preventDefault();
      registerOption.onRedirectToMain();
    },
    [registerOption.onRedirectToMain]
  );

  return (
    <div className="register">
      <IdentityForm
        header="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        askSignIn={
          <p className="identity__question">
            Уже зарегистрированы?{' '}
            <button type="button" className="identity__question-button identity__signup" onClick={redirectToAuth}>
              Войти
            </button>
          </p>
        }
        isRegisterForm
        onRedirectToMain={redirectToMain}
        onHandleSubmit={registerOption.onUserRegister}
      />
    </div>
  );
}
