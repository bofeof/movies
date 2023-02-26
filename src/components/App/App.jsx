import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

// const userLogIn = useContext(LoggedInContext);
const userLogIn = true;

function App() {
  return (
    <div className="app">
      <Header />

      {userLogIn ? (
        <Movies/>
        // SavedMovies
        //
        //
        )  : (
          <Main />
        )}
      <Footer />
    </div>
  );
}

export default App;
