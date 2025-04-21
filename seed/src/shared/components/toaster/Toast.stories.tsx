import { Meta } from '@storybook/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage
} from './Toast';

export default {
  title: 'Avery/Toast'
} as Meta;

export const SuccessToast = () => (
  <div>
    <ToastContainer className="toastContainer" pauseOnHover autoClose={false} />
    <button
      onClick={() => {
        showSuccessMessage('This is a success toast', '', {
          position: 'top-right'
        });
      }}
    >
      Show Success Toast
    </button>
  </div>
);

export const WarningToast = () => (
  <div>
    <ToastContainer pauseOnHover autoClose={false} />
    <button
      onClick={() => {
        showWarningMessage('This is a success toast', {
          position: 'top-right'
        });
      }}
    >
      Show Success Toast
    </button>
  </div>
);

export const ErrorToast = () => (
  <div>
    <ToastContainer pauseOnHover autoClose={false} />
    <button
      onClick={() => {
        showErrorMessage('This is a success toast', {
          position: 'top-right'
        });
      }}
    >
      Show Success Toast
    </button>
  </div>
);
