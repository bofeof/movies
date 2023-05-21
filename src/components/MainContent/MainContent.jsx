import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function MainContent(props) {
  return (
    <>
      {props.isHeaderRequired && (
        <Header
          loggedIn={props.headerOptions.loggedIn}
          onRedirectToMain={props.headerOptions.onRedirectToMain}
          onRedirectToMovies={props.headerOptions.onRedirectToMovies}
          onRedirectToSavedMovies={props.headerOptions.onRedirectToSavedMovies}
          onRedirectToProfile={props.headerOptions.onRedirectToProfile}
          onRedirectToSignIn={props.headerOptions.onRedirectToSignIn}
          onRedirectToSignUp={props.headerOptions.onRedirectToSignUp}
        />
      )}

      <main>{props.element}</main>

      {props.isFooterRequired && <Footer/>}
    </>
  );
}
