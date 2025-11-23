export default function About({ icons = [] }) {
  const blocks = [
    {
      title: "O que é o FaciliTur?",
      text: (
        <>
          O FaciliTur é o sistema que transforma
          <br />
          a gestão de eventos municipais. Governo
          <br />
          e parceiros criam e divulgam eventos
          <br />
          em tempo real, enquanto a população
          <br />
          recebe tudo organizado pela newsletter.
        </>
      ),
      tags: ["Dados ampliados", "Políticas públicas", "Gestão integrada"],
    },
    {
      title: "Nossa missão",
      text: (
        <>
          Desenvolver e implementar tecnologias
          <br />
          sustentáveis efetivas para solucionar
          <br />
          problemas nos setores turísticos de
          <br />
          municípios de maneira acessível.
        </>
      ),
      tags: ["Sustentável", "Acessível", "Intuitivo"],
    },
    {
      title: "Nossa visão",
      text: (
        <>
          Impactar positivamente a qualidade
          <br />
          de vida dentro dos municípios por
          <br />
          meio de soluções tecnológicas
          <br />
          acessíveis e inovadoras.
        </>
      ),
      tags: ["Impacto positivo", "Tecnologia útil", "Inovação"],
    },
    {
      title: "Nossos valores",
      text: (
        <>
          Compromisso com tecnologia sustentável,
          <br />
          transparência na atuação, acesso
          <br />
          democratizado à informação e
          <br />
          experiência personalizada para todos.
        </>
      ),
      tags: ["Transparência", "Democratização", "Personalização"],
    },
    {
      title: "Melhor avaliação",
      text: (
        <>
          "O FaciliTur acabou com minha
          <br />
          desorganização! Recebo emails
          <br />
          semanais lindos e organizados,
          <br />
          já fui em eventos que perderia."
        </>
      ),
      tags: ["Organização", "Email semanal", "Recomendado"],
    },
  ];

  return (
    <section className="about" id="sobre">
      <div className="container about__stack">
        <div className="about__line" />

        <div className="about__rows">
          {blocks.map((b, i) => (
            <div className="about__row" key={i}>
              <article className="about__item">
                <div className="about__dot about__dot--mid" />
                <h3 className="about__title">{b.title}</h3>
                <p className="about__text">{b.text}</p>

                <div className="about__tags">
                  {b.tags.map((t, idx) => (
                    <span key={idx}>
                      {t}
                      {idx < b.tags.length - 1 && (
                        <span className="about__chev"> {">"} </span>
                      )}
                    </span>
                  ))}
                </div>
              </article>

              <div className="about__icon-pack">
                <div className="about__bubble about__bubble--sm" />
                <div className="about__bubble about__bubble--md" />
                <div className="about__icon-circle">
                  <span className="about__icon-placeholder">
                    {icons[i] ? <img src={icons[i]} alt="" /> : "ICON"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
