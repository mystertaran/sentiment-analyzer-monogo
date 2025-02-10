import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';

// Cleanup po każdym teście
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Mock dla react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));

// Wycisz ostrzeżenia konsoli podczas testów
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      /Warning/.test(args[0]) ||
      /act/.test(args[0]) ||
      /React does not recognize/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (/Warning/.test(args[0])) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
