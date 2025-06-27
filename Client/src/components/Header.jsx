import { NavLink, Link } from 'react-router-dom';
import '../index.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Header = () => {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navLinkActiveStyle = ({ isActive }) => ({
        color: isActive ? "#FFF176" : "white"
    });

    // Fetch user profile data - FIXED: Updated API endpoint
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            console.log('User profile fetched:', response.data); // Debug log
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // If token is invalid, remove it
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
    };

    // Check for existing token and fetch user data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Also fetch user profile when token changes (after login)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !user) {
            fetchUserProfile();
        }
    }, [user]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async () => {
        if (!validateEmail(email)) {
            setMessage('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        setMessage(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
            console.log('Subscription successful:', response.data);
            setMessage(response.data.message || 'You have subscribed successfully!');
            setTimeout(() => {
                setIsModalOpen(false);
                setEmail('');
                setMessage(null);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Subscription failed:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setMessage(error.response?.data?.message || 'Subscription failed. Please try again.');
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEmail('');
        setMessage(null);
        setIsLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setShowDropdown(false);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex justify-between items-center h-[var(--navbarHeight)] w-full border-gray-600 border-b-[0.5px] px-4"
            >
                <Link to='/'><div className="font-semibold text-2xl">NewsLens</div></Link>
                <ul className='hidden sm:flex gap-4'>
                    <NavLink to='/' style={navLinkActiveStyle}>
                        <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>Home</li>
                    </NavLink>
                    <NavLink to='/blog' style={navLinkActiveStyle}>
                        <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>All News</li>
                    </NavLink>
                </ul>
                
                {/* User Profile or Subscribe Button */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors"
                        >
                            <img
                                src={user.picture || '/default-avatar.png'}
                                alt={user.name || 'User'}
                                className="w-8 h-8 rounded-full"
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                            <span className="text-sm font-medium">{user.name || user.email}</span>
                            <svg 
                                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                        <div className="font-medium">{user.name || 'User'}</div>
                                        <div className="text-gray-500">{user.email}</div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='text-sm font-medium px-4 py-2 rounded-md border border-zinc-700 hover:bg-zinc-800 transition-colors'
                    >
                        Subscribe
                    </button>
                )}
            </motion.nav>
            
            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                />
            )}
            
            {isModalOpen && (
                <Modal
                    email={email}
                    setEmail={setEmail}
                    onClose={handleClose}
                    onSubscribe={handleSubscribe}
                    isLoading={isLoading}
                    message={message}
                />
            )}
        </>
    );
};

export default Header;