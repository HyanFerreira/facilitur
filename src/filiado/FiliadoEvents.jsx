// src/filiado/FiliadoEvents.jsx
import { useState } from "react";

const STATUS_LABEL = {
  pending: "Em análise",
  approved: "Aprovado",
  rejected: "Recusado",
};

const initialEvents = [
  {
    id: 1,
    name: "Festival de Inverno de Caraguatatuba",
    date: "20/07/2026",
    timeRange: "19:00–23:00",
    location: "Praça Cândido Mota – Centro",
    status: "approved",
  },
  {
    id: 2,
    name: "Feira Cultural Caiçara",
    date: "01/09/2026",
    timeRange: "09:00–17:00",
    location: "Orla da Praia do Centro",
    status: "pending",
  },
];

const emptyForm = {
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
};

export default function FiliadoEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function openModal() {
    setForm(emptyForm);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newEvent = {
      id: events.length + 1,
      name: form.name || "Novo Evento",
      date: form.date,
      timeRange:
        form.startTime && form.endTime
          ? `${form.startTime}–${form.endTime}`
          : "—",
      location: form.location || "Local a definir",
      status: "pending",
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
  }

  return (
    <section className="admin-events">
      <div className="admin-events__header">
        <h1 className="admin-events__title">Meus Eventos</h1>
        <button
          type="button"
          className="admin-events__create-btn"
          onClick={openModal}
        >
          Criar evento
        </button>
      </div>

      <div className="admin-events__table-wrapper">
        <table className="admin-events__table">
          <thead>
            <tr>
              <th className="w-16">ID</th>
              <th>Nome</th>
              <th>Data / Horário</th>
              <th>Local</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="admin-events__id">{ev.id}</td>
                <td>
                  <div className="admin-events__name-group">
                    <span className="admin-events__name" title={ev.name}>
                      {ev.name}
                    </span>
                    {ev.shortDescription && (
                      <span
                        className="admin-events__description"
                        title={ev.shortDescription}
                      >
                        {ev.shortDescription}
                      </span>
                    )}
                  </div>
                </td>

                <td>
                  <div className="admin-events__date-group">
                    <span className="admin-events__date">{ev.date}</span>
                    {ev.timeRange && ev.timeRange !== "—" && (
                      <>
                        <span className="admin-events__dot">•</span>
                        <span className="admin-events__time-chip">
                          {ev.timeRange}
                        </span>
                      </>
                    )}
                  </div>
                </td>

                <td>
                  <div className="admin-events__location" title={ev.location}>
                    <span className="admin-events__location-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="admin-events__location-text">
                      {ev.location}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`badge badge--${ev.status}`}>
                    {STATUS_LABEL[ev.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal__backdrop" onClick={closeModal} />
          <div className="admin-modal__content" role="dialog" aria-modal="true">
            <header className="admin-modal__header">
              <h2>Criar Evento</h2>
              <button
                type="button"
                className="admin-modal__close"
                onClick={closeModal}
              >
                ×
              </button>
            </header>

            <form onSubmit={handleSubmit} className="admin-modal__form">
              <div className="admin-modal__grid">
                {/* Coluna esquerda */}
                <div className="admin-modal__col">
                  <div className="admin-modal__field">
                    <label>Nome do evento *</label>
                    <input
                      type="text"
                      name="name"
                      className="admin-modal__input"
                      placeholder="Ex.: Formação continuada de professores"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-modal__row">
                    <div className="admin-modal__field">
                      <label>Data *</label>
                      <input
                        type="date"
                        name="date"
                        className="admin-modal__input"
                        value={form.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="admin-modal__field">
                      <label>Início *</label>
                      <input
                        type="time"
                        name="startTime"
                        className="admin-modal__input"
                        value={form.startTime}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="admin-modal__field">
                      <label>Fim *</label>
                      <input
                        type="time"
                        name="endTime"
                        className="admin-modal__input"
                        value={form.endTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="admin-modal__field">
                    <label>Local *</label>
                    <input
                      type="text"
                      name="location"
                      className="admin-modal__input"
                      placeholder="Ex.: Auditório da SEDUC"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-modal__field">
                    <label>Pequena descrição *</label>
                    <input
                      type="text"
                      name="shortDescription"
                      className="admin-modal__input"
                      placeholder="Ex.: Encontro com foco em práticas alfabetizadoras."
                      value={form.shortDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Coluna direita */}
                <div className="admin-modal__col admin-modal__col--briefing">
                  <div className="admin-modal__field admin-modal__field--full">
                    <label>Briefing / escopo do evento</label>
                    <textarea
                      name="briefing"
                      className="admin-modal__textarea"
                      placeholder="Descreva os objetivos, público-alvo e principais detalhes do evento."
                      value={form.briefing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <footer className="admin-modal__footer">
                <button
                  type="button"
                  className="admin-modal__btn admin-modal__btn--ghost"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="admin-modal__btn admin-modal__btn--primary"
                >
                  Criar
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
