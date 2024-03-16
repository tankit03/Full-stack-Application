import { useEffect, useState } from "react"
import Axios from "axios"
import { Route, Routes } from "react-router-dom"

function Review() {

    const [reviewList, setReviewList] = useState([]);
    const [agentList, setAgentList] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [userList, setUserList] = useState([]);

    //new viewings state hooks

    const [SelectedReviewID, setSelectedReviewID] = useState("");
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
            await Axios.put(`http://flip1.engr.oregonstate.edu:9125/api/review/update`, {
                ReviewID: id,
                Rating: newRating,
                Comment: newComment,
                ReviewDate: newReviewDate,
                Agent_AgentID: newAgentId,
                properties_ProperyID: newPropertyId,
                properties_Review_ReviewID: newpropertiesReviewReviewID,
                Users_UserID: newUserId
            });
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
                        <th>Review Date</th>
                        <th>Agent ID</th>
                        <th>Property ID</th>
                        <th>Properties Review ID</th>
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
                        </td>
                    </tr>
                  ))}
                </tbody>
                </table> 
            </div>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2>Create User</h2>
                <label>Create rating</label>
                <input type="text" placeholder="Rating, Ex: 4,5 or 8" onChange={(e) => {
                    setnewRating(e.target.value);
                }} />
                <label>Create Comment</label>
                <input type="text" placeholder="Type comment" onChange={(e) => {
                    setnewComment(e.target.value);
                }} />
                <label>Create ReviewDate</label>
                <input type="text" placeholder="Type Date, Ex: 2024" onChange={(e) => {
                    setnewReviewDate(e.target.value);
                }} />

                <select className="dropdown" onChange={(e) => setnewAgentId(e.target.value)}>
                    <option value="">Select Agent</option>
                    {agentList.map((agent) => (
                        <option key={agent.AgentID} value={agent.AgentID}>
                            {agent.firstName} {agent.lastName}
                        </option>
                    ))}
                </select>

                <select className="dropdown" onChange={(e) => setnewPropertyId(e.target.value)}>
                    <option value="">Select Property</option>
                    {propertyList.map((property) => (
                        <option key={property.PropertyID} value={property.PropertyID}>
                            {property.Title}
                        </option>
                    ))}
                </select>

                <select className="dropdown" onChange={(e) => setnewpropertiesReviewReviewID(e.target.value)}>
                    <option value="">Select Review ID</option>
                    {reviewList.map((review) => (
                        <option key={review.ReviewID} value={review.ReviewID}>
                            {review.ReviewID}
                        </option>
                    ))}
                </select>


                <select className="dropdown" onChange={(e) => setnewUserId(e.target.value)}>
                    <option value="">Select User</option>
                    {userList.map((user) => (
                        <option key={user.UserID} value={user.UserID}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
                <button onClick={CreateReview}>Create Review</button>
            </form>
    
            <form className="form" onSubmit={(e) => e.preventDefault()}>

                <h2>Update Review</h2>
                <label>Select Review ID to update: </label>
                <select className="dropdown" onChange={(e) => setSelectedReviewID(e.target.value)} value={SelectedReviewID}>
                    <option value="">Select Review ID</option>
                    {reviewList.map((review) => (
                        <option key={review.ReviewID} value={review.ReviewID}>{review.ReviewID}</option>
                    ))}
                </select>
                <label>New Rating:</label>
                <input type="text" placeholder="New rating" onChange={(e) => setnewRating(e.target.value)} value={newRating} />
                <label>New Comment:</label>
                <input type="text" placeholder="New comment" onChange={(e) => setnewComment(e.target.value)} value={newComment} />
                <label>New Review Date:</label>
                <input type="text" placeholder="New review date" onChange={(e) => setnewReviewDate(e.target.value)} value={newReviewDate} />
                <button type="submit" onClick={() => updateReview(SelectedReviewID)} >Update Review</button>
            </form>
        </div>
    )
}

export default Review