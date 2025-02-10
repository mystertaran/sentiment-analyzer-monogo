import { gql } from '@apollo/client';

export const ANALYZE_SENTIMENT = gql`
  mutation AnalyzeSentiment($text: String!) {
    analyzeSentiment(text: $text) {
      sentiment {
        label
        score
      }
      error {
        message
        code
      }
    }
  }
`;
