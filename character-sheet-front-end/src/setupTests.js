import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up the DOM after each test (important for React components later)
afterEach(() => {
  cleanup();
});

// Optional: define global mocks if needed (e.g., localStorage)
if (!global.localStorage) {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key];
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  };
}
