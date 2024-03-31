import React, { useState, useEffect } from 'react';

const SectionContentAboutUs = ({ data: initialData, onDataChange }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log(`description changed to ${formData.description}`)
    onDataChange(formData); 
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
      <div className="mb-4">
        <label className="block text-[#3ea2d2] font-bold mb-2" htmlFor="image">Image URL</label>
        <input 
          className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
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

export default SectionContentAboutUs;
