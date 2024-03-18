// 1 Citation for the following function:
// 2 Date: 12/18/2022
// 3 Based on Pedro Tech video on implementing a CRUD application with React and Node.js
// 4 Source URL: https://www.youtube.com/watch?v=re3OIOr9dJI
// 5
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function PropertyComparison() {

    // State hooks with proper camelCase naming

    const [propertyCompareList, setPropertyCompareList] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [propertyFeatureList, setPropertyFeatureList] = useState([]);

    // New viewing state hooks
    const [newPropertyId, setNewPropertyId] = useState("");
    const [newPropertyFeatureId, setNewPropertyFeatureId] = useState("");

    // Fetch all data from the server
    const url = {

        propertyCompare: 'http://flip1.engr.oregonstate.edu:9125/api/propertyCompare/get',
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get',
        propertyFeatures: 'http://flip1.engr.oregonstate.edu:9125/api/feature/get'
    };

    // Fetch data from the server

    const fetchProperties = async (url) => {
        try {
            const response = await Axios.get(url)
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            return [];
        }
    }

    // Fetch all data from the server

    const fetchAllData = async () => {
        try {
            const [propertiesCompareData, propertiesData, propertyFeaturesData] = await Promise.all([
                fetchProperties(url.propertyCompare),
                fetchProperties(url.properties),
                fetchProperties(url.propertyFeatures)
            ]);
            setPropertyCompareList(propertiesCompareData);
            setPropertyList(propertiesData);
            setPropertyFeatureList(propertyFeaturesData);
        } catch (error) {
            console.error('Failed to fetch all data:', error);
        }
    }

    // Fetch data from the server

    useEffect(() => {
        fetchAllData();
    }, []);

    // Fetch all data from the server

    return (
        <div className="App">
            {/* Add a form to create a new property comparison */}
            <h1>Property Comparison</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Property Feature ID</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {propertyCompareList.map((property) => (
                            <tr key={property.properties_PropertyID}>
                                <td>{property.properties_PropertyID}</td>
                                <td>{property.Properties_Feature_FeatureID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}