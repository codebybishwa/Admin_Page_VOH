import React from 'react';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { selecteditem } = useParams();

  // This component can be further expanded based on your requirements
  return (
    <div>
      <h1>Welcome to HomePage</h1>
      <p>Selected Item: {selecteditem}</p>
      {/* Add additional content here */}
    </div>
  );
};

export default HomePage;
