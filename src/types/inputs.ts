import type { ChangeEvent } from 'react';

export interface TextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  error?: string | null;
  className?: string;
}
