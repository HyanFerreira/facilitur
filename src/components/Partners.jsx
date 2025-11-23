export default function Partners({ partners = [] }) {
  return (
    <section className="partners">
      <div className="container partners__container">
        <div className="partners__marquee" aria-label="Parceiros">
          <div className="partners__track">
            {/* Grupo 1 */}
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

            {/* Grupo 2 (cópia perfeita) */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
