export const typeDefs = `
  type SentimentResult {
    label: String!
    score: Float!
  }

  type Error {
    message: String!
    code: String
  }

  type SentimentResponse {
    sentiment: SentimentResult
    error: Error
  }

  type Query {
    health: String!
  }

  type Mutation {
    analyzeSentiment(text: String!): SentimentResponse!
  }
`;
