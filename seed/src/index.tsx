import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import 'nprogress/nprogress.css';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';
import './i18n/i18n';

import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

serviceWorker.unregister();
