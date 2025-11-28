// src/admin/AdminAffiliateEvents.jsx
import { useState } from "react";

const initialAffiliateEvents = [
  {
    id: 101,
    name: "Festival Gastronômico de Verão",
    affiliate: "Prefeitura de Ubatuba",
    date: "10/01/2026",
    timeRange: "18:00–23:00",
    location: "Orla da Praia do Cruzeiro – Ubatuba/SP",
    status: "pending",
  },
  {
    id: 102,
    name: "Circuito FaciliTur de Corridas de Rua",
    affiliate: "Secretaria de Esportes de Ilhabela",
    date: "22/02/2026",
    timeRange: "07:00–11:00",
    location: "Avenida Princesa Isabel – Ilhabela/SP",
    status: "approved",
  },
  {
    id: 103,
    name: "Hackathon Turismo Inteligente do Litoral Norte",
    affiliate: "SEDUC Caraguatatuba / Núcleo de Inovação",
    date: "15/03/2026",
    timeRange: "08:00–20:00",
    location: "Auditório da SEDUC – Caraguatatuba/SP",
    status: "pending",
  },
];

const STATUS_LABEL = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Recusado",
};

export default function AdminAffiliateEvents() {
  const [events, setEvents] = useState(initialAffiliateEvents);

  function updateStatus(id, status) {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status } : ev))
    );
  }

  return (
    <section className="admin-events admin-aff-events">
      <div className="admin-events__header">
        <div>
          <h1 className="admin-events__title">Eventos dos Filiados</h1>
          <p className="admin-aff-events__subtitle">
            Confira os eventos enviados pelos afiliados para publicação no
            FaciliTur e aprove ou recuse conforme os critérios da rede.
          </p>
        </div>
      </div>

      <div className="admin-events__table-wrapper admin-aff-events__table-wrapper">
        <table className="admin-events__table">
          <thead>
            <tr>
              <th className="w-16">ID</th>
              <th>Nome</th>
              <th>Filiado</th>
              <th>Data / Horário</th>
              <th>Local</th>
              <th>Status</th>
              <th className="w-40">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={7} className="admin-events__empty">
                  Nenhum evento enviado pelos filiados.
                </td>
              </tr>
            )}

            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="admin-events__id">{ev.id}</td>

                <td>
                  <div className="admin-events__name-group">
                    <span className="admin-events__name" title={ev.name}>
                      {ev.name}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="admin-events__name-group">
                    <span
                      className="admin-aff-events__affiliate"
                      title={ev.affiliate}
                    >
                      {ev.affiliate}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="admin-events__date-group">
                    <span className="admin-events__date">{ev.date}</span>
                    {ev.timeRange && (
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

                <td>
                  <div className="admin-events__actions">
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--approve"
                      onClick={() => updateStatus(ev.id, "approved")}
                      title="Aprovar evento"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--reject"
                      onClick={() => updateStatus(ev.id, "rejected")}
                      title="Recusar evento"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
