// 'use client';

// import React, { useEffect } from 'react';

// interface ConfirmModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title?: string;
//   message?: string;
//   confirmText?: string;
//   cancelText?: string;
//   variant?: 'danger' | 'warning' | 'info';
//   isLoading?: boolean;
// }

// export default function ConfirmModal({ 
//   isOpen,
//   onClose,
//   onConfirm,
//   title = "تأیید عملیات",
//   message = "آیا از انجام این عمل اطمینان دارید؟",
//   confirmText = "تأیید",
//   cancelText = "انصراف",
//   variant = 'danger',
//   isLoading = false
// }: ConfirmModalProps) {
//   // غیرفعال کردن اسکرول پشت مودال
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   // بستن مودال با کلید Escape
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const getVariantStyles = () => {
//     switch (variant) {
//       case 'danger':
//         return {
//           bg: 'bg-red-100',
//           icon: '🔴',
//           confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
//         };
//       case 'warning':
//         return {
//           bg: 'bg-yellow-100',
//           icon: '🟡',
//           confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
//         };
//       case 'info':
//         return {
//           bg: 'bg-blue-100',
//           icon: '🔵',
//           confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//         };
//       default:
//         return {
//           bg: 'bg-red-100',
//           icon: '🔴',
//           confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
//         };
//     }
//   };

//   const styles = getVariantStyles();

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4 text-center">
//           <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md">
            
//             {/* Header */}
//             <div className={`p-6 ${styles.bg} rounded-t-lg`}>
//               <div className="flex items-center">
//                 <div className="text-2xl ml-3">{styles.icon}</div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {title}
//                 </h3>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="px-6 py-4">
//               <p className="text-gray-600 text-right">
//                 {message}
//               </p>
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3">
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 className={`inline-flex justify-center items-center px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
//                   styles.confirmButton
//                 } ${
//                   isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 onClick={onConfirm}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     در حال پردازش...
//                   </>
//                 ) : (
//                   confirmText
//                 )}
//               </button>
              
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 className="inline-flex justify-center px-4 py-2 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 onClick={onClose}
//               >
//                 {cancelText}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import React, { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen,
  onClose,
  onConfirm,
  title = "تأیید عملیات",
  message = "آیا از انجام این عمل اطمینان دارید؟",
  confirmText = "تأیید",
  cancelText = "انصراف",
  variant = 'danger',
  isLoading = false
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          bg: 'bg-red-100',
          icon: '🔴',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          icon: '🟡',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-100',
          icon: '🔵',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        };
      default:
        return {
          bg: 'bg-red-100',
          icon: '🔴',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
    }
  };

  if (!isOpen) return null;

  const styles = getVariantStyles();

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md">
            
            <div className={`p-6 ${styles.bg} rounded-t-lg`}>
              <div className="flex items-center">
                <div className="text-2xl ml-3">{styles.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-600 text-right">
                {message}
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3">
              <button
                type="button"
                disabled={isLoading}
                className={`inline-flex justify-center items-center px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  styles.confirmButton
                } ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={onConfirm}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال پردازش...
                  </>
                ) : (
                  confirmText
                )}
              </button>
              
              <button
                type="button"
                disabled={isLoading}
                className="inline-flex justify-center px-4 py-2 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={onClose}
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;