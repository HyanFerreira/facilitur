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
          <a className="pill pill--primary" href="#admin">
            Portal do Administrador
          </a>
          <a className="pill pill--primary" href="#filiados">
            Portal dos filiados
          </a>
        </div>
      </div>
    </header>
  );
}
