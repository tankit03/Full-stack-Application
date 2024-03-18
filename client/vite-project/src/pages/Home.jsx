// 1 Citation for the following function:
// 2 Date: 12/18/2022
// 3 Based on Pedro Tech video on implementing a CRUD application with React and Node.js
// 4 Source URL: https://www.youtube.com/watch?v=re3OIOr9dJI
// 5

import React from 'react';
import { useState, useEffect } from 'react';
import homeImage1 from '../assets/home1.png';
import homeImage2 from '../assets/homeImage2.png';
import homeImage3 from '../assets/homeImage3.png';


export default function Home() {

    // Array of images

    const images = [homeImage1, homeImage2, homeImage3]; // Array of images
    const [currentImage, setCurrentImage] = useState(images[0]); // State to keep track of the current image

    useEffect(() => {
        const timer = setInterval(() => { // Set an interval to run every 2 seconds
            setCurrentImage(prevImage => { // Update the current image
                const currentIndex = images.indexOf(prevImage); // Get the index of the current image
                const nextIndex = (currentIndex + 1) % images.length; // Calculate the index of the next image
                return images[nextIndex]; // Return the next image
            });
        }, 2000); // 2000 milliseconds = 2 seconds

        return () => clearInterval(timer); // Clear the interval when the component unmounts
    }, [images]);

    return (
        <>
            <h1 className="home-title">Welcome to Real Estate Database</h1>
            <div className="home-container">
                <img src={currentImage} alt="Description of the image" className="home-image" />
                <div className="home-text">
                    
                    <p className="home-intro">In 2023, two college students, Tanish Hupare and Zachary Douglas Martin found themselves looking for a place to live to get through their studies, Frustrated by the complexities of the real estate market. Both Computer scientists observed the plethora of websites available, none of these websites allowed an easy way to compare properties with different needs and categories.This gap in the market sparked an idea to make a database driven backend service. This database service will aim to simplify the process of finding and comparing real estate options.This website will help facilitate users in exploring properties for sale or rent, connecting with real estate agents, and utilizing comparison features to make informed decisions. This system will aid users to access information of properties: Hold details of each property, such as propertyID, Location, price, type, and etc. It can track agents in the area, with their contact information and agentID. The service will store data regarding User profile like userID, name, contact, information, and preferences. Finally the database will track property viewings, property, property_features, property_Feature_Comparison, agent, user, viewings, reviews. anticipated to handle 10,000 users and 500 real estate agents with an estimated 1,000 transactions per year.</p>
                    
                </div>
            </div>
            <hr />
        </>
    )
}