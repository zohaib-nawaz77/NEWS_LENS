
import React from 'react';

const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
];

const Category = ({ selectedCategory, setSelectedCategory }) => {

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Update the selected category
        localStorage.setItem('selectedCategory', category); // Save to localStorage
    };
    return (
        <div className="flex flex-wrap gap-4 justify-center my-8">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-full transition duration-300 ${selectedCategory === category
                        ? " text-orange-600 bg-gray-700 font-semibold italic line-through" // Selected category style
                        : " text-white hover:text-gray-300 hover:bg-gray-700" // Default style
                        }`}                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default Category;