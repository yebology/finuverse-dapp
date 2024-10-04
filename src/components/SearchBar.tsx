import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search courses..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-bar"
        />
    );
};

export default SearchBar;