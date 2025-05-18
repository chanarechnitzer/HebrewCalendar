import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle } from 'lucide-react';

const Toast: React.FC = () => {
  const { toast, hideToast } = useToast();
  
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);
  
  if (!toast.visible) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
      <CheckCircle className="w-5 h-5 text-green-400" />
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;