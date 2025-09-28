import { useCallback, useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import BoxPopup from "../components/BoxPopup";
import { motion } from "framer-motion";
import axios from "axios";
import Category from "../components/Category";

const NewsPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // Track the selected blog post
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'general');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/news?country=us&category=${selectedCategory}`
                );
                setBlogPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNews();
    }, [selectedCategory]);

    const handleCardClick = useCallback((post) => {
        setSelectedPost(post); // Set the selected blog post
    }, []);

    return blogPosts && blogPosts.length === 0 ? (
        <div className="text-2xl font-semibold text-center w-full flex justify-center items-center h-screen">
          <svg className="animate-spin h-8 w-8 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          be patient !
        </div>
      ) :     <section className="h-auto max-w-[var(--maxWidth)] pt-12 flex items-center flex-col gap-10">
            <header className="text-5xl font-semibold flex flex-col items-center">Latest Articles
                <div className="text-[1rem] mt-2 font-normal text-gray-400 text-center">Get the latest articles from Dev.to.</div>
            </header>
            {/* Category Component */}
            <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <motion.div className="flex flex-wrap gap-4 h-auto w-full justify-center">
                {
                    blogPosts.map((post, index) => {
                        return <NewsCard
                            isOdd={index % 2 === 1}
                            key={post.title + index}
                            index={index}
                            image={post.urlToImage || 'https://placehold.co/300x200'}
                            title={post.title}
                            description={post.description}
                            readingTime={post.publishedAt}
                            post={post}
                            isEven={index % 2 === 0}
                            onClick={() => handleCardClick(post)}
                        />
                    })
                }
            </motion.div>

            {/* Box to show in the bottom right corner */}
            <BoxPopup selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        </section>
}


export default NewsPage;
