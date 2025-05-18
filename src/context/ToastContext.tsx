import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  toast: {
    visible: boolean;
    message: string;
  };
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
  });
  
  const showToast = (message: string) => {
    setToast({
      visible: true,
      message,
    });
  };
  
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      visible: false,
    }));
  };
  
  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};