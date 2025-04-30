import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const News_Detail = () => {
    const location = useLocation();
    const article = location.state?.article;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-2xl font-semibold text-gray-400">No article found...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
                        {article.title}
                    </h1>

                    {/* Author + Source */}
                    <div className="flex items-center gap-4 mb-6">
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

                    {/* Featured Image */}
                    {article.urlToImage && (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full rounded-xl shadow-lg mt-4 mb-8 object-cover h-64 md:h-96"
                        />
                    )}
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-300">
                    {article.description && (
                        <p className="text-xl italic text-gray-300 border-l-4 border-yellow-500 pl-4 mb-6">
                            "{article.description}"
                        </p>
                    )}

                    <p className="text-lg leading-relaxed">
                        {article.content ? article.content.split(/\[.*?\]/)[0] : ''}
                    </p>
                </div>

                {/* External Link */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <Link
                        to={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 hover:underline font-medium"
                    >
                        Read full article on {article.source?.name}
                    </Link>
                </div>

                {/* Optional: Add Share Buttons */}
                <div className="mt-6 flex gap-4">
                    <button className="text-gray-400 hover:text-white">Share on Twitter</button>
                    <button className="text-gray-400 hover:text-white">Share on Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default News_Detail;