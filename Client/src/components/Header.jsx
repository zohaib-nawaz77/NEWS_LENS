import { NavLink, Link } from 'react-router-dom';
import '../index.css'
import { motion } from 'framer-motion'

const Header = () => {

    const navLinkActiveStyle = ({ isActive }) => {
        return {
            color: isActive ? "#FFF176" : "white"
        }
    }

    return (
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="flex justify-between items-center h-[var(--navbarHeight)] w-full border-gray-600  border-b-[0.5px] px-4">
            <Link to='/'><div className="font-semibold text-2xl">News_Lens</div></Link>
            <ul className='flex gap-4'>
                <NavLink to='/' style={navLinkActiveStyle}>
                    <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>Home</li>
                </NavLink>
                <NavLink to='/blog' style={navLinkActiveStyle}>
                    <li className='text-[0.9rem] cursor-pointer hover:text-gray-300'>All News</li>
                </NavLink>
            </ul>
        </motion.nav>
    )
}

export default Header;