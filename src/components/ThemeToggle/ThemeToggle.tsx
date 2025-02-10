import './ThemeToggle.scss';

import type { FC } from 'react';
import React from 'react';

import { useTheme } from '../../context/ThemeContext';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Przełącz na tryb ${theme === 'light' ? 'ciemny' : 'jasny'}`}
    >
      <div className={`theme-toggle__slider ${theme}`}>
        <SunIcon className="theme-toggle__icon" />
        <MoonIcon className="theme-toggle__icon" />
      </div>
    </button>
  );
};
