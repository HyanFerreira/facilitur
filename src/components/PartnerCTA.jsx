export default function PartnerCTA({ background }) {
  return (
    <section
      className="partner-cta"
      id="parceiros"
      style={{ "--partner-bg": `url(${background})` }}
    >
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
  );
}
