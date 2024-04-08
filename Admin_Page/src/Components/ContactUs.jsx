import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [updatedComments, setUpdatedComments] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.nextedge.health/api/v1/incubator/contactUs');
            if (response.data && response.data.data) {
                setContacts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching contact data:', error);
        }
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setUpdatedEmail(contact.email);
        setUpdatedPhone(contact.phone);
        setUpdatedComments(contact.comments);
    };

    const handleCancelEdit = () => {
        setEditingContact(null);
        resetForm();
    };

    const handleUpdateContact = async () => {
        if (!editingContact) return;
    
        const updatedContact = {
            email: updatedEmail,
            phone: updatedPhone,
            comments: updatedComments
        };
    
        try {
            const response = await axios.put(
                `https://api.nextedge.health/api/v1/incubator/contactUs?id=${editingContact._id}`,
                updatedContact
            );
    
            const updatedContacts = contacts.map(contact =>
                contact._id === editingContact._id ? response.data.data : contact
            );
            setContacts(updatedContacts);
    
            setEditingContact(null);
            resetForm();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };
    

    const resetForm = () => {
        setUpdatedEmail('');
        setUpdatedPhone('');
        setUpdatedComments('');
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex">
                <div className="bg-white w-4/5 p-8">
                    <h1 className="text-3xl font-bold mb-4 text-[#3ea2d2]">Contact Us</h1>
                    <div className="p-6 bg-white shadow-md rounded-md">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="mb-6 border-b pb-4">
                                <div className="flex items-center mb-2">
                                    <FontAwesomeIcon icon={faUser} className="text-[#3ea2d2] text-lg mr-2" />
                                    <div className="font-bold">{contact.name}</div>
                                    {!editingContact && (
                                        <button
                                            onClick={() => handleEditContact(contact)}
                                            className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-md"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm text-gray-500">Email:</span>
                                    <div className="text-gray-800">{contact.email}</div>
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm text-gray-500">Phone Number:</span>
                                    <div className="text-gray-800">{contact.phone}</div>
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm text-gray-500">Message:</span>
                                    <div className="text-gray-800">{contact.comments}</div>
                                </div>
                                {editingContact && editingContact._id === contact._id && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                                        <input
                                            type="text"
                                            value={updatedEmail}
                                            onChange={(e) => setUpdatedEmail(e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                        <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Phone Number:</label>
                                        <input
                                            type="text"
                                            value={updatedPhone}
                                            onChange={(e) => setUpdatedPhone(e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                        <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Message:</label>
                                        <textarea
                                            value={updatedComments}
                                            onChange={(e) => setUpdatedComments(e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                            rows="4"
                                        />
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={handleUpdateContact}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
