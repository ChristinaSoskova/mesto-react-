import logo from "../../images/header-logo.svg";
import { withRouter, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип проекта" />
      {props.loggedIn 
        ? <ul className="header__links">
        <li className="header__email">{props.email}</li>
        <li><button onClick={props.onSignOut} className="header__button">Выйти</button></li>
                  </ul>
                : <Link
                to={props.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}
                className="header__auth-button">{props.location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}</Link>
        }
        </header>
  );
}

export default withRouter(Header);
