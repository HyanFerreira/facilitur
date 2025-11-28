// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CalendarioEventos from "./components/CalendarioEventos";
import About from "./components/About";
import Partners from "./components/Partners";
import PartnerCTA from "./components/PartnerCTA";
import NewsletterForm from "./components/NewsletterForm";

import logoHorizontal from "./assets/img/logotipo/logotipo_horizontal.svg";
import heroBolasCelular from "./assets/img/hero/app_celular.png";

import icon1 from "./assets/img/icons/icon_1.svg";
import icon2 from "./assets/img/icons/icon_2.svg";
import icon3 from "./assets/img/icons/icon_3.svg";
import icon4 from "./assets/img/icons/icon_4.svg";
import icon5 from "./assets/img/icons/icon_5.svg";

import aws from "./assets/img/partners/aws.png";
import bertioga from "./assets/img/partners/bertioga.png";
import caraguatatuba from "./assets/img/partners/caraguatatuba.png";
import ilhabela from "./assets/img/partners/ilhabela.png";
import rnr from "./assets/img/partners/rnr.png";
import saoPaulo from "./assets/img/partners/sao_paulo.png";
import saoSeba from "./assets/img/partners/sao_seca.png";
import ubatuba from "./assets/img/partners/ubatuba.png";

import background from "./assets/img/background.png";
import fogueteMaluko from "./assets/img/foguete_maluko.png";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import FiliadoLogin from "./filiado/FiliadoLogin";
import FiliadoDashboard from "./filiado/FiliadoDashboard";

function SiteHome() {
  const aboutIcons = [icon1, icon2, icon3, icon4, icon5];

  const partnersList = [
    { src: saoPaulo, alt: "São Paulo" },
    { src: caraguatatuba, alt: "Caraguatatuba" },
    { src: aws, alt: "AWS" },
    { src: saoSeba, alt: "São Sebastião" },
    { src: ubatuba, alt: "Ubatuba" },
    { src: rnr, alt: "RnR" },
    { src: ilhabela, alt: "Ilhabela" },
    { src: bertioga, alt: "Bertioga" },
  ];

  return (
    <div className="page">
      <Header logo={logoHorizontal} />
      <Hero heroImg={heroBolasCelular} />
      <CalendarioEventos />
      <About icons={aboutIcons} />
      <Partners partners={partnersList} />
      <PartnerCTA background={background} />
      <NewsletterForm foguete={fogueteMaluko} apiBase="http://localhost:8080" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteHome />} />
      {/* Admin */}
      <Route
        path="/admin/login"
        element={<AdminLogin logo={logoHorizontal} />}
      />
      <Route path="/admin" element={<AdminDashboard logo={logoHorizontal} />} />
      {/* Filiado */}
      <Route
        path="/filiado/login"
        element={<FiliadoLogin logo={logoHorizontal} />}
      />
      <Route
        path="/filiado"
        element={<FiliadoDashboard logo={logoHorizontal} />}
      />
    </Routes>
  );
}
