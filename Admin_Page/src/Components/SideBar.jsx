import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faHandshake,
  faChalkboardTeacher,
  faImages,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  return (
    <div className="bg-[#3EA2D2] w-1/5 p-4 flex flex-col justify-start items-center text-white">
      <div className="mb-4">
        <ul className="space-y-4">
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faHandshake} className="mr-2" />
            <Link to="/Partners">Partners</Link>
          </li>
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            <Link to="/OurIncubators">Our Incubators</Link>
          </li>
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            <Link to="/MentorsAndAdvisors">Mentors and Advisors</Link>
          </li>
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faImages} className="mr-2" />
            <Link to="/Gallery">Gallery</Link>
          </li>
          <li className="cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <Link to="/ContactUs">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
