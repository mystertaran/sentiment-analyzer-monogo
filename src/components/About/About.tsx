import './About.scss';

import type { FC } from 'react';
import React from 'react';

export const About: FC = () => {
  return (
    <div className="about">
      <div className="about__hero">
        <h1 className="gradient-title">Analiza Sentymentu</h1>
        <p className="about__hero-subtitle">
          Odkryj emocje ukryte w tekście dzięki sztucznej inteligencji
        </p>
      </div>

      <div className="about__content">
        <section className="about__section about__section--highlight">
          <div className="about__grid">
            <div className="about__grid-item">
              <h2>Wielojęzyczność</h2>
              <p>Wsparcie dla języka polskiego, angielskiego i wielu innych</p>
            </div>
            <div className="about__grid-item">
              <h2>Szybkość</h2>
              <p>Analiza w czasie rzeczywistym &lt; 650ms</p>
            </div>
            <div className="about__grid-item">
              <h2>Precyzyjna</h2>
              <p>Dokładność na poziomie 84.2% dla różnych języków</p>
            </div>
          </div>
        </section>

        <section className="about__section">
          <h2>Jak to działa?</h2>
          <div className="about__steps">
            <div className="step">
              <div className="step__number">01</div>
              <div className="step__content">
                <h3>Wprowadź tekst</h3>
                <p>Wklej lub wpisz dowolny tekst w wybranym języku</p>
              </div>
            </div>
            <div className="step">
              <div className="step__number">02</div>
              <div className="step__content">
                <h3>Kliknij &quot;Analizuj&quot;</h3>
                <p>System automatycznie przetworzy tekst i dobierze odpowiedni model AI</p>
              </div>
            </div>
            <div className="step">
              <div className="step__number">03</div>
              <div className="step__content">
                <h3>Otrzymaj wynik</h3>
                <p>Zobacz szczegółową analizę sentymentu tekstu</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about__section about__section--tech">
          <h2>Technologie</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend</h3>
              <ul>
                <li>React 18 + TypeScript</li>
                <li>SASS + CSS Modules</li>
                <li>GraphQL Client</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Backend</h3>
              <ul>
                <li>GraphQL API</li>
                <li>HuggingFace API</li>
                <li>Serverless Functions</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Integracje</h3>
              <ul>
                <li>HuggingFace Inference API</li>
                <li>Model Analizy Sentymentu</li>
                <li>Wsparcie Wielojęzyczne</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
