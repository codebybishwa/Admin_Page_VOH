import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import SectionContentAboutUs from '../Components/AboutUs';
import SectionContentPartners from '../Components/Partners';
// Import other section content components

const HomePage = () => {
    const [activeDiv, setActiveDiv] = useState(null);
    const [maxHeights, setMaxHeights] = useState(new Array(7).fill(0));
    const sectionTitles = [
        "About Us",
        "Partners",
        "Our Incubatees",
        "Mentors",
        "Advisors",
        "Gallery",
        "Contact Us"
    ];

    const toggleRedDiv = (index) => {
        const newMaxHeights = [...maxHeights];
        if (activeDiv === index) {
            setActiveDiv(null);
            newMaxHeights[index] = 0;
        } else {
            setActiveDiv(index);
            if (activeDiv !== null) {
                newMaxHeights[activeDiv] = 0; // Close previously active section
            }
            newMaxHeights[index] = '100%'; // Open clicked section
        }
        setMaxHeights(newMaxHeights);
    };

    const isSectionActive = (index) => {
        return activeDiv === index;
    };

    return (
        <div>
            {/* Navigation bar */}
            <nav className="w-full bg-blue-400 py-4 flex items-center justify-between mb-1">
                <h1 className="text-white text-3xl mx-7 font-bold cursor-pointer">VOH Admin</h1>
                <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff" }} className='mx-10 cursor-pointer text-3xl' />
            </nav>

            <div className="flex h-auto">
                {/* Blue section */}
                <div className="w-1/5 h-auto bg-blue-400 hidden lg:flex items-start justify-center shadow shadow-opacity-100 top-0 left-0">
                    <h1 className="text-white text-xl my-5 text-center font-bold">Incubatees</h1>
                </div>

                {/* White section */}
                <div className="lg:w-4/5 xl:w-4/5 w-full bg-white flex flex-wrap overflow-hidden shadow shadow-opacity-100 mx-2 p-4" style={{ height: 'auto', transition: 'height 0.3s ease-in-out' }}>
                    {/* Divisions */}
                    {Array.from({ length: 7 }, (_, i) => (
                        <div className="w-full p-3" key={i}>
                            <div className="bg-blue-500 h-24 flex justify-between items-center cursor-pointer" onClick={() => toggleRedDiv(i)}>
                                <h2 className="text-white text-xl mx-10">{sectionTitles[i]}</h2>
                                <FontAwesomeIcon icon={isSectionActive(i) ? faMinus : faPlus} className='mx-10' />
                            </div>
                            <div className="bg-gray-200 overflow-hidden p-6" style={{ maxHeight: maxHeights[i], transition: 'max-height 0.3s ease-in-out, clip-path 0.3s ease-in-out', clipPath: isSectionActive(i) ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}>
                                {/* Use imported section content component */}
                                {sectionTitles[i] === "About Us" && <SectionContentAboutUs />}
                                {sectionTitles[i] === "Partners" && <SectionContentPartners />}
                                {/* Use other imported section content components similarly */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
