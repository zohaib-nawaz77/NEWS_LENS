import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const News_Detail = () => {
    const location = useLocation();
    const article = location.state?.article; // Get article from navigation state

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-semibold text-gray-400">No article found...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-white mb-6">{article.title}</h1>
                
                {/* Author/Source Information */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-lg">📰</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">
                            {article.source?.name || "Unknown Source"}
                        </h3>
                        <div className="text-sm text-gray-400">
                            {article.author && <span>By {article.author}</span>}
                            <span className="ml-4">
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {article.urlToImage && (
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full rounded-xl shadow-lg mb-8"
                    />
                )}

                <div className="space-y-6 text-gray-300">
                    <p className="text-lg">{article.description}</p>
                    <p>{article.content?.split(/\[.*?\]/)[0]}</p> {/* Remove source brackets */}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700">
                    <Link
                        to={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 hover:underline"
                    >
                        Read full article on {article.source?.name}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default News_Detail;