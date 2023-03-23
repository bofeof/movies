import './Login.css';
import { useCallback } from 'react';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login({ onRedirectToMain, onHandleLoggedIn, onRedirectToAuth }) {
  function redirectToAuth(evt) {
    evt.preventDefault();
    onRedirectToAuth();
  }

  const redirectToMain = useCallback(
    (evt) => {
      evt.preventDefault();
      onRedirectToMain();
    },
    [onRedirectToMain]
  );

  return (
    <div className="login">
      <IdentityForm
        header="Рады видеть"
        buttonName="Войти"
        askSignIn={
          <p className="identity__question">
            Ещё не зарегистрированы?{' '}
            <button type="button" className="identity__question-button identity__signin" onClick={redirectToAuth}>
              Регистрация
            </button>
          </p>
        }
        isRegisterForm={false}
        onRedirectToMain={redirectToMain}
        onHandleSubmit={onHandleLoggedIn}
      />
    </div>
  );
}
