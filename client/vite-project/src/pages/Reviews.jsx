import { useEffect, useState } from "react"
import Axios from "axios"
import { Route, Routes } from "react-router-dom"




function Review() {


    const [ReviewID, setReviewID] = useState("");
    const [Rating, setRating] = useState("");
    const [Comment, setComment] = useState("");
    const [ReviewDate, setReviewDate] = useState("");
    const [Agent_AgentID, setAgent_AgentID] = useState("");
    const [properties_ProperyID, setProperties_ProperyID] = useState("");
    const [properties_Review_ReviewID, setProperties_Review_ReviewID] = useState("");
    const [Users_UserID, setUser_UserID] = useState("");
    const [ReviewList, setReviewList] = useState([]);

    const fetchReviews = async () => {
        const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/review/get')
        const data = response.data;
        setReviewList(data);
    
    }

    useEffect(() => {

        const getReviews = async () => {
            const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/review/get')
            const data = response.data;
            
            setReviewList(data);
            console.log(data);
        }
        getReviews();
    
    }, []);

    const CreateReview = async () => {
            
        try {
            const response =  await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/review/insert', {
                ReviewID: ReviewID,
                Rating: Rating,
                Comment: Comment,
                ReviewDate: ReviewDate,
                Agent_AgentID: Agent_AgentID,
                properties_ProperyID: properties_ProperyID,
                properties_Review_ReviewID: properties_Review_ReviewID,
            });
            if (response.status === 201) {
                await fetchReviews();
            } else {
                console.log(response);
            }
        } 
        catch (error) {
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
                        <th>Agent_AgentID</th>
                        <th>properties_ProperyID</th>
                        <th>properties_Review_ReviewID</th>
                        <th>User_UserID</th>
                    </tr>
                </thead>
                <tbody>

                  {ReviewList.map((val) => (
                    <tr key={val.ReviewID}>
                        <td>{val.ReviewID}</td>
                        <td>{val.Rating}</td>
                        <td>{val.Comment}</td>
                        <td>{val.ReviewDate}</td>
                        <td>{val.Agent_AgentID}</td>
                        <td>{val.properties_ProperyID}</td>
                        <td>{val.properties_Review_ReviewID}</td>
                        <td>{val.Users_UserID}</td> 
                    </tr>
                  ))}
                </tbody>
                </table> 
            </div>
            <div className="form">
                <label>Create rating</label>
                <input type="text" onChange={(e) => {
                    setRating(e.target.value);
                }} />
                <label>Create Comment</label>
                <input type="text" onChange={(e) => {
                    setComment(e.target.value);
                }} />
                <label>Create ReviewDate</label>
                <input type="text" onChange={(e) => {
                    setReviewDate(e.target.value);
                }} />
            
                <button onClick={CreateReview}>Create Review</button>
            </div>
        </div>
    )
}

export default Review