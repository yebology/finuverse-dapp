import React from 'react';

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="block w-full md:w-48 px-4 py-2 bg-white border border-neutralDark rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
};

export default CategoryFilter;