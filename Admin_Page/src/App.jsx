import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './HomePage/Homepage';
import AboutUs from './Components/AboutUs';
import OurIncubators from './Components/OurIncubators';
import MentorsAndAdvisors from './Components/MentorsAndAdvisors';
import ContactUs from './Components/ContactUs';
import Partners from './Components/Partners';
import Gallery from './Components/Gallery';

const App = () => {
  return (
    <Router basename='/Incubator'>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/MentorsAndAdvisors" element={<MentorsAndAdvisors />} />
          <Route path="/OurIncubators" element={<OurIncubators />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Partners" element={<Partners />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
