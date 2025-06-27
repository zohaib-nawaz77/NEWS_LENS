import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import HomePage from '../../pages/HomePage'
import News_Detail from '../../pages/News_Detail'
import { toast } from 'react-toastify';

import NewsPage from '../../pages/NewsPage'

const Routin = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const tokenGoogle = new URLSearchParams(window.location.search).get("token");
        if (tokenGoogle) {
            toast.success("Login successful");
            localStorage.setItem("token", tokenGoogle); // ← Use tokenGoogle, not token
            navigate("/blog");
        }
    }, []);

    return (
        <div className='max-w-5xl mx-auto'>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<NewsPage />} />
                <Route path='blog/detail' element={<News_Detail />} />
            </Routes>
        </div>

    )
}

export default Routin