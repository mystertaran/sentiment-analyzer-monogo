export type SentimentLabel = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface SentimentResult {
  label: SentimentLabel;
  score: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  sentiment?: SentimentResult;
}

export interface SentimentData {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

export interface AnalysisResultProps {
  data?: SentimentData;
  isLoading?: boolean;
  error?: string;
}
