import React, { useEffect, useState } from 'react';
import Axios from 'axios';
 
function Viewings() {
    // State hooks with proper camelCase naming
    const [viewingList, setViewingList] = useState([]);
    const [agentsList, setAgentsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [propertiesList, setPropertiesList] = useState([]);

    // New viewing state hooks
    const [newViewingDate, setNewViewingDate] = useState("");
    const [newComments, setNewComments] = useState("");
    const [newAgentId, setNewAgentId] = useState("");
    const [newUserId, setNewUserId] = useState("");
    const [newPropertyId, setNewPropertyId] = useState("");

    const urls = {
        viewings: 'http://flip1.engr.oregonstate.edu:9125/api/viewing/get',
        agents: 'http://flip1.engr.oregonstate.edu:9125/api/agents/get',
        users: 'http://flip1.engr.oregonstate.edu:9125/api/users/get',
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get'
    };

    const fetchData = async (url) => {
        try {
            const response = await Axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            return [];
        }
    };

    const fetchAllData = async () => {
        try {
            const [viewingsData, agentsData, usersData, propertiesData] = await Promise.all([
                fetchData(urls.viewings),
                fetchData(urls.agents),
                fetchData(urls.users),
                fetchData(urls.properties),
            ]);

            setViewingList(viewingsData);
            setAgentsList(agentsData);
            setUsersList(usersData);
            setPropertiesList(propertiesData);
        } catch (error) {
            console.error('Failed to fetch all data:', error);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);
 
    const createViewing = async () => {
        console.log("back-end data: ",newViewingDate, newComments, newAgentId, newUserId, newPropertyId);
        try {
            const response = await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/viewing/insert', {
                ViewingDate: newViewingDate,
                Comments: newComments,
                AgentID: newAgentId,
                UserID: newUserId,
                PropertyID: newPropertyId
            });
 
            if (response.status === 201) {
                await fetchAllData(); // Fetch all data again to refresh the list
            }
        } catch (error) {
            console.error(error);
        }
    };
 
    const deleteViewing = async (id) => {
        try {
            await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/viewing/delete/${id}`);
            await fetchAllData(); // Refresh the list after deletion
        } catch (error) {
            console.error(error);
        }
    };
 
    const updateViewing = async (id) => {
        try {
            await Axios.put('http://flip1.engr.oregonstate.edu:9125/api/viewing/update', {
                ViewingID: id,
                ViewingDate: newViewingDate,
                Comments: newComments,
                AgentID: newAgentId,
                UserID: newUserId,
                PropertyID: newPropertyId
            });
 
            await fetchAllData(); // Refresh the list after update
        } catch (error) {
            console.error(error);
        }
    };
 
	return (
    <div className="App">
        {/* Viewing Table */}
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
                    {viewingList.map((viewing) => (
                        <tr key={viewing.ViewingID}>
                            <td>{viewing.ViewingID}</td>
                            <td>{viewing.ViewingDate}</td>
                            <td>{viewing.Comment}</td>
                            <td>{viewing.Agents_AgentID}</td>
                            <td>{viewing.USER_UserID}</td>
                            <td>{viewing.properties_PropertyID}</td>
                            <td>
                                <button onClick={() => deleteViewing(viewing.ViewingID)}>Delete</button>
                                <button onClick={() => updateViewing(viewing.ViewingID)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
 
        {/* Creation Form */}
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h2>Create Viewing</h2>
            <input type="text" placeholder="Viewing Date" onChange={(e) => setNewViewingDate(e.target.value)} />
            <input type="text" placeholder="Comments" onChange={(e) => setNewComments(e.target.value)} />
 
            <select className="dropdown" onChange={(e) => setNewAgentId(e.target.value)}>
                <option value="">Select Agent</option>
                {agentsList.map((agent) => (
                    <option key={agent.AgentID} value={agent.AgentID}>
                        {agent.firstName} {agent.lastName}
                    </option>
                ))}
            </select>
 
            <select className="dropdown" onChange={(e) => setNewUserId(e.target.value)}>
                <option value="">Select User</option>
                {usersList.map((user) => (
                    <option key={user.UserID} value={user.UserID}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </select>
 
            <select className="dropdown" onChange={(e) => setNewPropertyId(e.target.value)}>
                <option value="">Select Property</option>
                {propertiesList.map((property) => (
                    <option key={property.PropertyID} value={property.PropertyID}>
                        {property.Address}, {property.City}
                    </option>
                ))}
            </select>
 
            <button type="submit" onClick={createViewing}>Create Viewing</button>
        </form>
    </div>
);
}
 
export default Viewings;