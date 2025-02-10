import './Button.scss';

import type { FC } from 'react';
import React from 'react';

import type { ButtonProps } from '../../types/button';

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  ariaLabel,
  title,
  className = '',
  testId,
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    loading ? 'button--loading' : '',
    disabled ? 'button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      title={title}
      data-testid={testId}
    >
      {loading && (
        <span className="button__loader" aria-hidden="true">
          <span className="loader" />
        </span>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}

      <span className="button__content">{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};
