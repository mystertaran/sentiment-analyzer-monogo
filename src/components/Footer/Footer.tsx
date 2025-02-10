import './Footer.scss';

import type { FC } from 'react';
import React from 'react';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <span className="footer__copyright">© {currentYear} Analiza Sentymentu</span>
        <span className="footer__powered-by">Powered by HuggingFace</span>
      </div>
    </footer>
  );
};
