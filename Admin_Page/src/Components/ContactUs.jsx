import React, { useState } from 'react';

const ContactUs = ({ data: initialData, onDataChange: onUpdate }) => {
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
            <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                    <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="Name">Name</label>
                    <input 
                        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="Email">Email</label>
                    <input 
                        className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="PhoneNumber">Phone Number</label>
                <input 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    type="tel"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
            </div>
            <div className="mb-4">
                <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="Comments">Comments</label>
                <textarea 
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
                    name="Comments"
                    value={formData.Comments}
                    onChange={handleChange}
                    placeholder="Comments"
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

export default ContactUs;
