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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4 text-black">Subscribe to Newsletter</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black focus:outline-none focus:border-zinc-700"
                    disabled={isLoading}
                />
                {/* {message && (
                    <p className={`text-sm mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )} */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                        Close
                    </button>
                    <button
                        onClick={onSubscribe}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm bg-zinc-700 text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
                    >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;