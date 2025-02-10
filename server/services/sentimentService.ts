import { config } from 'dotenv';
import axios from 'axios';
import path from 'path';
import { logger } from '../utils/logger';

config({
  path: path.resolve(__dirname, '../.env'),
});

import type { AxiosError } from '../types/axios';
import type { HuggingFaceErrorResponse, HuggingFaceResponse } from '../types/huggingface';
import type { SentimentAnalysisResponse } from '../types/sentiment';

const MIN_TEXT_LENGTH = 3;
const MAX_TEXT_LENGTH = 500;
const CONFIDENCE_THRESHOLD = 0.5;

function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'isAxiosError' in error &&
      (error as AxiosError).isAxiosError === true
  );
}

class SentimentService {
  private readonly apiUrl =
    'https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment';

  private readonly apiKey = process.env.HUGGING_FACE_API_KEY;

  constructor() {
    if (!this.apiKey) {
      throw new Error('HUGGING_FACE_API_KEY is not set in environment variables');
    }

    console.log('API Key prefix:', this.apiKey.substring(0, 4));

    if (!this.apiKey.startsWith('hf_')) {
      throw new Error('Invalid HUGGING_FACE_API_KEY format - should start with hf_');
    }
  }

  private validateText(text: string): void {
    if (!text || typeof text !== 'string') {
      throw new Error('Text must be a non-empty string');
    }

    if (text.length < MIN_TEXT_LENGTH) {
      throw new Error(`Text must be at least ${MIN_TEXT_LENGTH} characters long`);
    }

    if (text.length > MAX_TEXT_LENGTH) {
      throw new Error(`Text must not exceed ${MAX_TEXT_LENGTH} characters`);
    }

    // Sprawdź czy tekst nie składa się tylko z białych znaków lub powtórzeń
    const normalizedText = text.trim().toLowerCase();
    if (!normalizedText.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,}/)) {
      throw new Error('Text must contain meaningful words');
    }
  }

  async analyzeSentiment(text: string): Promise<{ sentiment: SentimentAnalysisResponse }> {
    const startTime = Date.now();

    try {
      this.validateText(text);

      const { data } = await axios.post<HuggingFaceResponse[][]>(
        this.apiUrl,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      );

      if (!data || !Array.isArray(data) || !data[0]?.[0]) {
        throw new Error('Invalid response format from HuggingFace API');
      }

      const responseTime = Date.now() - startTime;
      const result = {
        sentiment: {
          label: this.mapSentimentLabel(data[0][0].label, data[0][0].score),
          score: data[0][0].score,
        },
      };

      logger.info(`Analyzed text: "${text}" (${responseTime}ms)`, result);
      return result;
    } catch (error: unknown) {
      if (isAxiosError<HuggingFaceErrorResponse>(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Unknown API error';
          throw new Error(`API error: ${error.response.status} - ${errorMessage}`);
        }
        if (error.request) {
          throw new Error('No response received from API');
        }
        throw new Error(error.message || 'Network error occurred');
      }
      throw new Error(error instanceof Error ? error.message : 'Failed to analyze sentiment');
    }
  }

  private mapSentimentLabel(label: string, score: number): 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' {
    const starRating = parseInt(label.split(' ')[0], 10);

    // Jeśli pewność jest niska, zwróć NEUTRAL
    if (score < CONFIDENCE_THRESHOLD) {
      return 'NEUTRAL';
    }

    if (starRating >= 4) return 'POSITIVE';
    if (starRating <= 2) return 'NEGATIVE';
    return 'NEUTRAL';
  }
}

export const sentimentService = new SentimentService();
