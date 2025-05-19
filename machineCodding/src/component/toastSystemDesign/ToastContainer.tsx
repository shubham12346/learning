import "./toast.css";
const Toast = ({ toast, removeToaster }: any) => {
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
      {toasts?.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToaster={removeToaster} />
      ))}
    </div>
  );
};

export default ToastContainer;
