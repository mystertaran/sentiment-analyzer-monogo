import './TextInput.scss';

import type { FC } from 'react';
import React from 'react';

import type { TextInputProps } from '../../types/inputs';

export const TextInput: FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength = 500,
  disabled = false,
  error,
  className = '',
}) => {
  return (
    <div className={`text-input-container ${className} ${error ? 'has-error' : ''}`}>
      <textarea
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        rows={5}
      />
      <div className="character-count">
        {value.length} / {maxLength} znaków
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
