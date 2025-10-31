# 🗺️ FaciliTur — Calendário inteligente de eventos da cidade

> **Projeto acadêmico (ADS)** • **Status:** Pré‑MVP • **Objeto:** Plataforma web e newsletter diária para divulgação de eventos locais a moradores e turistas.

---

## ✨ Visão geral

O **FaciliTur** é um sistema que centraliza os **eventos da cidade** em um só lugar. A proposta é oferecer:

* Um **calendário inteligente** com busca, filtros e visualizações por **dia/semana/mês**;
* **Curadoria automática** de destaques do dia;
* **Newsletter diária** com os principais eventos (por categoria e proximidade);
* Experiência pensada para **moradores** e **turistas** (multilíngue, acessível e responsiva);
* Integrações futuras com fontes oficiais e comunitárias.

---

## 🎯 Objetivos do MVP

* [ ] Listar eventos com **data, horário, local, categoria e preço**;
* [ ] Visualização em **lista** e **calendário mensal**;
* [ ] **Assinatura de newsletter** (e-mail) e envio de **boletim diário** (stub);
* [ ] **Painel administrativo** simples para cadastrar/editar eventos;
* [ ] **Busca e filtros** (data, categoria, bairro/região, gratuito/pago);
* [ ] Estrutura básica de **API** para consumo externo.

---

## 👥 Público-alvo

* **Moradores:** descobrir cultura local e atividades gratuitas/na vizinhança.
* **Turistas:** planejar roteiro por data, proximidade e interesse (família, natureza, gastronomia, etc.).
* **Organizadores:** publicar eventos e ampliar alcance.

---

## 🧩 Principais funcionalidades (escopo)

* **Catálogo de eventos** com fotos, tags e mapa (posterior);
* **Categorias** (música, gastronomia, esportes, feiras, infantil…);
* **Favoritos** (lista pessoal) *(futuro)*;
* **Mapa com geolocalização** e traçar rota *(futuro)*;
* **Newsletter diária** (curadoria por cidade + preferências);
* **Multilíngue** (pt‑BR / en) *(futuro)*;
* **Acessibilidade** (alto contraste, navegação por teclado) *(contínuo)*.

---

## 🏗️ Arquitetura (proposta inicial)

> **Stack sugerida (ajustável ao time):**

* **Backend:** Java + Spring Boot
* **Frontend:** React + Vite + TailwindCSS
* **Banco:** MySQL 8
* **Jobs & Newsletter:** A definir...

---

## 📦 Estrutura de dados (rascunho)

Entidades principais do MVP:

* **Evento**: título, descrição curta, descrição, categoria_id, local_id, início, fim, preço, link externo, imagem_capa, status.
* **Categoria**: nome, slug, cor.
* **Local**: nome, endereço, bairro, cidade, UF, CEP, latitude, longitude (opcional no MVP).
* **Organizador** *(futuro)*: nome, contato, site/redes.
* **Usuário** *(futuro)*: nome, e‑mail, preferências de categorias.
* **AssinanteNewsletter**: e‑mail, categorias_preferidas (opcional), cidade.

---

## 🗺️ Roadmap

**MVP (Iteração 1)**

* [ ] CRUD de Eventos/Categorias/Locais
* [ ] Calendário mensal + lista com filtros
* [ ] Newsletter (fila + template básico)

**Iteração 2**

* [ ] Busca textual (Scout/Meilisearch)
* [ ] Favoritos e preferências de categorias
* [ ] Importação de eventos (CSV/Google Sheets)

**Iteração 3**

* [ ] Mapa e geolocalização
* [ ] Multilíngue (pt‑BR/en)
* [ ] Acessibilidade AA

---

## 🧭 UX & Diretrizes

* **Responsivo** (mobile‑first)
* **Acessível** (WCAG)
* **Clareza**: foco em data/hora/local e CTA para rota/ingresso
* **Conteúdo**: textos curtos, tags e ícones por categoria

---

## 📄 Licença

Este projeto acadêmico está sob **MIT** (ajustável conforme orientação). Ver `LICENSE`.

---

## 👤 Autoria & Contato

* **Equipe (ADS):**

  * Hyan Ferreira — [@hyanferreira](https://github.com/hyanferreira)
  * João Gabriel de Faria Beserra — [@JGabrielFBeserra](https://github.com/JGabrielFBeserra)
  * Robert Cortez Rudi — [@Robert-Cortez-Rudi](https://github.com/Robert-Cortez-Rudi)
  * Emerson Soares — [@emersonsoares](https://github.com/emersonsoares)
* **Contato:** abra uma Issue neste repositório ou use os perfis acima.
* **Mantenedor inicial:** Hyan Ferreira (coordenação do repositório)
