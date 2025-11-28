// src/admin/AdminDashboard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminEvents from "./AdminEvents";
import AdminAffiliateEvents from "./AdminAffiliateEvents";
import AdminAffiliates from "./AdminAffiliates";

export default function AdminDashboard({ logo }) {
  const [tab, setTab] = useState("eventos");

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__left">
          <img src={logo} alt="FaciliTur" className="admin-header__logo" />
          <div className="admin-header__text">
            <span className="admin-header__title">Portal do Administrador</span>
            <span className="admin-header__subtitle">
              Gestão de eventos e filiados da Rede FaciliTur
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
        {/* Abas principais */}
        <div className="admin-tabs">
          <button
            type="button"
            className={
              "admin-tab" + (tab === "eventos" ? " admin-tab--active" : "")
            }
            onClick={() => setTab("eventos")}
          >
            Eventos
          </button>

          <button
            type="button"
            className={
              "admin-tab" + (tab === "filiados" ? " admin-tab--active" : "")
            }
            onClick={() => setTab("filiados")}
          >
            Filiados
          </button>

          <button
            type="button"
            className={
              "admin-tab" +
              (tab === "filiadosEventos" ? " admin-tab--active" : "")
            }
            onClick={() => setTab("filiadosEventos")}
          >
            Eventos dos Filiados
          </button>
        </div>

        <div className="admin-main__content">
          {tab === "eventos" && <AdminEvents />}

          {tab === "filiados" && <AdminAffiliates />}

          {tab === "filiadosEventos" && <AdminAffiliateEvents />}
        </div>
      </main>
    </div>
  );
}
