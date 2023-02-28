import './App.css';

// import Header from '../Header/Header';
import Main from '../Main/Main';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
// import Login from '../Login/Login';
// import Register from '../Register/Register';

// import Footer from '../Footer/Footer';

const userLogIn = true;

function App() {
  return (
    <div className="app">
      {/* <Header /> */}

      {userLogIn ? (
        // <Movies isSavedSection={false} />
        // <SavedMovies isSavedSection />
        <Profile />
        // <Login />
        // <Register />

      ) : (
        <Main />
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
