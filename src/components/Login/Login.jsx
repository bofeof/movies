import './Login.css';
import { useCallback } from 'react';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login({ loginOptions }) {

  function redirectToAuth(evt) {
    evt.preventDefault();
    loginOptions.onRedirectToAuth();
  }

  const redirectToMain = useCallback(
    (evt) => {
      evt.preventDefault();
      loginOptions.onRedirectToMain();
    },
    [loginOptions.onRedirectToMain]
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
        onHandleSubmit={loginOptions.onLoggedIn}
      />
    </div>
  );
}
