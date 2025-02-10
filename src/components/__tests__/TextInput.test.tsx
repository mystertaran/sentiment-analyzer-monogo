import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { TextInput } from '../TextInput/TextInput';

describe('TextInput', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Wprowadź tekst',
  };

  it('renders correctly with default props', () => {
    render(<TextInput {...defaultProps} />);

    const textarea = screen.getByPlaceholderText('Wprowadź tekst');
    expect(textarea).toBeInTheDocument();
    expect(screen.getByText('0 / 500 znaków')).toBeInTheDocument();
  });

  it('shows character count correctly', () => {
    render(<TextInput {...defaultProps} value="Test text" />);
    expect(screen.getByText('9 / 500 znaków')).toBeInTheDocument();
  });

  it('handles text input correctly', () => {
    const onChange = jest.fn();
    render(<TextInput {...defaultProps} onChange={onChange} />);

    const textarea = screen.getByPlaceholderText('Wprowadź tekst');
    fireEvent.change(textarea, { target: { value: 'New text' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    render(<TextInput {...defaultProps} error="Tekst nie może być pusty" />);

    expect(screen.getByText('Tekst nie może być pusty')).toBeInTheDocument();
    expect(document.querySelector('.text-input-container')).toHaveClass('has-error');
  });

  it('respects maxLength prop', () => {
    render(<TextInput {...defaultProps} maxLength={10} />);
    expect(screen.getByText('0 / 10 znaków')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<TextInput {...defaultProps} disabled />);
    const textarea = screen.getByPlaceholderText('Wprowadź tekst');
    expect(textarea).toBeDisabled();
  });
});
