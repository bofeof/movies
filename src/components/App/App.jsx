import './App.css';

import Header from '../Header/Header';
import PromoIntroduction from '../PromoIntroduction/PromoIntroduction';
import NavTab from '../NavTab/NavTab';

function App() {
  return (
    <div className="app">
      <Header />
      <PromoIntroduction />
      <NavTab />
      {/* Promo — компонент с вёрсткой баннера страницы «О проекте».
NavTab — компонент с навигацией по странице «О проекте».
AboutProject — компонент с описанием дипломного проекта.
Techs — компонент с использованными технологиями.
AboutMe — компонент с информацией о студенте.
Portfolio — компонент со ссылками на другие проекты. */}
    </div>
  );
}

export default App;
