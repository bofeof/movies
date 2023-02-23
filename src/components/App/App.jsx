import './App.css';

import Header from '../Header/Header';
import PromoIntroduction from '../PromoIntroduction/PromoIntroduction';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function App() {
  return (
    <div className="app">
      <Header />
      <PromoIntroduction />
      <NavTab />
      <AboutProject />
      <Techs />
    </div>
  );
}

export default App;
