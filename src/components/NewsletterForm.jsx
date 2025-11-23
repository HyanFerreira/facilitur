import { useState } from "react";

function onlyDigits(v = "") {
  return v.replace(/\D/g, "");
}

function formatPhoneBR(v = "") {
  const d = onlyDigits(v).slice(0, 11);

  if (d.length === 0) return "";
  if (d.length < 3) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length < 11) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;

  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function isValidPhoneBR(v = "") {
  const d = onlyDigits(v);
  return d.length === 10 || d.length === 11;
}

export default function NewsletterForm({ foguete, apiBase }) {
  const [formNews, setFormNews] = useState({
    nome: "",
    email: "",
    celular: "",
    aceite: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    ok: null,
    msg: "",
  });

  function onChangeNews(e) {
    let { name, value, type, checked } = e.target;

    if (name === "celular") value = formatPhoneBR(value);

    setFormNews((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};

    if (!formNews.nome.trim()) next.nome = "Informe seu nome.";
    if (!formNews.email.trim()) next.email = "Informe seu email.";
    else if (!/^\S+@\S+\.\S+$/.test(formNews.email.trim()))
      next.email = "Email inválido.";

    if (formNews.celular.trim() && !isValidPhoneBR(formNews.celular))
      next.celular = "Celular inválido. Use (DD) 99999-9999.";

    if (!formNews.aceite) next.aceite = "Você precisa aceitar os termos.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmitNews(e) {
    e.preventDefault();
    setStatus({ loading: false, ok: null, msg: "" });

    if (!validate()) return;

    setStatus({ loading: true, ok: null, msg: "" });

    try {
      const payload = {
        nome: formNews.nome.trim(),
        email: formNews.email.trim(),
      };

      if (formNews.celular.trim()) {
        payload.celular = onlyDigits(formNews.celular);
      }

      const res = await fetch(`${apiBase}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const backMsg =
          data?.message ||
          data?.msg ||
          (res.status === 409
            ? "Email ou celular já cadastrado."
            : "Não foi possível cadastrar. Verifique os dados.");

        setStatus({ loading: false, ok: false, msg: backMsg });
        return;
      }

      setStatus({ loading: false, ok: true, msg: "Cadastro realizado!" });
      setFormNews({ nome: "", email: "", celular: "", aceite: false });
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus({
        loading: false,
        ok: false,
        msg: "Erro de conexão com a API. Veja se o backend está rodando.",
      });
    }
  }

  return (
    <section className="newsletter" id="contato">
      <div className="container newsletter__grid">
        <div className="newsletter__left">
          <h2 className="newsletter__title">
            Receba nossos eventos em tempo real!
          </h2>

          <p className="newsletter__subtitle">
            Cadastre-se e fique por dentro de todas eventos da
            <br />
            cidade
          </p>

          <form className="newsletter__form" onSubmit={onSubmitNews} noValidate>
            <div className="newsletter__row newsletter__row--two">
              <div className="field">
                <label className="field__label">NOME <span className="required">*</span></label>
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
                  <input
                    className={`field__input ${
                      errors.nome ? "field__input--error" : ""
                    }`}
                    type="text"
                    name="nome"
                    value={formNews.nome}
                    onChange={onChangeNews}
                  />
                </div>
                {errors.nome && (
                  <small className="field__error">{errors.nome}</small>
                )}
              </div>

              <div className="field">
                <label className="field__label">EMAIL <span className="required">*</span></label>
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
                  <input
                    className={`field__input ${
                      errors.email ? "field__input--error" : ""
                    }`}
                    type="email"
                    name="email"
                    value={formNews.email}
                    onChange={onChangeNews}
                  />
                </div>
                {errors.email && (
                  <small className="field__error">{errors.email}</small>
                )}
              </div>
            </div>

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
                  <input
                    className={`field__input ${
                      errors.celular ? "field__input--error" : ""
                    }`}
                    type="tel"
                    name="celular"
                    value={formNews.celular}
                    onChange={onChangeNews}
                    placeholder="(DD) 99999-9999"
                  />
                </div>
                {errors.celular && (
                  <small className="field__error">{errors.celular}</small>
                )}
              </div>
            </div>

            <label className="newsletter__check">
              <input
                type="checkbox"
                name="aceite"
                checked={formNews.aceite}
                onChange={onChangeNews}
              />
              <span>
                EU ACEITO RECEBER EMAILS E CONCORDO COM OS TERMOS DE USO E
                PRIVACIDADE DA EMPRESA.
              </span>
            </label>
            {errors.aceite && (
              <small className="field__error">{errors.aceite}</small>
            )}

            {status.msg && (
              <div
                className={
                  status.ok
                    ? "newsletter__alert newsletter__alert--ok"
                    : "newsletter__alert newsletter__alert--err"
                }
                role="status"
              >
                <span className="newsletter__alert-icon">
                  {status.ok ? "✅" : "⚠️"}
                </span>
                <span>{status.msg}</span>
              </div>
            )}

            <button
              type="submit"
              className="newsletter__btn"
              disabled={status.loading}
            >
              {status.loading ? "ENVIANDO..." : "CADASTRAR"}
            </button>
          </form>
        </div>

        <div className="newsletter__right" aria-hidden="true">
          <img
            src={foguete}
            alt=""
            className="newsletter__rocket"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
