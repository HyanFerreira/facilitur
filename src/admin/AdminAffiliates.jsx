// src/admin/AdminAffiliates.jsx
import { useState } from "react";

const initialAffiliates = [
  {
    id: 1,
    razaoSocial: "Prefeitura Municipal de Caraguatatuba",
    cnpj: "45.678.123/0001-90",
    endereco: "Av. Frei Pacífico Wagner, 1.011 – Centro, Caraguatatuba/SP",
    email: "turismo@caraguatatuba.sp.gov.br",
    telefone: "(12) 3881-0000",
    status: "approved",
  },
  {
    id: 2,
    razaoSocial: "Secretaria de Turismo de Ubatuba",
    cnpj: "10.234.567/0001-55",
    endereco: "Rua da Praia, 50 – Centro, Ubatuba/SP",
    email: "turismo@ubatuba.sp.gov.br",
    telefone: "(12) 3833-1234",
    status: "pending",
  },
  {
    id: 3,
    razaoSocial: "Rede Tropic – Agência de Viagens",
    cnpj: "28.901.234/0001-02",
    endereco: "Av. da Praia, 220 – Jardim Mar, São Sebastião/SP",
    email: "contato@redetropic.com.br",
    telefone: "(12) 3940-5678",
    status: "pending",
  },
];

const STATUS_LABEL = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Recusado",
};

export default function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState(initialAffiliates);

  function updateStatus(id, status) {
    setAffiliates((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
  }

  return (
    <section className="admin-events admin-affiliates">
      <div className="admin-events__header">
        <div>
          <h1 className="admin-events__title">Gerenciar Filiados</h1>
          <p className="admin-affiliates__subtitle">
            Aprove ou recuse o cadastro dos filiados da rede FaciliTur. Quando
            aprovados, eles passam a ter acesso ao portal para criar e gerenciar
            seus próprios eventos.
          </p>
        </div>
      </div>

      <div className="admin-events__table-wrapper">
        <table className="admin-events__table">
          <thead>
            <tr>
              <th className="w-16">ID</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Contato</th>
              <th>Endereço</th>
              <th>Status</th>
              <th className="w-40">Ações</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.length === 0 && (
              <tr>
                <td colSpan={7} className="admin-events__empty">
                  Nenhum filiado cadastrado.
                </td>
              </tr>
            )}

            {affiliates.map((filiado) => (
              <tr key={filiado.id}>
                <td className="admin-events__id">{filiado.id}</td>

                <td>
                  <div className="admin-events__name-group">
                    <span
                      className="admin-affiliates__razao"
                      title={filiado.razaoSocial}
                    >
                      {filiado.razaoSocial}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="admin-affiliates__cnpj">{filiado.cnpj}</span>
                </td>

                <td>
                  <div className="admin-affiliates__contact">
                    <a
                      href={`mailto:${filiado.email}`}
                      className="admin-affiliates__email"
                      title={filiado.email}
                    >
                      {filiado.email}
                    </a>
                    <span className="admin-affiliates__phone">
                      {filiado.telefone}
                    </span>
                  </div>
                </td>

                <td>
                  <div
                    className="admin-events__location"
                    title={filiado.endereco}
                  >
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
                      {filiado.endereco}
                    </span>
                  </div>
                </td>

                <td>
                  <span className={`badge badge--${filiado.status}`}>
                    {STATUS_LABEL[filiado.status]}
                  </span>
                </td>

                <td>
                  <div className="admin-events__actions">
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--approve"
                      onClick={() => updateStatus(filiado.id, "approved")}
                      title="Aprovar filiado"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="admin-events__action admin-events__action--reject"
                      onClick={() => updateStatus(filiado.id, "rejected")}
                      title="Recusar filiado"
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
