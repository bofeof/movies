import './Register.css';
import IdentityForm from '../IdentityForm/IdentityForm';


export default function Login() {
  return (
    <div className='register'>
      <IdentityForm
        header="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        askSignIn={
          <p className="identity__question">
            Уже зарегистрированы?{' '}
            <a className="identity__question-link identity__signup" href="./">
              Войти
            </a>
          </p>
        }
        isRegisterForm
      />
    </div>
  );
}
