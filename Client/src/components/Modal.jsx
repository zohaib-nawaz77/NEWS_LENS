import { useEffect } from "react";
import { toast } from 'react-toastify';

const Modal = ({ email, setEmail, onClose, onSubscribe, isLoading, status, message }) => {

    // Determine if the message is an error (simplistic check based on content)
    const isError = message && message.toLowerCase().includes('failed') || message?.toLowerCase().includes('valid');
    const showToast = (toastMessage, type) => {
        toast[type](toastMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Use useEffect to show toast when message prop changes
    useEffect(() => {
        if (message) {
            if (isError) {
                showToast(message, 'error');
            } else {
                showToast(message, 'success');
            }
        }
    }, [message, isError]); // Depend on message and isError

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-[400px] shadow-2xl">
                <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    NewsLens
                </h1>
                <hr className="border-gray-200 mb-6" />
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscribe to Newsletter</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent 
                    transition-all duration-200 ease-in-out"
                    disabled={isLoading}
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 
                        disabled:opacity-50 transition-colors duration-200"
                    >
                        Close
                    </button>
                    <button
                        onClick={onSubscribe}
                        disabled={isLoading}
                        className="px-5 py-2.5 text-sm font-medium bg-zinc-800 text-white rounded-lg
                        hover:bg-zinc-900 disabled:opacity-50 transition-colors duration-200
                        shadow-md hover:shadow-lg"
                    >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;