import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Clean up the DOM after each test (important for React components)
afterEach(() => {
  cleanup();
});