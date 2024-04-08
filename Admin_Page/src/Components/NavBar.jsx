import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <div className="bg-[#3EA2D2] w-full p-4 shadow-md mb-4"> {/* Added mb-4 for bottom margin */}
      <div className="flex items-center justify-between text-white">
        <div className="text-xl font-bold ml-4">VOH Admin</div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
