import './Login.css';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login({ onRedirectToMain, onHandleLoggedIn, onRedirectToAuth }) {


  function redirectToAuth(evt){
    evt.preventDefault();
    onRedirectToAuth();
  }

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
        onRedirectToMain={onRedirectToMain}
        onHandleSubmit={onHandleLoggedIn}
      />
    </div>
  );
}
