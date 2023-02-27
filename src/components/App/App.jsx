import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
// import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

// const userLogIn = useContext(LoggedInContext);
const userLogIn = true;

function App() {
  return (
    <div className="app">
      <Header />

      {userLogIn ? (
        // <Movies isSavedSection={false} />
        <SavedMovies isSavedSection />
      ) : (
        <Main />
      )}
      <Footer />
    </div>
  );
}

export default App;
