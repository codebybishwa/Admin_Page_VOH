import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    id: 'OlWs3bAalWEoJngtPmij5',
    heading: '',
    description: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nextedge.health/api/v1/incubator/aboutUs');
        const { _id, heading, description, image } = response.data.data;
        setFormData({ id: _id, heading, description, image });
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data');
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const saveResponse = await axios.post('https://api.nextedge.health/api/v1/incubator/aboutUs', formData);
      console.log('Data saved successfully');
      const { _id, heading, description, image } = saveResponse.data.data;
      setFormData({ id: _id, heading, description, image }); // Update formData with saved data
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold text-[#3ea2d2] mb-4">About Us</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
          className="border border-gray-400 rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 resize-none"
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
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default AboutUs;
