import { toast, ToastOptions } from 'react-toastify';
import Typography from '../typography/Typography';
import { Box } from '@mui/material';

const CustomToaster = ({ title, closeToast, toastProps, subDescription }) => (
  <Box>
    <Typography variant="subtitle1" className="textsemiWeight">
      {title}
    </Typography>
    <Typography variant="subtitle2">{subDescription}</Typography>
  </Box>
);

export const showSuccessMessage = (
  message: string,
  subDescription: string,
  options: ToastOptions
) => {
  toast.success(
    <CustomToaster
      title={message}
      subDescription={subDescription}
      toastProps={options}
      closeToast={undefined}
    />
  );
};

export const requestPopupMessage = (message: string, options: ToastOptions) => {
  toast.success(message, options);
};

export const showWarningMessage = (message: string, options: ToastOptions) => {
  toast.warn(
    <CustomToaster
      title={message}
      toastProps={options}
      closeToast={undefined}
      subDescription={''}
    />
  );
};

export const showErrorMessage = (message: string, options: ToastOptions) => {
  toast.error(
    <CustomToaster
      title={message}
      toastProps={options}
      closeToast={undefined}
      subDescription={''}
    />
  );
};
