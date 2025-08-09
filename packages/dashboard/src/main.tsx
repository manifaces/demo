import 'styles/base.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const containerElement = document.getElementById('root');

if (containerElement) {
  const root = createRoot(containerElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
