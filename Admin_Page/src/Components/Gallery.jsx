import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar'; // Import the SideBar component

const Gallery = ({ handleComponentChange }) => {
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nextedge.health/api/v1/incubator/gallery');
      if (response.data && response.data.data) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await axios.delete(`https://api.nextedge.health/api/v1/incubator/gallery/${id}`);
      if (response.status === 200) {
        const updatedImages = images.filter(image => image._id !== id);
        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleAddImage = async () => {
    if (newImageUrl.trim() !== '') {
      try {
        const response = await axios.post('https://api.nextedge.health/api/v1/incubator/gallery', {
          link: newImageUrl
        });
        setImages([...images, response.data]);
        setNewImageUrl('');
      } catch (error) {
        console.error('Error adding image:', error);
      }
    }
  };

  const handleEditImage = async (id, newLink) => {
    try {
      const response = await axios.put(`https://api.nextedge.health/api/v1/incubator/gallery/${id}`, {
        link: newLink
      });
      const updatedImages = images.map(image => (image._id === id ? response.data : image));
      setImages(updatedImages);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex flex-1">

        {/* Content Area */}
        <div className="ml-5">
          <h1 className="text-3xl font-bold mb-4 text-[#3ea2d2]">Image Gallery</h1>

          {/* Add Image Form */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="px-4 py-2 mr-2 border rounded"
            />
            <button
              onClick={handleAddImage}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Image
            </button>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-3 gap-8">
            {images.map((image) => (
              <div key={image._id} className="flex flex-col items-center border p-4 rounded-lg">
                <img
                  src={image.link}
                  alt={`Image ${image._id}`}
                  className="w-full h-auto mb-2"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={image.link}
                    onChange={(e) => handleEditImage(image._id, e.target.value)}
                    className="px-4 py-2 mr-2 border rounded"
                  />
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
