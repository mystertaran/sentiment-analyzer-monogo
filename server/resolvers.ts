import { sentimentService } from './services/sentimentService';

export const resolvers = {
  Query: {
    health: () => 'OK',
  },
  Mutation: {
    analyzeSentiment: async (_: unknown, { text }: { text: string }) => {
      try {
        const result = await sentimentService.analyzeSentiment(text);
        return {
          sentiment: result.sentiment,
          error: null,
        };
      } catch (error) {
        return {
          sentiment: null,
          error: {
            message: error instanceof Error ? error.message : 'Unknown error',
            code: 'ANALYSIS_ERROR',
          },
        };
      }
    },
  },
};
