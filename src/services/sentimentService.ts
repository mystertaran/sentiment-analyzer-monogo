import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

import type { SentimentAnalysisResult } from '../types/api';

const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const ANALYZE_SENTIMENT = gql`
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

export class SentimentService {
  private logger: Console;

  private client: ApolloClient<any>;

  constructor(logger: Console = console, client: ApolloClient<any> = defaultClient) {
    this.logger = logger;
    this.client = client;
  }

  async analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
    const startTime = Date.now();

    try {
      const { data } = await this.client.mutate({
        mutation: ANALYZE_SENTIMENT,
        variables: { text },
      });

      const responseTime = Date.now() - startTime;
      this.logger.info(`GraphQL request completed in ${responseTime}ms`);

      return {
        sentiment: data.analyzeSentiment.sentiment,
        error: data.analyzeSentiment.error,
      };
    } catch (error) {
      this.logger.error('GraphQL error:', error);
      return {
        sentiment: {
          label: 'NEUTRAL',
          score: 0,
        },
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'GRAPHQL_ERROR',
        },
      };
    }
  }
}

export const sentimentService = new SentimentService();
