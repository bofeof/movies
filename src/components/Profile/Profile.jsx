import './Profile.css';

export default function Profile() {
  return (
    <div className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
      <form className="profile__form" noValidate>
        <label className="profile__form-label" htmlFor="profile-name">
          Имя
          <input
            className="profile__form-input"
            type="text"
            id="profile-name"
            required
            minLength="2"
            maxLength="30"
            placeholder="Введите имя"
          />
        </label>
        <span className="profile__input-error">{}</span>

        <label className="profile__form-label" htmlFor="profile-email">
          E-mail
          <input className="profile__form-input" type="email" id="profile-email" required placeholder="Введите почту" />
        </label>
        <span className="profile__input-error">{}</span>
      </form>

      <button className="profile__button profile__button-edit" type="submit">
        Редактировать
      </button>
      <button className="profile__button profile__button-signout" type="button">
        Выйти из аккаунта
      </button>
    </div>
  );
}
