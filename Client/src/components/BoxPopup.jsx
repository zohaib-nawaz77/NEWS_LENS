import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BoxPopup = ({ selectedPost, setSelectedPost }) => {
    const [summary, setSummary] = useState('');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        const generateSummary = async () => {
            if (selectedPost) {
                setGenerating(true);
                try {
                    const res = await fetch(
                        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAs9UxWgOrQlaVMzRuIxLJ7dVuzUgo1mY8",
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        parts: [
                                            {
                                                text: `Summarize the following news article to highlight the key points and main events.
                                                       Article Heading: ${selectedPost.title}
                                                       Article Description: ${selectedPost.description}
                                                       Instructions:
                                                       Focus on the most important information and main events.
                                                       Keep the summary clear and concise.
                                                       don't include any other word just give me summary
                                                       Aim for a length of 150-200 words.`,
                                            },
                                        ],
                                    },
                                ],
                            }),
                        }
                    );

                    const data = await res.json();
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    setSummary(aiResponse);
                    setGenerating(false);
                } catch (error) {
                    console.log('error', error);
                    setGenerating(false);
                }
            } else {
                setSummary('');
                setGenerating(false);
            }
        };

        generateSummary();
    }, [selectedPost]);

    return (
        <AnimatePresence>
            {selectedPost && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }} // Initial animation state
                    animate={{ opacity: 1, y: 0, scale: 1 }} // Animate to this state
                    exit={{ opacity: 0, y: 50, scale: 0.8 }} // Exit animation
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }} // Smooth spring animation
                    className="fixed bottom-4 right-4 text-black bg-white p-6 rounded-lg h-full sm:h-80 sm:max-h-80 overflow-y-auto shadow-lg max-w-sm"
                >
                    {/* Close Button */}
                    <motion.i
                        whileHover={{ scale: 1.1 }} // Scale up on hover
                        whileTap={{ scale: 0.9 }} // Scale down on click
                        className="ri-close-line text-2xl cursor-pointer hover:text-red-500"
                        onClick={() => setSelectedPost(null)}
                    ></motion.i>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} // Initial animation state
                        animate={{ opacity: 1, x: 0 }} // Animate to this state
                        transition={{ delay: 0.2 }} // Delay the animation
                        className="flex items-center justify-between"
                    >
                        <h3 className="font-bold text-lg">{selectedPost.title}</h3>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, x: -20 }} // Initial animation state
                        animate={{ opacity: 1, x: 0 }} // Animate to this state
                        transition={{ delay: 0.3 }} // Delay the animation
                        className="mt-2 text-xs text-gray-700"
                    >
                        {selectedPost.description}
                    </motion.p>

                    {/* Summary */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }} // Initial animation state
                        animate={{ opacity: 1, y: 0 }} // Animate to this state
                        transition={{ delay: 0.4 }} // Delay the animation
                        className="mt-4"
                    >
                        {generating ? (
                            <motion.div
                                initial={{ opacity: 0 }} // Initial animation state
                                animate={{ opacity: 1 }} // Animate to this state
                                transition={{ delay: 0.5 }} // Delay the animation
                            >
                                Generating Summary...
                            </motion.div>
                        ) : (
                            <>
                                <span className="font-bold text-orange-500">Summary:</span>{' '}
                                <span>{summary}</span>
                            </>
                        )}
                    </motion.h3>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BoxPopup;