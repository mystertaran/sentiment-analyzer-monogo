import '@testing-library/jest-dom';

import { ApolloProvider } from '@apollo/client';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import SentimentAnalyzer from '../SentimentAnalyzer/SentimentAnalyzer';

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock dla Apollo Client
const mockMutate = jest.fn();
const mockClient = {
  mutate: mockMutate,
  cache: {
    extract: () => ({}),
    restore: () => {},
  },
};

describe('SentimentAnalyzer', () => {
  const renderWithApollo = (ui: React.ReactElement) => {
    return render(<ApolloProvider client={mockClient as any}>{ui}</ApolloProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    renderWithApollo(<SentimentAnalyzer />);

    expect(screen.getByText(/analiza sentymentu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/wprowadź tekst do analizy/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analizuj tekst/i })).toBeInTheDocument();
  });

  it('handles text input and button state', () => {
    renderWithApollo(<SentimentAnalyzer />);

    const analyzeButton = screen.getByRole('button', { name: /analizuj tekst/i });
    expect(analyzeButton).toHaveAttribute('disabled');

    const textarea = screen.getByPlaceholderText(/wprowadź tekst do analizy/i);
    fireEvent.change(textarea, { target: { value: 'Test text' } });

    expect(analyzeButton).not.toHaveAttribute('disabled');
  });

  it('handles successful sentiment analysis', async () => {
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
    renderWithApollo(<SentimentAnalyzer />);

    const textarea = screen.getByPlaceholderText(/wprowadź tekst do analizy/i);
    const analyzeButton = screen.getByRole('button', { name: /analizuj tekst/i });

    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Test text' } });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { text: 'Test text' },
        })
      );
    });
  });

  it('handles API error', async () => {
    mockMutate.mockRejectedValueOnce(new Error('API Error'));
    renderWithApollo(<SentimentAnalyzer />);

    const textarea = screen.getByPlaceholderText(/wprowadź tekst do analizy/i);
    const analyzeButton = screen.getByRole('button', { name: /analizuj tekst/i });

    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Test text' } });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('API Error', expect.anything());
    });
  });

  it('validates text input', () => {
    renderWithApollo(<SentimentAnalyzer />);

    const textarea = screen.getByPlaceholderText(/wprowadź tekst do analizy/i);

    fireEvent.change(textarea, { target: { value: 'ab' } });
    expect(screen.getByText(/tekst musi mieć co najmniej/i)).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Valid text for analysis' } });
    expect(screen.queryByText(/tekst musi mieć co najmniej/i)).not.toBeInTheDocument();
  });
});
