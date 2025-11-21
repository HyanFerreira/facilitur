import "./App.css";

import logoHorizontal from "./assets/img/logotipo/logotipo_horizontal.svg";
import heroBolasCelular from "./assets/img/hero/app_celular.png";

import icon1 from "./assets/img/icons/icon_1.svg";
import icon2 from "./assets/img/icons/icon_2.svg";
import icon3 from "./assets/img/icons/icon_3.svg";
import icon4 from "./assets/img/icons/icon_4.svg";
import icon5 from "./assets/img/icons/icon_5.svg";

import aws from "./assets/img/partners/aws.png";
import bertioga from "./assets/img/partners/bertioga.png";
import caraguatatuba from "./assets/img/partners/caraguatatuba.png";
import ilhabela from "./assets/img/partners/ilhabela.png";
import rnr from "./assets/img/partners/rnr.png";
import saoPaulo from "./assets/img/partners/sao_paulo.png";
import saoSeba from "./assets/img/partners/sao_seca.png";
import ubatuba from "./assets/img/partners/ubatuba.png";

import fogueteMaluko from "./assets/img/foguete_maluko.png";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="container header__content">
          <div className="brand">
            <img src={logoHorizontal} alt="FaciliTur" className="brand__logo" />
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
            <a className="nav__link" href="#contato">
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
      <main className="hero" id="home">
        <div className="container hero__content">
          <section className="hero__left">
            <h1 className="hero__title">
              Em breve FaciliTur
              <br />
              na palma da sua
              <br />
              mão!
            </h1>

            <p className="hero__subtitle">
              Assine a newsletter e fique por dentro dos
              <br />
              eventos da sua cidade
            </p>

            <button className="hero__cta">Quero assinar a newsletter!</button>
          </section>

          <section className="hero__right" aria-hidden="true">
            <img src={heroBolasCelular} alt="" className="hero__image" />
          </section>
        </div>
      </main>

      {/* ============ SOBRE ============ */}
      <section className="about" id="sobre">
        <div className="container about__stack">
          <div className="about__line" />

          <div className="about__rows">
            <div className="about__row">
              <article className="about__item">
                <div className="about__dot about__dot--top" />
                <h2 className="about__title">O que é o FaciliTur?</h2>
                <p className="about__text">
                  O FaciliTur é o sistema que transforma
                  <br />
                  a gestão de eventos municipais. Governo
                  <br />
                  e parceiros criam e divulgam eventos
                  <br />
                  em tempo real, enquanto a população
                  <br />
                  recebe tudo organizado pela newsletter.
                </p>

                <div className="about__tags">
                  <span>Dados ampliados</span>
                  <span className="about__chev">{">"}</span>
                  <span>Políticas públicas</span>
                  <span className="about__chev">{">"}</span>
                  <span>Gestão integrada</span>
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    <img src={icon1} alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="about__row">
              <article className="about__item">
                <div className="about__dot about__dot--mid" />
                <h3 className="about__title">Nossa missão</h3>
                <p className="about__text">
                  Desenvolver e implementar tecnologias
                  <br />
                  sustentáveis efetivas para solucionar
                  <br />
                  problemas nos setores turísticos de
                  <br />
                  municípios de maneira acessível.
                </p>

                <div className="about__tags">
                  <span>Sustentável</span>
                  <span className="about__chev">{">"}</span>
                  <span>Acessível</span>
                  <span className="about__chev">{">"}</span>
                  <span>Intuitivo</span>
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    <img src={icon2} alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="about__row">
              <article className="about__item">
                <div className="about__dot about__dot--mid" />
                <h3 className="about__title">Nossa visão</h3>
                <p className="about__text">
                  Impactar positivamente a qualidade
                  <br />
                  de vida dentro dos municípios por
                  <br />
                  meio de soluções tecnológicas
                  <br />
                  acessíveis e inovadoras.
                </p>

                <div className="about__tags">
                  <span>Impacto positivo</span>
                  <span className="about__chev">{">"}</span>
                  <span>Tecnologia útil</span>
                  <span className="about__chev">{">"}</span>
                  <span>Inovação</span>
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    <img src={icon3} alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="about__row">
              <article className="about__item">
                <div className="about__dot about__dot--mid" />
                <h3 className="about__title">Nossos valores</h3>
                <p className="about__text">
                  Compromisso com tecnologia sustentável,
                  <br />
                  transparência na atuação, acesso
                  <br />
                  democratizado à informação e
                  <br />
                  experiência personalizada para todos.
                </p>

                <div className="about__tags">
                  <span>Transparência</span>
                  <span className="about__chev">{">"}</span>
                  <span>Democratização</span>
                  <span className="about__chev">{">"}</span>
                  <span>Personalização</span>
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    <img src={icon4} alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="about__row">
              <article className="about__item">
                <div className="about__dot about__dot--mid" />
                <h3 className="about__title">Melhor avaliação</h3>
                <p className="about__text">
                  "O FaciliTur acabou com minha
                  <br />
                  desorganização! Recebo emails
                  <br />
                  semanais lindos e organizados,
                  <br />
                  já fui em eventos que perderia."
                </p>

                <div className="about__tags">
                  <span>Organização</span>
                  <span className="about__chev">{">"}</span>
                  <span>Email semanal</span>
                  <span className="about__chev">{">"}</span>
                  <span>Recomendado</span>
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    <img src={icon5} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARCEIROS ============ */}
      <section className="partners">
        <div className="container partners__container">
          <div className="partners__marquee" aria-label="Parceiros">
            <div className="partners__track">
              {(() => {
                const partners = [
                  { src: saoPaulo, alt: "São Paulo" },
                  { src: caraguatatuba, alt: "Caraguatatuba" },
                  { src: aws, alt: "AWS" },
                  { src: saoSeba, alt: "São Sebastião" },
                  { src: ubatuba, alt: "Ubatuba" },
                  { src: rnr, alt: "RnR" },
                  { src: ilhabela, alt: "Ilhabela" },
                  { src: bertioga, alt: "Bertioga" },
                ];

                return (
                  <>
                    <div className="partners__group">
                      {partners.map((p, i) => (
                        <img
                          key={`p1-${i}`}
                          src={p.src}
                          alt={p.alt}
                          className="partners__logo"
                          loading="lazy"
                        />
                      ))}
                    </div>

                    <div className="partners__group" aria-hidden="true">
                      {partners.map((p, i) => (
                        <img
                          key={`p2-${i}`}
                          src={p.src}
                          alt=""
                          className="partners__logo"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARCEIROS CTA ============ */}
      <section className="partner-cta" id="parceiros">
        <div className="container partner-cta__container">
          <div className="partner-cta__content">
            <h2 className="partner-cta__title">
              Eventos de
              <br />
              sucesso, gestão
              <br />
              sem
              <br />
              complicação.
            </h2>

            <p className="partner-cta__text">
              A sua cidade vai ficar de fora? Não
              <br />
              gerencie eventos. Conquiste-os.
            </p>

            <button className="partner-cta__btn">
              Quero me tornar parceiro!
            </button>
          </div>
        </div>
      </section>

      {/* ================ NEWSLETTER / CONTATO ================ */}
      <section className="newsletter" id="contato">
        <div className="container newsletter__grid">
          {/* LEFT */}
          <div className="newsletter__left">
            <h2 className="newsletter__title">
              Receba nossos eventos em tempo real!
            </h2>

            <p className="newsletter__subtitle">
              Cadastre-se e fique por dentro de todas eventos da
              <br />
              cidade
            </p>

            <form className="newsletter__form">
              {/* Linha 1: Nome + Email */}
              <div className="newsletter__row newsletter__row--two">
                <div className="field">
                  <label className="field__label">NOME</label>
                  <div className="field__input-wrap">
                    <span className="field__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input className="field__input" type="text" />
                  </div>
                </div>

                <div className="field">
                  <label className="field__label">EMAIL</label>
                  <div className="field__input-wrap">
                    <span className="field__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </span>
                    <input className="field__input" type="email" />
                  </div>
                </div>
              </div>

              {/* Linha 2: Celular */}
              <div className="newsletter__row">
                <div className="field field--full">
                  <label className="field__label">CELULAR</label>
                  <div className="field__input-wrap">
                    <span className="field__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input className="field__input" type="tel" />
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <label className="newsletter__check">
                <input type="checkbox" />
                <span>
                  EU ACEITO RECEBER EMAILS E CONCORDO COM OS TERMOS DE USO E
                  PRIVACIDADE DA EMPRESA.
                </span>
              </label>

              {/* Botão */}
              <button type="button" className="newsletter__btn">
                CADASTRAR
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="newsletter__right" aria-hidden="true">
            <img
              src={fogueteMaluko}
              alt=""
              className="newsletter__rocket"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
