import './App.css';

import Header from '../Header/Header';
import PromoIntroduction from '../PromoIntroduction/PromoIntroduction';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function App() {
  return (
    <div className="app">
      <Header />
      <PromoIntroduction />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  );
}

export default App;
