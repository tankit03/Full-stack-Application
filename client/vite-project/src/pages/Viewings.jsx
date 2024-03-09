import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'

function Viewings() {

    const [ViewingID, setViewingID] = useState("");
    const [ViewingDate, setViewingDate] = useState("");
    const [Comments, setComments] = useState("");
    const [Agents_AgentID, setAgents_AgentID] = useState("");
    const [User_userID, setUser_userID] = useState("");
    const [Properties_propertyID, setProperties_propertyID] = useState("");
    const [ViewingList, setViewingList] = useState([]);

    const [NewViewingID, setNewViewingID] = useState("");
    const [NewViewingDate, setNewViewingDate] = useState("");
    const [NewComments, setNewComments] = useState("");
    const [NewAgents_AgentID, setNewAgents_AgentID] = useState("");
    const [NewUser_userID, setNewUser_userID] = useState("");

    const [NewProperties_propertyID, setNewProperties_propertyID] = useState("");

    const fetchViewings = async () => {
        const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/viewing/get')
        const data = response.data;
        setViewingList(data);
    }

    useEffect(() => {
        const getViewings = async () => {
            const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/viewing/get')
            const data = response.data;
            setViewingList(data);
        }
        getViewings();
    }, []);

    const createViewing = () => {

        Axios.post('http://flip1.engr.oregonstate.edu:9125/api/viewing/insert', {
            ViewingID: ViewingID,
            ViewingDate: ViewingDate,
            Comments: Comments,
            Agents_AgentID: Agents_AgentID,
            User_userID: User_userID,
            Properties_propertyID: Properties_propertyID
        });

        setViewingList([
            ...ViewingList,
            {
                ViewingID: ViewingID,
                ViewingDate: ViewingDate,
                Comments: Comments,
                Agents_AgentID: Agents_AgentID,
                User_userID: User_userID,
                Properties_propertyID: Properties_propertyID
            },]);

            console.log(ViewingList);
    };

    const deleteViewing = async (id) => {
            
            try{
                const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/viewing/delete/${id}`);
                console.log(response);
                await fetchViewings(); 
            } catch (error) {
                console.error(error);
            }
        }

    const updateViewing = async (id) => {

        try{
            const response = await Axios.put('http://flip1.engr.oregonstate.edu:9125/api/viewing/update', {
                ViewingID: id,
                ViewingDate: NewViewingDate,
                Comments: NewComments,
                Agents_AgentID: NewAgents_AgentID,
                User_userID: NewUser_userID,
                Properties_propertyID: NewProperties_propertyID
            });
            console.log(response);
            const viewing = response.data;
            console.log(viewing);
            setViewingList(viewing);

        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="App">

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Viewing ID</th>
                            <th>Viewing Date</th>
                            <th>Comments</th>
                            <th>Agent ID</th>
                            <th>User ID</th>
                            <th>Property ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ViewingList.map((val) => (
                            <tr key={val.ViewingID}>
                                <td>{val.ViewingID}</td>
                                <td>{val.ViewingDate}</td>
                                <td>{val.Comment}</td>
                                <td>{val.Agents_AgentID}</td>
                                <td>{val.USER_UserID}</td>
                                <td>{val.properties_ProperyID}</td>
                                <td>
                                    <button onClick={() => deleteViewing(val.ViewingID)}>Delete</button>
                                    <input type="text" id="updateInput" onChange={(e) => {
                                      setNewViewingDate(e.target.value);
                                    }
                                    } />
                                    <input type="text" id="updateInput" onChange={(e) => {
                                      setNewComments(e.target.value);
                                    }
                                    } />
                                    <button onClick={() => updateViewing(val.ViewingID)}>Update</button>
                                </td>
                            </tr>
                       ))}
                    </tbody>
                </table>
            </div>
            <div className="form">
                <h2>Create Viewing</h2>
                <input type="text" onChange={(e) => {
                    setViewingDate(e.target.value);
                }} />
                <input type="text" onChange={(e) => {
                    setComments(e.target.value);
                }} />
                <button onClick={createViewing}>Create Viewing</button>
            </div>
        </div>
    )
}

export default Viewings