import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Gallery = ({ data: initialData, onDataChange: onUpdate }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        onUpdate(formData); 
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="image">Image</label>
                <input 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="Link">Link</label>
                <input 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    type="text"
                    name="Link"
                    value={formData.Link}
                    onChange={handleChange}
                    placeholder="Link URL"
                />
            </div>
            <button 
                className="bg-[#3ea2d2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default Gallery;
