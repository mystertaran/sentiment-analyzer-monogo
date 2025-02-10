export interface SentimentAnalysisResponse {
  label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score: number;
}
