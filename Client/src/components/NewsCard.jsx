import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NewsCard = ({  index, image, title, description, date, isOdd, onClick, post }) => {

    const [isHovered, setIsHovered] = useState(false);


    return (
        <motion.div
            initial={{ x: 70, opacity: 0 }}
            transition={{ duration: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            className={`w-full max-w-4xl ${isOdd ? 'ml-auto sm:pr-4' : 'mr-auto sm:pl-4'} mb-8`}
        >
            <article className="flex flex-col rounded-lg md:rounded-none border-none sm:flex-row w-[90%] md:w-[100%] mx-auto h-auto sm:h-[40vh] bg-white transition hover:shadow-xl overflow-hidden">

                {/* Image Section - Shows on all screens */}
                <div className="w-full sm:w-56 sm:min-w-[14rem] h-72 sm:h-auto overflow-hidden relative bg-gray-200">
                    <img
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}

                        alt={title}
                        src={image || "https://placehold.co/300x200"}
                        className={`absolute inset-0 h-full w-full object-cover ${isHovered ? 'scale-105' : 'scale-100'} transition-all duration-500`}
                    />

                    {/* External Link Icon */}
                    {post?.url && (
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 left-2 bg-white bg-opacity-80 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
                            title="Visit original source"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-800"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    )}
                </div>


                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="border-s border-gray-900/10 p-4 sm:p-6">
                        <time
                            dateTime="2022-10-10"
                            className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 sm:hidden mb-2"
                        >
                            <span>2022</span>
                            <span className="w-px flex-1 bg-gray-900/10"></span>
                            <span>{date}</span>
                        </time>

                        <h3 className="font-bold uppercase text-gray-900 truncate">
                            {title}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            {description}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end md:justify-normal mt-2 md:mt-0 sm:flex-row gap-2 px-4 pb-4 sm:px-6 sm:pb-6">
                        <Link
                            onClick={onClick}
                            className="block bg-yellow-300 px-5 py-2 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                        >
                            Summary
                        </Link>
                        <Link
                            to={'/blog/detail'}
                            state={{ article: post }}
                            className="block bg-yellow-300 px-5 py-2 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>

                {/* Vertical Date on Desktop Only */}
                <div className="hidden sm:flex rotate-180 p-2 [writing-mode:_vertical-lr]">

                    <time
                        dateTime="2022-10-10"
                        className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                    >
                        <span>2022</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>{date}</span>
                    </time>
                </div>
            </article>
        </motion.div>
    );
};

export default NewsCard;