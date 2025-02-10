export interface SentimentAnalysisResponse {
  label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface SentimentAnalysisResult {
  sentiment?: SentimentAnalysisResponse;
  error?: ApiError;
}
