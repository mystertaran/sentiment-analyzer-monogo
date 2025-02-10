import { SentimentService } from '../sentimentService';

const mockMutate = jest.fn();

jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn(() => ({
    mutate: mockMutate,
  })),
  gql: jest.fn((query) => query),
  InMemoryCache: jest.fn(),
}));

describe('SentimentService', () => {
  let mockLogger: Console;
  let service: SentimentService;

  beforeEach(() => {
    jest.clearAllMocks();

    // Przygotowanie mocka loggera
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as Console;

    // Tworzymy instancję usługi
    service = new SentimentService(mockLogger);
    // Ręcznie nadpisujemy klienta, by metoda mutate była dostępna
    (service as any).client = { mutate: mockMutate };
  });

  it('successfully analyzes sentiment', async () => {
    const mockResponse = {
      data: {
        analyzeSentiment: {
          sentiment: {
            label: 'POSITIVE',
            score: 0.95,
          },
          error: null,
        },
      },
    };

    mockMutate.mockResolvedValueOnce(mockResponse);

    const result = await service.analyzeSentiment('Pozytywny tekst');

    expect(result).toEqual({
      sentiment: {
        label: 'POSITIVE',
        score: 0.95,
      },
      error: null,
    });

    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.stringMatching(/GraphQL request completed in \d+ms/)
    );
  });

  it('handles GraphQL errors', async () => {
    const mockError = new Error('GraphQL Error');
    mockMutate.mockRejectedValueOnce(mockError);

    const result = await service.analyzeSentiment('test');

    expect(result).toEqual({
      sentiment: {
        label: 'NEUTRAL',
        score: 0,
      },
      error: {
        message: 'GraphQL Error',
        code: 'GRAPHQL_ERROR',
      },
    });

    expect(mockLogger.error).toHaveBeenCalledWith('GraphQL error:', mockError);
  });

  it('handles unknown errors', async () => {
    mockMutate.mockRejectedValueOnce('Unknown error');

    const result = await service.analyzeSentiment('test');

    expect(result).toEqual({
      sentiment: {
        label: 'NEUTRAL',
        score: 0,
      },
      error: {
        message: 'Unknown error occurred',
        code: 'GRAPHQL_ERROR',
      },
    });
  });

  it('passes correct variables to mutation', async () => {
    const testText = 'Test text';
    mockMutate.mockResolvedValueOnce({
      data: {
        analyzeSentiment: {
          sentiment: {
            label: 'NEUTRAL',
            score: 0.5,
          },
          error: null,
        },
      },
    });

    await service.analyzeSentiment(testText);

    expect(mockMutate).toHaveBeenCalledWith({
      mutation: expect.anything(),
      variables: { text: testText },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
