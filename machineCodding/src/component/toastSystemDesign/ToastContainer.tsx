import { useEffect } from "react";
import "./toast.css";
const Toast = ({ toast, removeToaster }: any) => {
  useEffect(() => {
    setTimeout(() => {
      removeToaster(toast.id);
    }, 3000);
  }, []);

  return (
    <div className=" w-[300px] h-[100px] flex  bg-white animate">
      <h2>{toast.message}</h2>
      <span
        onClick={() => {
          removeToaster(toast.id);
        }}
      >
        ✖️
      </span>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToaster }) => {
  return (
    <div className="fixed top-4 right-4  ">
      {toasts?.visibleToast.length > 0 &&
        toasts?.visibleToast.map((toast) => (
          <Toast key={toast.id} toast={toast} removeToaster={removeToaster} />
        ))}
    </div>
  );
};

export default ToastContainer;
