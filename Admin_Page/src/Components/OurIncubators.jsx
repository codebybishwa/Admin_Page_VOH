import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OurIncubators = () => {
  const [incubatees, setIncubatees] = useState([]);
  const [newIncubatee, setNewIncubatee] = useState({
    heading: '',
    description: '',
    logo: '',
    link: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIncubatee, setEditIncubatee] = useState({
    _id: '',
    heading: '',
    description: '',
    logo: '',
    link: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nextedge.health/api/v1/incubator/incubatee');
      if (response.data && response.data.data) {
        setIncubatees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddIncubatee = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.nextedge.health/api/v1/incubator/incubatee', newIncubatee);
      setIncubatees([...incubatees, response.data]);
      console.log('Incubatee added successfully:', response.data);
      setNewIncubatee({
        heading: '',
        description: '',
        logo: '',
        link: ''
      });
    } catch (error) {
      console.error('Error adding incubatee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditIncubatee = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`https://api.nextedge.health/api/v1/incubator/incubatee?id=${editIncubatee._id}`, editIncubatee);
      if (response.status === 200) {
        const updatedIncubatees = incubatees.map(incubatee =>
          incubatee._id === editIncubatee._id ? response.data : incubatee
        );
        setIncubatees(updatedIncubatees);
        console.log(`Incubatee with ID ${editIncubatee._id} updated successfully.`);
        setEditMode(false);
        setEditIncubatee({
          _id: '',
          heading: '',
          description: '',
          logo: '',
          link: ''
        });
      }
    } catch (error) {
      console.error('Error updating incubatee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditIncubatee(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNewIncubatee(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleEditClick = (incubatee) => {
    setEditMode(true);
    setEditIncubatee(incubatee);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Incubatees</h1>

      {/* Add/Edit Incubatee Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Heading"
          name="heading"
          value={editMode ? editIncubatee.heading : newIncubatee.heading}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={editMode ? editIncubatee.description : newIncubatee.description}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Logo URL"
          name="logo"
          value={editMode ? editIncubatee.logo : newIncubatee.logo}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          value={editMode ? editIncubatee.link : newIncubatee.link}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <button
          onClick={editMode ? handleEditIncubatee : handleAddIncubatee}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : (editMode ? 'Save Changes' : 'Add Incubatee')}
        </button>
        {editMode && (
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Incubatee List */}
      <div className="grid grid-cols-3 gap-4">
        {incubatees.map(incubatee => (
          <div key={incubatee._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{incubatee.heading}</h2>
            <p>ID: {incubatee._id}</p>
            <p>Description: {incubatee.description}</p>
            <p>Logo: {incubatee.logo}</p>
            <p>Link: {incubatee.link}</p>
            <div className="flex mt-4">
              <button
                onClick={() => handleEditClick(incubatee)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              {/* Add Delete Button Here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurIncubators;
