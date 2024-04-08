import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const MentorsAndAdvisors = () => {
  const [dataList, setDataList] = useState([]);
  const [showAdvisors, setShowAdvisors] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    image: '',
    type: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nextedge.health/api/v1/incubator/mentor-advisor');
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggle = () => {
    setShowAdvisors(!showAdvisors);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setNewItem({
      name: item.name,
      description: item.description,
      image: item.image,
      type: item.type,
    });
    setShowAddForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleFormSubmit = async (updatedItem) => {
    try {
      let response;
      if (editData) {
        // Update existing item
        response = await axios.put(`https://api.nextedge.health/api/v1/incubator/mentor-advisor?id=${editData._id}`, updatedItem);
        const updatedList = dataList.map((item) =>
          item.Id === editData.Id ? { ...item, ...updatedItem } : item
        );
        setDataList(updatedList);
      } else {
        // Add new item
        response = await axios.post('https://api.nextedge.health/api/v1/incubator/mentor-advisor', updatedItem);
        setDataList([...dataList, response.data]); 
      }

      setEditData(null);
      setNewItem({
        name: '',
        description: '',
        image: '',
        type: ''
      });
      setShowAddForm(false);
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://api.nextedge.health/api/v1/incubator/mentor-advisor/${itemId}`);
      const updatedList = dataList.filter((item) => item.Id !== itemId);
      setDataList(updatedList);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Filtered list based on showAdvisors state
  const filteredList = dataList.filter((item) => {
    if (item.type === 'mentor' || item.type === 'advisor') {
      return showAdvisors ? item.type === 'advisor' : item.type === 'mentor';
    }
    return false;
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-[#3ea2d2]">{showAdvisors ? 'Advisors' : 'Mentors'}</h1>
            <button
              onClick={handleToggle}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {showAdvisors ? 'Show Mentors' : 'Show Advisors'}
            </button>
          </div>
          <button
            onClick={() => {
              setEditData(null);
              setNewItem({
                name: '',
                description: '',
                image: '',
                type: ''
              });
              setShowAddForm(true);
              document.body.style.overflow = 'hidden';
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </button>
          <ul>
            {filteredList.map((item) => (
              <li key={item.Id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <div>
                    <p className="text-lg font-bold">{item.name}</p>
                    <p className="text-gray-600">{item.Id}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.Id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {showAddForm && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
                <h2 className="text-xl font-bold mb-4">{editData ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(newItem); }} className="flex flex-col">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Name"
                    className="bg-gray-200 mb-2 py-2 px-4 rounded"
                  />
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Description"
                    className="bg-gray-200 mb-2 py-2 px-4 rounded"
                  />
                  <input
                    type="file"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="bg-gray-200 mb-2 py-2 px-4 rounded"
                  />
                  <input
                    type="text"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    placeholder="Type"
                    className="bg-gray-200 mb-2 py-2 px-4 rounded"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {editData ? 'Save' : 'Add'}
                    </button>
                    <button
                      onClick={() => {
                        setEditData(null);
                        setNewItem({
                          name: '',
                          description: '',
                          image: '',
                          type: ''
                        });
                        setShowAddForm(false);
                        document.body.style.overflow = 'auto';
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsAndAdvisors;
