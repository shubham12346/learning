import { useContext, useReducer, createContext } from "react";
import ToastContainer from "./ToastContainer";

export const ToastContext = createContext<any>(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id != action.payload);
    default:
      return state;
  }
};
export const ToastProvider = ({ children }: any) => {
  const [toasts, dispatch] = useReducer(reducer, []);

  const addToaster = (message = "", type = "success") => {
    let id = Date.now();
    let newToast = {
      id: id,
      message,
      type,
    };
    dispatch({ type: "ADD", payload: newToast });

    setTimeout(() => {
      removeToaster(id);
    }, 3000);
  };

  const removeToaster = (id: string | number) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const value = {
    addToaster,
    removeToaster,
    toasts,
  };

  console.log("toast", toasts);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToaster={removeToaster} />
    </ToastContext.Provider>
  );
};

export const useToaster = () => {
  return useContext(ToastContext);
};
