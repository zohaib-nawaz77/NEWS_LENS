import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import HomePage from '../../pages/HomePage'
import News_Detail from '../../pages/News_Detail'
import { toast } from 'react-toastify';

import NewsPage from '../../pages/NewsPage'
import axios from 'axios'

const Routin = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchAndStoreUser = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (token) {
                localStorage.setItem("token", token); // Store token

                try {
                    const res = await axios.get("https://newslens-api.onrender.com/api/user/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser(res.data);
                    console.log("User data fetched and stored:", res.data);
                } catch (err) {
                    console.error("Failed to get user", err);
                }
            }
        };

        fetchAndStoreUser();
    }, []);

    return (
        <div className='max-w-5xl mx-auto'>
            <Header user={user} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<NewsPage />} />
                <Route path='blog/detail' element={<News_Detail />} />
            </Routes>
        </div>

    )
}

export default Routin