import './ResultModal.scss';

import type { FC } from 'react';
import React from 'react';

import type { ModalProps } from '../../types/modal';
import { NegativeIcon } from '../Icons/NegativeIcon';
import { NeutralIcon } from '../Icons/NeutralIcon';
import { PositiveIcon } from '../Icons/PositiveIcon';

export const ResultModal: FC<ModalProps> = ({ isOpen, onClose, sentiment, isLoading, error }) => {
  if (!isOpen) return null;

  const getSentimentInfo = () => {
    if (!sentiment) return null;

    const info = {
      POSITIVE: {
        icon: <PositiveIcon size={48} />,
        title: 'Pozytywny Sentyment',
        description: 'Tekst wyraża pozytywne emocje lub przychylne nastawienie.',
        tip: 'Świetnie! Pozytywny przekaz często prowadzi do lepszej komunikacji.',
      },
      NEGATIVE: {
        icon: <NegativeIcon size={48} />,
        title: 'Negatywny Sentyment',
        description: 'Tekst wyraża negatywne emocje lub krytyczne nastawienie.',
        tip: 'Zastanów się, czy możesz przekazać tę samą informację w bardziej konstruktywny sposób.',
      },
      NEUTRAL: {
        icon: <NeutralIcon size={48} />,
        title: 'Neutralny Sentyment',
        description: 'Tekst jest obiektywny lub nie wyraża wyraźnych emocji.',
        tip: 'Neutralny ton jest odpowiedni dla faktycznych informacji, ale możesz dodać nieco emocji, jeśli chcesz wzbudzić większe zaangażowanie.',
      },
    };

    return info[sentiment.label as keyof typeof info];
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="modal-loading">
          <div className="loader" />
          <p>Analizuję tekst...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="modal-error">
          <h2>Nie mogę przeanalizować tekstu</h2>
          <p className="error-message">{error}</p>
          <div className="modal-footer">
            <button className="modal-close" onClick={onClose}>
              Spróbuj ponownie
            </button>
          </div>
        </div>
      );
    }

    const sentimentInfo = getSentimentInfo();
    if (!sentimentInfo || !sentiment) {
      return (
        <div className="modal-error">
          <h2>Wystąpił nieoczekiwany błąd</h2>
          <p>Nie udało się przetworzyć wyniku analizy.</p>
          <div className="modal-footer">
            <button className="modal-close" onClick={onClose}>
              Zamknij
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="modal-header">
          <div className="sentiment-icon">{sentimentInfo.icon}</div>
          <h2>{sentimentInfo.title}</h2>
          <div className="sentiment-score">Pewność: {(sentiment.score * 100).toFixed(1)}%</div>
        </div>
        <div className="modal-body">
          <p className="description">{sentimentInfo.description}</p>
          <div className="tip">
            <h3>Wskazówka:</h3>
            <p>{sentimentInfo.tip}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-close" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
};
