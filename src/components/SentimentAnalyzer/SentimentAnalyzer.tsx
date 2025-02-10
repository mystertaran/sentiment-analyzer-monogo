import './SentimentAnalyzer.scss';

import { useMutation } from '@apollo/client';
import type { FC } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { toastOptions } from '../../config/toast';
import { ANALYZE_SENTIMENT } from '../../graphql/schema';
import type { SentimentAnalysisResponse } from '../../types/api';
import { Button } from '../Button/Button';
import { AnalyzeIcon } from '../Icons/AnalyzeIcon';
import { TrashIcon } from '../Icons/TrashIcon';
import { ResultModal } from '../Modal/ResultModal';
import { TextInput } from '../TextInput/TextInput';

const MIN_TEXT_LENGTH = 3;
const MAX_TEXT_LENGTH = 500;

const SentimentAnalyzer: FC = () => {
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentiment, setSentiment] = useState<SentimentAnalysisResponse | undefined>();
  const [error, setError] = useState<string | undefined>();

  const [analyzeSentiment, { loading }] = useMutation(ANALYZE_SENTIMENT);

  const validateText = (value: string): boolean => {
    if (value.length < MIN_TEXT_LENGTH) {
      setError(`Tekst musi mieć co najmniej ${MIN_TEXT_LENGTH} znaki`);
      return false;
    }

    if (value.length > MAX_TEXT_LENGTH) {
      setError(`Tekst nie może przekraczać ${MAX_TEXT_LENGTH} znaków`);
      return false;
    }

    // Sprawdź czy tekst zawiera sensowne słowa
    const normalizedText = value.trim();
    if (!normalizedText.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,}/)) {
      setError('Tekst musi zawierać sensowne słowa');
      return false;
    }

    setError(undefined);
    return true;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_TEXT_LENGTH) {
      setText(newText);
      if (newText.length > 0) {
        validateText(newText);
      } else {
        setError(undefined);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateText(text)) {
      toast.warning(error, toastOptions.warning);
      return;
    }

    try {
      const { data } = await analyzeSentiment({
        variables: { text: text.trim() },
      });

      setSentiment(data.analyzeSentiment.sentiment);
      setIsModalOpen(true);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Wystąpił błąd podczas analizy tekstu',
        toastOptions.error
      );
    }
  };

  const handleClear = () => {
    setText('');
    setSentiment(undefined);
    setError(undefined);
    toast.info('Tekst został wyczyszczony', toastOptions.info);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sentiment-analyzer">
      <div className="sentiment-analyzer__hero">
        <h1 className="gradient-title">Analiza Sentymentu</h1>
        <p className="sentiment-analyzer__description">
          Wprowadź tekst, aby sprawdzić jego wydźwięk emocjonalny. Nasz system wykorzystuje
          zaawansowane algorytmy uczenia maszynowego do analizy sentymentu w języku polskim i
          angielskim. Może wykryć czy tekst jest pozytywny, negatywny lub neutralny.
        </p>
      </div>

      <div className="sentiment-analyzer__content">
        <form onSubmit={handleSubmit} className="sentiment-form">
          <TextInput
            value={text}
            onChange={handleTextChange}
            placeholder="Wprowadź tekst do analizy..."
            maxLength={MAX_TEXT_LENGTH}
            error={error}
          />

          <div className="sentiment-form__buttons">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={!text.trim() || !!error || loading}
              loading={loading}
              icon={<AnalyzeIcon />}
              iconPosition="left"
              ariaLabel="Analizuj tekst"
            >
              Analizuj
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              icon={<TrashIcon />}
              iconPosition="left"
              disabled={!text.trim() || loading}
              onClick={handleClear}
              ariaLabel="Wyczyść tekst"
            >
              Wyczyść
            </Button>
          </div>
        </form>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        sentiment={sentiment}
        isLoading={loading}
        error={error}
      />
    </div>
  );
};

export default SentimentAnalyzer;
