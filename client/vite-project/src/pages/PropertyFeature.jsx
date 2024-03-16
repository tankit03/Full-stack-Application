import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'



function PropertyFeature() {

    const [FeatureID, setFeatureID] = useState("");
    const [Feature, setFeature] = useState("");
    const [Featurelist, setFeatureList] = useState([]);

    const [SelectedFeatureID, setSelectedFeatureID] = useState("");
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
            
            setFeatureList(feature);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="App">
            <h1>Property Feature</h1>
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
                                    
                                </td>
                            </tr>                          
                        ))}
                    </tbody>
                </table>
            </div>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2>Create Feature's</h2>
                <label>Feature:</label>
                <input type="text" name="Feature" placeholder="Add feature, Ex: cool flying pool" onChange={(e) => { 
                    setFeature(e.target.value) 
                }} />
                <button onClick={createFeature}>Add Feature</button>
            </form>
            
            <form className="form" onSubmit={(e) =>  e.preventDefault()}>
                
                <h2>Update Feature</h2>
                <label>Select Feature ID to update: </label>
                <select className="dropdown" onChange={(e) => setSelectedFeatureID(e.target.value)} value={SelectedFeatureID}>
                    <option value="">Select Feature ID</option>
                    {Featurelist.map((feature) => (
                        <option key={feature.FeatureID} value={feature.FeatureID}>{feature.FeatureID}</option>
                    ))}
                </select>
                <label>New Feature:</label>
                <input type="text" placeholder="New feature description" onChange={(e) => setNewFeature(e.target.value)} value={NewFeature} />
                <button type="submit" onClick={() => updateFeature(SelectedFeatureID)} >Update Feature</button>
            </form>
        </div>
    )
}

export default PropertyFeature