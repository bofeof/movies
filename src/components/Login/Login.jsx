import './Login.css';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login({ onRedirectToMain }) {
  return (
    <div className="login">
      <IdentityForm
        header="Рады видеть"
        buttonName="Войти"
        askSignIn={
          <p className="identity__question">
            Ещё не зарегистрированы?{' '}
            <button type="button" className="identity__question-button identity__signin">
              Регистрация
            </button>
          </p>
        }
        isRegisterForm={false}
        onRedirectToMain={onRedirectToMain}
      />
    </div>
  );
}
