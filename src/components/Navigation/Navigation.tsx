import './Navigation.scss';

import type { FC } from 'react';
import React from 'react';

import type { Route } from '../../types/navigation';
import { AnalyzeIcon } from '../Icons/AnalyzeIcon';
import { InfoIcon } from '../Icons/InfoIcon';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface NavigationProps {
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export const Navigation: FC<NavigationProps> = ({ currentRoute, onRouteChange }) => {
  const navigationItems = [
    { id: 'analyzer' as Route, label: 'Analizator', icon: <AnalyzeIcon /> },
    { id: 'about' as Route, label: 'O projekcie', icon: <InfoIcon /> },
  ];

  return (
    <div className="navigation-wrapper">
      <nav className="navigation">
        <div className="navigation__items">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`navigation__item ${currentRoute === item.id ? 'active' : ''}`}
              onClick={() => onRouteChange(item.id)}
              aria-current={currentRoute === item.id ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="navigation__actions">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};
