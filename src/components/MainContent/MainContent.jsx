import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function MainContent(props) {
  return (
    <>
      {props.isHeaderRequired && (
        <Header
          loggedIn={props.headerOptions.loggedIn}
          onRedirectToMain={props.headerOptions.handleRedirectToMain}
          onRedirectToMovies={props.headerOptions.handleRedirectToMovies}
          onRedirectToSavedMovies={props.headerOptions.handleRedirectToSavedMovies}
          onRedirectToProfile={props.headerOptions.handleRedirectToProfile}
          onRedirectToSignIn={props.headerOptions.handleRedirectToSignIn}
          onRedirectToSignUp={props.headerOptions.handleRedirectToSignUp}
        />
      )}

      <main>{props.element}</main>

      {props.isFooterRequired && <Footer/>}
    </>
  );
}
