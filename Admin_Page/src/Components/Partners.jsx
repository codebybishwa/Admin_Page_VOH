import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({
    heading: '',
    description: '',
    logo: '',
    link: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPartner, setEditPartner] = useState({
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
      const response = await axios.get('https://api.nextedge.health/api/v1/incubator/partner');
      if (response.data && response.data.data) {
        setPartners(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddPartner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.nextedge.health/api/v1/incubator/partner', newPartner);
      setPartners([...partners, response.data]);
      console.log('Partner added successfully:', response.data);
      setNewPartner({
        heading: '',
        description: '',
        logo: '',
        link: ''
      });
    } catch (error) {
      console.error('Error adding partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPartner = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`https://api.nextedge.health/api/v1/incubator/partner?id=${editPartner._id}`, editPartner);
      if (response.status === 200) {
        const updatedPartners = partners.map(partner =>
          partner._id === editPartner._id ? response.data : partner
        );
        setPartners(updatedPartners);
        console.log(`Partner with ID ${editPartner._id} updated successfully.`);
        setEditMode(false);
        setEditPartner({
          _id: '',
          heading: '',
          description: '',
          logo: '',
          link: ''
        });
      }
    } catch (error) {
      console.error('Error updating partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditPartner(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNewPartner(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleEditClick = (partner) => {
    setEditMode(true);
    setEditPartner(partner);
  };

  const renderForm = () => {
    const partnerData = editMode ? editPartner : newPartner;
    const buttonText = editMode ? 'Save Changes' : 'Add Partner';

    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Heading"
          name="heading"
          value={partnerData.heading}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={partnerData.description}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Logo URL"
          name="logo"
          value={partnerData.logo}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          value={partnerData.link}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
        />
        <button
          onClick={editMode ? handleEditPartner : handleAddPartner}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : buttonText}
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
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Partner List</h1>

      {/* Add/Edit Partner Form */}
      {renderForm()}

      {/* Partner List */}
      <div className="grid grid-cols-3 gap-4">
        {partners.map(partner => (
          <div key={partner._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{partner.heading}</h2>
            <p>ID: {partner._id}</p>
            <p>Description: {partner.description}</p>
            <p>Link: {partner.link}</p>
            <div className="flex mt-4">
              <button
                onClick={() => handleEditClick(partner)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
