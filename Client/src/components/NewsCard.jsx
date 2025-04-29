import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NewsCard = ({ id, index, image, title, description, date, isOdd, onClick, post }) => {
    return (
        <motion.div initial={{ x: 70, opacity: 0 }} transition={{ duration: .5 }} animate={{ x: 0, duration: 5, opacity: 1 }} className={`w-full max-w-4xl ${isOdd ? 'ml-auto sm:pr-4' : 'mr-auto sm:pl-4'} mb-8`}>
            <article className="flex h-[40vh] bg-white transition hover:shadow-xl">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <time
                        dateTime="2022-10-10"
                        className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                    >
                        <span>2022</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>{date}</span>
                    </time>
                </div>

                <div className="hidden sm:block sm:basis-56 sm:min-w-[14rem]">
                    <div className="relative w-full h-full">
                        {image ? (
                            <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                            <img
                                src="https://placehold.co/300x200"
                                alt="Placeholder"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <h3 className="font-bold uppercase text-gray-900 truncate">
                            {title}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            {description}
                        </p>
                    </div>

                    <div className="sm:flex sm:items-end sm:justify-end gap-2">
                        <Link
                            onClick={onClick}
                            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                        >
                            Summary
                        </Link>
                        <Link
                            to={'/blog/detail'}
                            state={{ article: post }}
                            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

export default NewsCard;