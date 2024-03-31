import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import SectionContentAboutUs from '../Components/AboutUs';
import SectionContentPartners from '../Components/Partners';
import SectionContentOurIncubators from '../Components/OurIncubators';
import MentorsAndAdvisors from '../Components/MentorsAndAdvisors';
import Gallery from '../Components/Gallery';
import ContactUs from '../Components/ContactUs';
import { faInfoCircle, faHandshake, faUsers, faChalkboardTeacher, faImages, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

const HomePage = () => {
    const [activeDiv, setActiveDiv] = useState(null);
    const [maxHeights, setMaxHeights] = useState(new Array(7).fill(0));
    const [sectionData, setSectionData] = useState({
        aboutUs: {
            heading: 'Welcome to our Startup Incubator!',
            description: 'We are dedicated to fostering innovation and supporting entrepreneurs on their journey to success.',
            image: 'https://example.com/startup-incubator.jpg'
        },
        partners: {
            heading: '',
            description: '',
            logo: '',
            link: ''
        },
        ourIncubator: {
            heading: '',
            description: '',
            logo: '',
            link: ''
        },
        mentorsAndAdvisors: {
            name: '',
            description: '',
            type: 'mentor'
        },
        gallery: {
            image: '',
            Link: ''
        },
        contactUs: {
            Name: '',
            Email: '',
            PhoneNumber: '',
            Comments: ''
        }
    });

    const sectionTitles = [
        "About Us",
        "Partners",
        "Our Incubators",
        "Mentors & Advisors",
        "Gallery",
        "Contact Us",
    ];

    const toggleRedDiv = (index) => {
        const newMaxHeights = [...maxHeights];
        if (activeDiv === index) {
            setActiveDiv(null);
            newMaxHeights[index] = 0;
        } else {
            setActiveDiv(index);
            if (activeDiv !== null) {
                newMaxHeights[activeDiv] = 0;
            }
            newMaxHeights[index] = '90vh';
        }
        setMaxHeights(newMaxHeights);
    };

    const isSectionActive = (index) => {
        return activeDiv === index;
    };

    const updateSectionData = (sectionName, newData) => {
        setSectionData((prevData) => ({
            ...prevData,
            [sectionName]: newData,
        }));
    };

    return (
        <div>
            <nav className="w-full bg-[#3ea2d2] py-4 flex items-center justify-between mb-1">
                <h1 className="text-white text-3xl mx-7 font-bold cursor-pointer">VOH Admin</h1>
                <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: '#ffffff' }}
                    className="mx-10 cursor-pointer text-3xl"
                />
            </nav>

            <div className="flex h-auto">
            <div className="w-[15%] h-auto bg-[#3ea2d2] hidden lg:flex flex-col items-start justify-start shadow shadow-opacity-100 top-0 left-0">
    <div className="mt-5">
        <h1 className="text-white text-xl my-2 mx-2 text-center">STARTUP INCUBATOR</h1>
    </div>
    <div>
        <ul className="text-white">
            {sectionTitles.map((title, i) => (
                <li key={i} className="cursor-pointer my-2 flex items-center mx-7" onClick={() => toggleRedDiv(i)}>
                    {title === "About Us" && <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />} 
                    {title === "Partners" && <FontAwesomeIcon icon={faHandshake} className="mr-2" />} 
                    {title === "Our Incubators" && <FontAwesomeIcon icon={faUsers} className="mr-2" />}
                    {title === "Mentors & Advisors" && <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />}
                    {title === "Gallery" && <FontAwesomeIcon icon={faImages} className="mr-2" />} 
                    {title === "Contact Us" && <FontAwesomeIcon icon={faEnvelope} className="mr-2" />} 
                    <span>{title}</span>
                </li>
            ))}
        </ul>
    </div>
</div>

                <div className="lg:w-5/6 xl:w-5/6 w-full bg-white flex flex-wrap overflow-hidden shadow shadow-opacity-100 mx-2 p-4">
                    {sectionTitles.map((title, i) => (
                        <div className="w-full p-3" key={i}>
                            <div
                                className="bg-[#3ea2d2] h-20 flex justify-between items-center cursor-pointer rounded-t-lg"
                                onClick={() => toggleRedDiv(i)}
                            >
                                <h2 className="text-white text-xl mx-10">{title}</h2>
                                <FontAwesomeIcon
                                    icon={isSectionActive(i) ? faMinus : faPlus}
                                    className="mx-10"
                                />
                            </div>
                            <div
                                className="bg-gray-200 overflow-hidden p-6 rounded-b-lg"
                                style={{
                                    maxHeight: maxHeights[i],
                                    transition: 'max-height 0.3s ease-in-out, clip-path 0.3s ease-in-out',
                                    clipPath: isSectionActive(i) ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
                                }}
                            >
                                {title === 'About Us' && (
                                    <SectionContentAboutUs
                                        data={sectionData.aboutUs}
                                        onDataChange={(newData) => updateSectionData('aboutUs', newData)}
                                    />
                                )}
                                {title === 'Partners' && (
                                    <SectionContentPartners
                                        data={sectionData.partners}
                                        onDataChange={(newData) => updateSectionData('partners', newData)}
                                    />
                                )}
                                {title === 'Our Incubators' && (
                                    <SectionContentOurIncubators
                                        data={sectionData.ourIncubator}
                                        onDataChange={(newData) => updateSectionData('ourIncubator', newData)}
                                    />
                                )}
                                {title === 'Mentors & Advisors' && (
                                    <MentorsAndAdvisors
                                        data={sectionData.mentorsAndAdvisors}
                                        onDataChange={(newData) => updateSectionData('mentorsAndAdvisors', newData)}
                                    />
                                )}
                                {title === 'Gallery' && (
                                    <Gallery
                                        data={sectionData.gallery}
                                        onDataChange={(newData) => updateSectionData('gallery', newData)}
                                    />
                                )}
                                {title === 'Contact Us' && (
                                    <ContactUs
                                        data={sectionData.contactUs}
                                        onDataChange={(newData) => updateSectionData('contactUs', newData)}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
