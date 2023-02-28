import './Login.css';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login() {
  return (
    <div className="login">
      <IdentityForm
        header="Рады видеть"
        buttonName="Войти"
        askSignIn={
          <p className="identity__question">
            Ещё не зарегистрированы?{' '}
            <a className="identity__question-link identity__signin" href="./">
              Регистрация
            </a>
          </p>
        }
        isRegisterForm={false}
      />
    </div>
  );
}
