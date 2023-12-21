import './Footer.css';

export default function Footer() {
  const currentYear = new Date;
  return (
    <footer className="footer">
      <p className="footer__paragraph">Beat Film Festival x bofeof</p>
      <div className="footer__description">
        <p className="footer__year">{currentYear.getFullYear().toString()}</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://github.com/bofeof" target="_blank" rel="noreferrer">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
