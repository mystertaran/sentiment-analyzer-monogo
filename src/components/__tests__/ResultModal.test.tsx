import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import type { ModalProps } from '../../types/modal';
import { ResultModal } from '../Modal/ResultModal';

describe('ResultModal', () => {
  const mockSentiment = {
    label: 'POSITIVE' as const,
    score: 0.95,
  };

  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    sentiment: mockSentiment,
  };

  it('renders sentiment result correctly', () => {
    render(<ResultModal {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /pozytywny sentyment/i })).toBeInTheDocument();
    expect(screen.getByText(/95\.0%/)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<ResultModal {...defaultProps} onClose={onClose} />);

    render(<ResultModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays appropriate icon based on sentiment', () => {
    const { container: positiveContainer } = render(<ResultModal {...defaultProps} />);
    expect(positiveContainer.querySelector('.positive-icon')).toBeInTheDocument();

    const { container: negativeContainer } = render(
      <ResultModal {...defaultProps} sentiment={{ label: 'NEGATIVE', score: 0.2 }} />
    );
    expect(negativeContainer.querySelector('.negative-icon')).toBeInTheDocument();
  });

  it('handles neutral sentiment', () => {
    const { container } = render(
      <ResultModal {...defaultProps} sentiment={{ label: 'NEUTRAL', score: 0.5 }} />
    );
    expect(container.querySelector('.neutral-icon')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ResultModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles missing sentiment data', () => {
    render(<ResultModal {...defaultProps} sentiment={undefined} />);
    expect(screen.getByText(/nieoczekiwany błąd/i)).toBeInTheDocument();
  });
});
