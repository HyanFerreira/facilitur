// src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header({ logo }) {
  return (
    <header className="header">
      <div className="container header__content">
        <div className="brand">
          <img src={logo} alt="FaciliTur" className="brand__logo" />
        </div>

        <nav className="nav">
          <a className="nav__link nav__link--active" href="#home">
            HOME
          </a>
          <a className="nav__link" href="#sobre">
            SOBRE
          </a>
          <a className="nav__link" href="#parceiros">
            PARCEIROS
          </a>
          <a className="nav__link" href="#newsletter">
            CONTATO
          </a>
        </nav>

        <div className="header__actions">
          <Link className="pill pill--primary" to="/admin/login">
            Portal do Administrador
          </Link>
          <Link className="pill pill--primary" to="/filiado/login">
            Portal dos Filiados
          </Link>
        </div>
      </div>
    </header>
  );
}
