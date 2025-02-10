import './Loader.scss';

import type { FC } from 'react';
import React from 'react';

export const Loader: FC = () => (
  <div className="loader">
    <div className="loader__spinner" />
  </div>
);
