import { NavLink, Link } from 'react-router-dom';
import '../index.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Header = () => {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subscribeStatus, setSubscribeStatus] = useState(null); // Added missing state
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navLinkActiveStyle = ({ isActive }) => ({
        color: isActive ? "#FFF176" : "white"
    });

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async () => {
        if (!validateEmail(email)) {
            setSubscribeStatus('error');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
            console.log('Subscription successful: Check your mail', response.data);
            setSubscribeStatus('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setEmail('');
                setSubscribeStatus(null);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Subscription failed:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setSubscribeStatus('error');
            setIsLoading(false);
        }
    };
    const handleClose = () => {
        setIsModalOpen(false);
        setEmail('');
        setSubscribeStatus(null);
        setIsLoading(false);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex justify-between items-center h-[var(--navbarHeight)] w-full border-gray-600 border-b-[0.5px] px-4"
            >
                <Link to='/'><div className="font-semibold text-2xl">News_Lens</div></Link>
                <ul className='flex gap-4'>
                    <NavLink to='/' style={navLinkActiveStyle}>
                        <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>Home</li>
                    </NavLink>
                    <NavLink to='/blog' style={navLinkActiveStyle}>
                        <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>All News</li>
                    </NavLink>
                </ul>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='text-sm font-medium px-4 py-2 rounded-md border border-zinc-700 hover:bg-zinc-800 transition-colors'
                >
                    Subscribe
                </button>
            </motion.nav>
            {isModalOpen && (
                <Modal
                    email={email}
                    setEmail={setEmail}
                    onClose={handleClose}
                    onSubscribe={handleSubscribe}
                    isLoading={isLoading}
                    status={subscribeStatus}
                />
            )}
        </>
    );
};

export default Header;