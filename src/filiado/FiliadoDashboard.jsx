// src/filiado/FiliadoDashboard.jsx
import { Link } from "react-router-dom";
import FiliadoEvents from "./FiliadoEvents";

export default function FiliadoDashboard({ logo }) {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__left">
          <img src={logo} alt="FaciliTur" className="admin-header__logo" />
          <div className="admin-header__text">
            <span className="admin-header__title">Portal dos Filiados</span>
            <span className="admin-header__subtitle">
              Criação e acompanhamento de eventos municipais
            </span>
          </div>
        </div>

        <div className="admin-header__right">
          <Link to="/" className="admin-header__back-btn">
            ← Voltar para o site
          </Link>
        </div>
      </header>

      <main className="admin-main">
        <FiliadoEvents />
      </main>
    </div>
  );
}
