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

    const handleGoogleLogin = () => {
        try {
            window.location.href = "http://localhost:3001/api/auth/google";
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-[400px] shadow-2xl">
                <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    NewsLens
                </h1>
                <hr className="border-gray-200 mb-6" />
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscribe to Newsletter</h2>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg 
                    hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200
                    flex items-center justify-center gap-3 font-medium text-gray-700"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Email Input */}
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