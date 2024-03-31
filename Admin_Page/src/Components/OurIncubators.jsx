import React, { useState } from 'react';

const SectionContentOurIncubators = ({ data: initialData, onDataChange: onUpdate }) => {
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
        <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="heading">Heading</label>
        <input 
          className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Heading"
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
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="logo">Logo URL</label>
          <input 
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Logo URL"
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="link">Link</label>
          <input 
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Link"
          />
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

export default SectionContentOurIncubators;
