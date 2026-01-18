import React from 'react';
import { CATEGORIES } from '../data/wishes';

const CategorySelector = ({ currentCategory, onSelectCategory }) => {
    return (
        <div className="category-selector">
            {Object.entries(CATEGORIES).map(([key, label]) => (
                <button
                    key={key}
                    className={currentCategory === key ? 'active' : ''}
                    onClick={() => onSelectCategory(key)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
