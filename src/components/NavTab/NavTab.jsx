import './NavTab.css';

export default function NavTab() {
  return (
    <div className="navtab">
      <ul className="navtab__bar">
        <li >
          <a className='navtab__link' href="/">О проекте</a>
        </li>
        <li >
          <a className='navtab__link' href="/">Технологии</a>
        </li>
        <li >
          <a className='navtab__link' href="/">Студент</a>
        </li>
      </ul>
    </div>
  );
}
