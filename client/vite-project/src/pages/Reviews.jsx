import { useEffect, useState } from "react"
import Axios from "axios"
import { Route, Routes } from "react-router-dom"





function Review() {

    const [reviewList, setReviewList] = useState([]);
    const [agentList, setAgentList] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [userList, setUserList] = useState([]);

    //new viewings state hooks

    const [newReviewID, setnewReviewID] = useState("");
    const [newRating, setnewRating] = useState("");
    const [newComment, setnewComment] = useState("");
    const [newReviewDate, setnewReviewDate] = useState("");
    const [newAgentId, setnewAgentId] = useState("");
    const [newPropertyId, setnewPropertyId] = useState("");
    const [newpropertiesReviewReviewID, setnewpropertiesReviewReviewID] = useState("");
    const [newUserId, setnewUserId] = useState("");

    
    const urls = {
        reviews: 'http://flip1.engr.oregonstate.edu:9125/api/review/get',
        agents: 'http://flip1.engr.oregonstate.edu:9125/api/agents/get',
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get',
        users: 'http://flip1.engr.oregonstate.edu:9125/api/users/get'
    };

    const fetchData = async (url) => {
        try{
            const response = await Axios.get(url);
            return response.data;
        } catch (error){
            console.error(`Failed to fetch from ${url}:`, error);
            return [];
        }
    }

    const fetchAllData = async () => {
        try {
            const [reviewsData, agentsData, propertiesData, usersData] = await Promise.all([
                fetchData(urls.reviews),
                fetchData(urls.agents),
                fetchData(urls.properties),
                fetchData(urls.users)
            ]);

            setReviewList(reviewsData);
            setAgentList(agentsData);
            setPropertyList(propertiesData);
            setUserList(usersData);
        } catch (error) {
            console.error('Failed to fetch all data:', error);
        }
    };

    useEffect(() => {

        fetchAllData();
    
    }, []);

    const CreateReview = async () => {
            
        try {
            const response =  await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/review/insert', {
                ReviewID: newReviewID,
                Rating: newRating,
                Comment: newComment,
                ReviewDate: newReviewDate,
                Agent_AgentID: newAgentId,
                properties_ProperyID: newPropertyId,
                properties_Review_ReviewID: newpropertiesReviewReviewID,
                Users_UserID: newUserId
            });
            if (response.status === 201) {
                await fetchAllData();
            } else {
                console.log(response);
            }
        } 
        catch (error) {
            console.error(error);
        }      
    };

    const deleteReview = async (id) => {
        try {
            const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/review/delete/${id}`);
            console.log(response);
            await fetchAllData();
        } catch (error) {
            console.error(error);
        }
    };

    const updateReview = async (id) => {
        try{
            const response = await Axios.put(`http://flip1.engr.oregonstate.edu:9125/api/review/update`, {
                ReviewID: newReviewID,
                Rating: newRating,
                Comment: newComment,
                ReviewDate: newReviewDate,
                Agent_AgentID: newAgentId,
                properties_ProperyID: newPropertyId,
                properties_Review_ReviewID: newpropertiesReviewReviewID,
                Users_UserID: newUserId
            });
            console.log(response);
            await fetchAllData();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="App">
            <h1>Review's</h1>
            <div className="table-container">
               <table>
                <thead>
                    <tr>
                        <th>ReviewID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>ReviewDate</th>
                        <th>Agent ID</th>
                        <th>Property ID</th>
                        <th>properties_Review_ReviewID</th>
                        <th>User ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                  {reviewList.map((val) => (
                    <tr key={val.ReviewID}>
                        <td>{val.ReviewID}</td>
                        <td>{val.Rating}</td>
                        <td>{val.Comment}</td>
                        <td>{val.ReviewDate}</td>
                        <td>{val.Agent_AgentID}</td>
                        <td>{val.properties_PropertyID}</td>
                        <td>{val.properties_Review_ReviewID}</td>
                        <td>{val.Users_UserID}</td> 
                        <td>
                            <button onClick={() => deleteReview(val.ReviewID)}>Delete</button>
                            <button onClick={() => updateReview(val.ReviewID)}>Update</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
                </table> 
            </div>
            <div className="form">
                <label>Create rating</label>
                <input type="text" onChange={(e) => {
                    setnewRating(e.target.value);
                }} />
                <label>Create Comment</label>
                <input type="text" onChange={(e) => {
                    setnewComment(e.target.value);
                }} />
                <label>Create ReviewDate</label>
                <input type="text" onChange={(e) => {
                    setnewReviewDate(e.target.value);
                }} />
            
                <button onClick={CreateReview}>Create Review</button>
            </div>
        </div>
    )
}

export default Review