import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const MentorsAndAdvisors = ({ data: initialData, onDataChange: onUpdate }) => {
    const [formData, setFormData] = useState(initialData);
    const [typeText, setTypeText] = useState("Mentors");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const toggleType = () => {
        const currentType = formData.type === "mentor" ? "advisor" : "mentor";
        setFormData(prevData => ({
            ...prevData,
            type: currentType
        }));
        setTypeText(currentType === "mentor" ? "Mentors" : "Advisors");
    };

    const handleSave = () => {
        onUpdate(formData); 
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="name">Name</label>
                <input 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="description">Description</label>
                <textarea 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
            </div>
            <div className="mb-4">
                <div className="flex items-center cursor-pointer" onClick={toggleType}>
                    <span className="text-[#3ea2d2] font-bold mr-2">Type:</span>
                    <div className="w-8 h-8 flex justify-center items-center border border-gray-400 rounded-md">
                        <FontAwesomeIcon icon={formData.type === "mentor" ? faArrowUp : faArrowDown} className="text-gray-700" />
                    </div>
                    <span className="ml-2">{typeText}</span>
                </div>
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

export default MentorsAndAdvisors;
