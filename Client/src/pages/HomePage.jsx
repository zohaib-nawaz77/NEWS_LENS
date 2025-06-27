import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const HomePage = () => {

     useEffect(() => {
    const tokenGoogle = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenGoogle) {
      toast.success("Login successful");
      localStorage.setItem("token", token);
      navigate("/");
    }
    // connectToBackend();
  }, []);
    return (
        <section className="h-screen max-w-[var(--maxWidth)] pt-32 flex items-center flex-col gap-6">
            <motion.header initial={{ scale: 0.1 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} className="text-5xl font-semibold px-3 text-center">Your personalized <span className='bg-gradient-to-br from-yellow-300 to-orange-400 bg-clip-text text-transparent font-extrabold text-6xl'>News_Lens</span></motion.header>

            <Link to='/blog'>
                <motion.button initial={{ scale: 0.1 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.1, backgroundColor: "rgb(230,230,230)" }} whileTap={{ scale: 0.88 }} className='h-[3rem] bg-white text-black border-none outline-none text-lg px-14'>See All News</motion.button>
            </Link>
        </section>
    )
}

export default HomePage;