import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function PropertyComparison() {

    const [propertyCompareList, setPropertyCompareList] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [propertyFeatureList, setPropertyFeatureList] = useState([]);

    const [newPropertyId, setNewPropertyId] = useState("");
    const [newPropertyFeatureId, setNewPropertyFeatureId] = useState("");

    const url = {

        propertyCompare: 'http://flip1.engr.oregonstate.edu:9125/api/propertyCompare/get',
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get',
        propertyFeatures: 'http://flip1.engr.oregonstate.edu:9125/api/feature/get'
    };

    const fetchProperties = async (url) => {
        try {
            const response = await Axios.get(url)
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            return [];
        }
    }

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

    useEffect(() => {
        fetchAllData();
    }, []);

    const deletePropertyCompare = async (id) => {
        try {
            await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/propertyCompare/delete/${id}`);
            fetchAllData();
        } catch (error) {
            console.error('Failed to delete property compare:', error);
        }
    };

    return (
        <div className="App">
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