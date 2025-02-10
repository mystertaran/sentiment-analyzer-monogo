import type { FC } from 'react';
import React from 'react';
import type { ToastContainerProps } from 'react-toastify';

import * as ToastIcons from '../components/Icons/ToastIcons';

export const toastConfig: ToastContainerProps = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'colored',
  className: 'toast-container',
};

// Tworzymy komponenty dla każdego typu toastu
const ToastSuccessIcon: FC = () => React.createElement(ToastIcons.SuccessIcon, { size: 24 });
const ToastErrorIcon: FC = () => React.createElement(ToastIcons.ErrorIcon, { size: 24 });
const ToastWarningIcon: FC = () => React.createElement(ToastIcons.WarningIcon, { size: 24 });
const ToastInfoIconComponent: FC = () =>
  React.createElement(ToastIcons.ToastInfoIcon, { size: 24 });

export const toastOptions = {
  success: {
    icon: ToastSuccessIcon,
    className: 'toast toast--success',
    position: 'bottom-right' as const,
  },
  error: {
    icon: ToastErrorIcon,
    className: 'toast toast--error',
    position: 'bottom-right' as const,
  },
  warning: {
    icon: ToastWarningIcon,
    className: 'toast toast--warning',
    position: 'bottom-right' as const,
  },
  info: {
    icon: ToastInfoIconComponent,
    className: 'toast toast--info',
    position: 'bottom-right' as const,
  },
};
