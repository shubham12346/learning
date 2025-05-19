import { useContext, useReducer, createContext } from "react";
import ToastContainer from "./ToastContainer";

const MAX_QUEUE_LENGTH = 3;
const ToastContext = createContext<any>(null);
let initialState = {
  visibleToast: [],
  queuedToast: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.visibleToast.length < MAX_QUEUE_LENGTH) {
        let newVisibleToast = {
          ...state,
          visibleToast: [...state.visibleToast, action.payload],
        };
        return newVisibleToast;
      } else {
        return {
          ...state,
          queuedToast: [...state?.queuedToast, action.payload],
        };
      }
    case "REMOVE":
      const newVisible = state.visibleToast.filter(
        (item: any) => item.id != action.payload
      );
      const newQueue = [...state.queuedToast];
      if (newVisible < MAX_QUEUE_LENGTH && state.queuedToast.length > 0) {
        const newToastVisible = newQueue.shift();
        return {
          visibleToast: [...newVisible, newToastVisible],
          queuedToast: [...newQueue],
        };
      }
      return {
        ...state,
        visibleToast: [...newVisible],
      };
    default:
      return state;
  }
};
export const ToastProvider = ({ children }: any) => {
  const [toasts, dispatch] = useReducer(reducer, initialState);

  const addToaster = (message = "", type = "success") => {
    let id = Date.now();
    let newToast = {
      id: id,
      message,
      type,
    };
    dispatch({ type: "ADD", payload: newToast });
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
