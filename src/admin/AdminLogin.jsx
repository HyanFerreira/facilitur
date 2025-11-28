// src/admin/AdminLogin.jsx
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin({ logo }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // nada de validação: clicou, entrou
    navigate("/admin");
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <header className="admin-login__header">
          <img src={logo} alt="FaciliTur" className="admin-login__logo" />
          <h1 className="admin-login__title">Portal do Administrador</h1>
          <p className="admin-login__subtitle">
            Acesse a área interna para gerenciar eventos e filiados da sua
            cidade.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__field">
            <label className="admin-login__label">E-mail</label>
            <input
              type="email"
              className="admin-login__input"
              placeholder="exemplo@facilitur.com.br"
            />
          </div>

          <div className="admin-login__field">
            <label className="admin-login__label">Senha</label>
            <input
              type="password"
              className="admin-login__input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="admin-login__button">
            Entrar
          </button>
        </form>

        <div className="admin-login__footer">
          <Link to="/" className="admin-login__back-link">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
