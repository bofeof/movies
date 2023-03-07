import './Register.css';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Register({ onRedirectToMain, onHandleUserRegister, onRedirectToAuth }) {
  function redirectToAuth(evt) {
    evt.preventDefault();
    onRedirectToAuth();
  }

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
        onRedirectToMain={onRedirectToMain}
        onHandleSubmit={onHandleUserRegister}
      />
    </div>
  );
}
