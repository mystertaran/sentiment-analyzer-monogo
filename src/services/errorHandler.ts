import { toast } from 'react-toastify';

import { toastOptions } from '../config/toast';

export const handleNetworkError = (error: unknown): void => {
  if (error instanceof Error) {
    toast.error(error.message, toastOptions.error);
  } else {
    toast.error('Wystąpił nieznany błąd', toastOptions.error);
  }
};
