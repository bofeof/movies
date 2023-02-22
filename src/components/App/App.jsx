import './App.css';

import Header from '../Header/Header';
import PromoIntroduction from '../PromoIntroduction/PromoIntroduction';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function App() {
  return (
    <div className="app">
      <Header />
      <PromoIntroduction />
      <NavTab />
      <AboutProject />
    </div>
  );
}

export default App;
