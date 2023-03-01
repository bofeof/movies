import './Register.css';
import IdentityForm from '../IdentityForm/IdentityForm';

export default function Login() {
  return (
    <div className="register">
      <IdentityForm
        header="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        askSignIn={
          <p className="identity__question">
            Уже зарегистрированы?{' '}
            <button type="button" className="identity__question-button identity__signup">
              Войти
            </button>
          </p>
        }
        isRegisterForm
      />
    </div>
  );
}
