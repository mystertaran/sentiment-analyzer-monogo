export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;

  disabled?: boolean;
  loading?: boolean;

  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  ariaLabel?: string;
  title?: string;

  className?: string;
  testId?: string;
}
