export default function Hero({ heroImg }) {
  return (
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
          <img src={heroImg} alt="" className="hero__image" />
        </section>
      </div>
    </main>
  );
}
