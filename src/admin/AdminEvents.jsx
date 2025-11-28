// src/admin/AdminEvents.jsx
import { useState } from "react";

const initialEvents = [
  {
    id: 3,
    name: "Premiação das equipes vencedoras do 1º Hackathon Caraguatatuba",
    shortDescription:
      "Premiação do 1º Hackathon Caraguatatuba, promovido pela Secretaria Municipal de Educação.",
    date: "24/11/2025",
    timeRange: "14:00–16:00",
    location: "Salão Monteiro Lobato da Secretaria Municipal de Educação",
  },
  {
    id: 2,
    name: "Hackathon reúne estagiários de Tecnologia e Educação para desenvolver soluções para a rede",
    shortDescription:
      "Um dos eventos mais promissores para integração entre educação, tecnologia e gestão pública.",
    date: "17/11/2025",
    timeRange: "07:00–13:00",
    location:
      "Instituto Federal de São Paulo (IFSP) – Campus Caraguatatuba / SEDUC",
  },
  {
    id: 1,
    name: "Encontro Regional de Turismo Sustentável do Litoral Norte",
    shortDescription:
      "Evento voltado para gestores municipais, trade turístico e sociedade civil sobre inovação e sustentabilidade.",
    date: "05/12/2025",
    timeRange: "09:00–17:00",
    location: "Auditório da SEDUC – Caraguatatuba/SP",
  },
];

const emptyForm = {
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  shortDescription: "",
  briefing: "",
};

export default function AdminEvents() {
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

    const nextId =
      events.length > 0 ? Math.max(...events.map((ev) => ev.id)) + 1 : 1;

    const newEvent = {
      id: nextId,
      name: form.name || "Novo evento sem título",
      shortDescription: form.shortDescription || "",
      date: form.date || "—",
      timeRange:
        form.startTime && form.endTime
          ? `${form.startTime}–${form.endTime}`
          : "—",
      location: form.location || "Local a definir",
    };

    setEvents((prev) => [...prev, newEvent]);
    setShowModal(false);
  }

  return (
    <section className="admin-events">
      {/* Cabeçalho */}
      <div className="admin-events__header">
        <h1 className="admin-events__title">Gerenciar Eventos</h1>

        <button
          type="button"
          className="admin-events__create-btn"
          onClick={openModal}
        >
          <span className="admin-events__create-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75 2.25a.75.75 0 0 1 .75.75V4.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75A2.25 2.25 0 0 1 5.25 4.5H6V3a.75.75 0 0 1 .75-.75Zm-1.5 6A.75.75 0 0 0 4.5 9v7.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H5.25ZM6 12h4.5a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 6 12Z"
              />
            </svg>
          </span>
          Criar evento
        </button>
      </div>

      {/* Tabela desktop */}
      <div className="admin-events__table-wrapper">
        <table className="admin-events__table">
          <thead>
            <tr>
              <th className="w-16">ID</th>
              <th>Nome</th>
              <th>Data / Horário</th>
              <th>Local</th>
              <th className="w-40">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="admin-events__empty">
                  Nenhum evento cadastrado.
                </td>
              </tr>
            )}

            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="admin-events__id"> {ev.id} </td>

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
                  <div className="admin-events__actions">
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--edit"
                      onClick={() => alert("Edição ilustrativa")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--delete"
                      onClick={() => alert("Exclusão ilustrativa")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--view"
                      onClick={() => alert("Visualização ilustrativa")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards mobile */}
      <div className="admin-events__cards">
        {events.map((ev) => (
          <article key={`card-${ev.id}`} className="admin-events__card">
            <header className="admin-events__card-header">
              <span className="admin-events__card-id">#{ev.id}</span>
              <span className="admin-events__card-pill">
                {ev.date}
                {ev.timeRange && ev.timeRange !== "—"
                  ? ` • ${ev.timeRange}`
                  : ""}
              </span>
            </header>

            <div className="admin-events__card-body">
              <h2 className="admin-events__card-title">{ev.name}</h2>
              <p className="admin-events__card-location">
                <span className="admin-events__location-icon">📍</span>
                {ev.location}
              </p>
              {ev.shortDescription && (
                <p className="admin-events__card-description">
                  {ev.shortDescription}
                </p>
              )}
            </div>

            <footer className="admin-events__card-footer">
              <button
                type="button"
                className="admin-events__action admin-events__action--edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </button>
              <button
                type="button"
                className="admin-events__action admin-events__action--delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="admin-events__action admin-events__action--view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </footer>
          </article>
        ))}

        {events.length === 0 && (
          <div className="admin-events__card-empty">
            Nenhum evento cadastrado ainda.
          </div>
        )}
      </div>

      {/* Modal de criação */}
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
