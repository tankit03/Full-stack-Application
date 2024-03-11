import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'


function PropertyFeature() {

    const [FeatureID, setFeatureID] = useState("");
    const [Feature, setFeature] = useState("");
    const [Featurelist, setFeatureList] = useState([]);

    const [NewFeatureID, setNewFeatureID] = useState("");
    const [NewFeature, setNewFeature] = useState("");

    const fetchFeatures = async () => {
        const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/feature/get')
        const data = response.data;
        setFeatureList(data);
    }

    useEffect(() => {
        const getFeatures = async () => {
            const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/feature/get')
            const data = response.data;
            setFeatureList(data);
        }
        getFeatures();
    }, []);

    const createFeature = async () => {
        try{
            const response = await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/feature/insert', {
                FeatureID: FeatureID,
                Feature: Feature
            });
            if (response.status === 201) {
                await fetchFeatures();
            } else {
                console.log(response);
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    

    const deleteFeature = async (id) => {

        try{
            const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/feature/delete/${id}`);
            console.log(response);
            await fetchFeatures(); 
        } catch (error) {
            console.error(error);
        }
    }

    const updateFeature = async (id) => {

        try{
            const response = await Axios.put('http://flip1.engr.oregonstate.edu:9125/api/feature/update', {
                FeatureID: id,
                Feature: NewFeature
            });
            console.log(response);
            const feature = response.data;
            console.log(feature);
            setFeatureList(feature);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="App">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Feature ID</th>
                            <th>Feature</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Featurelist.map((val) => (
                            <tr key={val.FeatureID}>
                                <td>{val.FeatureID}</td>
                                <td>{val.Feature}</td>
                                <td>
                                    <button onClick={() => deleteFeature(val.FeatureID)}>Delete</button>
                                    <input type="text" id="NewFeatureID" onChange={(e) => { 
                                        setNewFeature(e.target.value) 
                                    }} />
                                    <button onClick={() => updateFeature(val.FeatureID)}>Update</button>
                                </td>
                            </tr>                          
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="form">
                <label>Feature:</label>
                <input type="text" name="Feature" onChange={(e) => { 
                    setFeature(e.target.value) 
                }} />
                <button onClick={createFeature}>Add Feature</button>
            </div>
        </div>
    )
}

export default PropertyFeature