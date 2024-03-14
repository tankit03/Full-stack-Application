import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'


function Properties() {
  
    const [propertyList, setPropertyList] = useState([]);
    const [AgentList, setAgentList] = useState([]);
    const [ReviewList, setReviewList] = useState([]);

    const [newPropertyId, setNewPropertyId] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [newZipcode, setNewZipcode] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPropertyType, setNewPropertyType] = useState("");
    const [newBedroom, setNewBedroom] = useState(""); 
    const [newBathroom, setNewBathroom] = useState("");
    const [newSquareFeet, setNewSquareFeet] = useState("");
    const [newYearBuilt, setNewYearBuilt] = useState("");
    const [newRenovationDetails, setNewRenovationDetails] = useState("");
    const [newUniqueFeatures, setNewUniqueFeatures] = useState("");
    const [newListingDate, setNewListingDate] = useState("");
    const [newAgentID, setNewAgentID] = useState("");
    const [newReview_ReviewID, setNewReview_ReviewID] = useState("");

    const url = {
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get',
        agents: 'http://flip1.engr.oregonstate.edu:9125/api/agents/get',
        reviews: 'http://flip1.engr.oregonstate.edu:9125/api/review/get'
    };
    

    const fetchProperties = async (url) => {
      try{
        const response = await Axios.get(url)
        return response.data;
      } catch (error){
        console.error(`Failed to fetch from ${url}:`, error);
        return [];
      }
    };

    const fetchAllData = async () => {
      try {
        const [propertiesData, agentsData, reviewsData] = await Promise.all([
          fetchProperties(url.properties),
          fetchProperties(url.agents),
          fetchProperties(url.reviews)
        ]);

        setPropertyList(propertiesData);
        setAgentList(agentsData);
        setReviewList(reviewsData);
        console.log("propertiesData: ", propertiesData);
      } catch (error) {
        console.error('Failed to fetch all data:', error);
      }
    };

    useEffect(() => {
      fetchAllData();
    }, []);


  

    // const fetchProperties = async () => {
    //     const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/properties/get')
    //     const data = response.data;
    //     setPropertyList(data);

    // }

    // useEffect(() => {
    //     const getProperties = async () => {
    //         const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/properties/get')
    //         const data = response.data;

    //         setPropertyList(data);

    //     }
    //     getProperties();

    // }, []);

    const createProperty = async () => {
      console.log("back-end data: ",newPropertyId, newTitle, newCity, newState, newZipcode, newPrice, newDescription, newPropertyType, newBedroom, newBathroom, newSquareFeet, newYearBuilt, newRenovationDetails, newUniqueFeatures, newListingDate, newAgentID, newReview_ReviewID);
      try {
          const response = await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/properties/insert', {
              PropertyID: newPropertyId,
              Title: newTitle,
              City: newCity,
              State: newState,
              Zipcode: newZipcode,
              Price: newPrice,
              Description: newDescription,
              PropertyType: newPropertyType,
              Bedroom: newBedroom,
              Bathroom: newBathroom,
              SquareFeet: newSquareFeet,
              YearBuilt: newYearBuilt,
              RenovationDetails: newRenovationDetails,
              UniqueFeature: newUniqueFeatures,
              ListingDate: newListingDate,
              AgentID: newAgentID,
              Review_ReviewID: newReview_ReviewID
          });

          if (response.status === 201) {
            await fetchAllData(); // Fetch all data again to refresh the list
          }
          } catch (error) {
              console.error(error);
          }
      };


        
    return (
        <div className="App">
            <h1>Properties</h1>

            <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Property ID</th>
                <th>Title</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Price</th>
                <th>Description</th>
                <th>PropertyType</th>
                <th>Bedroom</th>
                <th>Bathroom</th>
                <th>SquareFeet</th>
                <th>YearBuilt</th>
                <th>RenovationDetails</th>
                <th>UniqueFeatures</th>
                <th>ListingDate</th>
                <th>AgentID</th>
                <th>Review_ReviewID</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {propertyList.map((val) => (
                <tr key={val.PropertyID}>
                  <td>{val.PropertyID}</td>
                  <td>{val.Title}</td>
                  <td>{val.City}</td>
                  <td>{val.State}</td>
                  <td>{val.Zipcode}</td>
                  <td>{val.Price}</td>
                  <td>{val.Description}</td>
                  <td>{val.PropertyType}</td>
                  <td>{val.Bedroom}</td>
                  <td>{val.Bathroom}</td>
                  <td>{val.SquareFeet}</td>
                  <td>{val.YearBuilt}</td>
                  <td>{val.RenovationDetails}</td>
                  <td>{val.UniqueFeature}</td>
                  <td>{val.ListingDate}</td>
                  <td>{val.AgentID}</td>
                  <td>{val.Review_ReviewID}</td>

                  <td>
                    <button onClick={() => {deleteProperty(val.ProperyID)}}>Delete</button>      
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form">
          <label>Title:</label>
          <input type="text" onChange={(e) => {
            setTitle(e.target.value)
          }} />
          <label>City:</label>
          <input type="text" onChange={(e) => {
            setCity(e.target.value)
          }} />
          <label>State:</label>
          <input type="text" onChange={(e) => {
            setState(e.target.value)
          }
          } />
          <label>Zipcode:</label>
          <input type="text" onChange={(e) => {
            setZipcode(e.target.value)
          }
          } />
          <label>Price:</label>
          <input type="text" onChange={(e) => {
            setPrice(e.target.value)
          }
          } />
          <label>Description:</label>
          <input type="text" onChange={(e) => {
            setDescription(e.target.value)
          }
          } />
          <label>PropertyType:</label>
          <input type="text" onChange={(e) => {
            setPropertyType(e.target.value)
          }
          } />
          <label>Bedroom:</label>
          <input type="text" onChange={(e) => {
            setBedroom(e.target.value)
          }
          } />
          <label>Bathroom:</label>
          <input type="text" onChange={(e) => {
            setBathroom(e.target.value)
          }
          } />
          <label>SquareFeet:</label>
          <input type="text" onChange={(e) => {
            setSquareFeet(e.target.value)
          }
          } />
          <label>YearBuilt:</label>
          <input type="text" onChange={(e) => {
            setYearBuilt(e.target.value)
          }
          } />
          <label>RenovationDetails:</label>
          <input type="text" onChange={(e) => {
            setRenovationDetails(e.target.value)
          }
          } />
          <label>UniqueFeatures:</label>
          <input type="text" onChange={(e) => {
            setUniqueFeatures(e.target.value)
          }
          } />
          <label>ListingDate:</label>
          <input type="text" onChange={(e) => {
            setListingDate(e.target.value)
          }
          } />
          <button onClick={createProperty}>Submit</button>
        </div>
      </div>
    )
  }

export default Properties