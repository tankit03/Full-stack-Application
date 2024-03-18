// 1 Citation for the following function:
// 2 Date: 12/18/2022
// 3 Based on Pedro Tech video on implementing a CRUD application with React and Node.js
// 4 Source URL: https://www.youtube.com/watch?v=re3OIOr9dJI
// 5

// Import the useEffect and useState hooks from the react library

import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'

// Define the Properties function

function Properties() {

    // Define the useState function to set the state of the variables
  
    const [propertyList, setPropertyList] = useState([]);
    const [AgentList, setAgentList] = useState([]);
    const [ReviewList, setReviewList] = useState([]);

    // New viewing state hooks
    const [SelectedPropertyID, setSelectedPropertyID] = useState("");
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

    // Fetch all data from the server

    const url = {
        properties: 'http://flip1.engr.oregonstate.edu:9125/api/properties/get',
        agents: 'http://flip1.engr.oregonstate.edu:9125/api/agents/get',
        reviews: 'http://flip1.engr.oregonstate.edu:9125/api/review/get'
    };
    
    // Fetch data from the server

    const fetchProperties = async (url) => {
      try{
        const response = await Axios.get(url)
        return response.data;
      } catch (error){
        console.error(`Failed to fetch from ${url}:`, error);
        return [];
      }
    };

    // Fetch all data from the server

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
      } catch (error) {
        console.error('Failed to fetch all data:', error);
      }
    };

    useEffect(() => {
      fetchAllData();
    }, []);

    // Create, delete, and update viewing functions

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

      // Create, delete, and update viewing functions

      const deleteProperty = async (id) => {
        try {
          await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/properties/delete/${id}`);
          await fetchAllData(); // Fetch all data again to refresh the list
          
        } catch (error) {
          console.error(error);
        }
      };

      // Create, delete, and update viewing functions

      const updateProperty = async (id) => {
        try {
          await Axios.put(`http://flip1.engr.oregonstate.edu:9125/api/properties/update`,{
          properties: id,
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
        });
          await fetchAllData(); // Fetch all data again to refresh the list
        } catch (error) {
          console.error(error);
        }
      };
        
    return (
        <div className="App">
            <h1>Properties</h1>

            <div className="properties-table">
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
                <th>Property Type</th>
                <th>Bedroom</th>
                <th>Bathroom</th>
                <th>SquareFeet</th>
                <th>Year Built</th>
                <th>Renovation Details</th>
                <th>Unique Features</th>
                <th>Listing Date</th>
                <th>Agent ID</th>
                <th>Review ID</th>
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
                    <button onClick={() => {deleteProperty(val.PropertyID)}}>Delete</button>     
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Create a form to create a new property */}
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h2>Create Property</h2>
          <label>Title:</label>
          <input type="text" placeholder="Title" onChange={(e) => {
            setNewTitle(e.target.value)
          }} />
          <label>City:</label>
          <input type="text" placeholder="City" onChange={(e) => {
            setNewCity(e.target.value)
          }} />
          <label>State:</label>
          <input type="text" placeholder="State, Ex: NY, OR" onChange={(e) => {
            setNewState(e.target.value)
          }
          } />
          <label>Zipcode:</label>
          <input type="text" placeholder="Zipcode, Ex: 97229" onChange={(e) => {
            setNewZipcode(e.target.value)
          }
          } />
          <label>Price:</label>
          <input type="text" placeholder="Price, Ex: 120,000" onChange={(e) => {
            setNewPrice(e.target.value)
          }
          } />
          <label>Description:</label>
          <input type="text" placeholder="Description of property" onChange={(e) => {
            setNewDescription(e.target.value)
          }
          } />
          <label>PropertyType:</label>
          <input type="text" placeholder="Property Type, Ex: Apartment or Villa" onChange={(e) => {
            setNewPropertyType(e.target.value)
          }
          } />
          <label>Bedroom:</label>
          <input type="text" placeholder="Bedrooms in the property" onChange={(e) => {
            setNewBedroom(e.target.value)
          }
          } />
          <label>Bathroom:</label>
          <input type="text" placeholder="Bathrooms in the property" onChange={(e) => {
            setNewBathroom(e.target.value)
          }
          } />
          <label>SquareFeet:</label>
          <input type="text" placeholder="SquareFeet of the property" onChange={(e) => {
            setNewSquareFeet(e.target.value)
          }
          } />
          <label>YearBuilt:</label>
          <input type="text" placeholder="Year built, Ex: 2012" onChange={(e) => {
            setNewYearBuilt(e.target.value)
          }
          } />
          <label>RenovationDetails:</label>
          <input type="text" placeholder="Renovation details, Ex: New Roof (2016) " onChange={(e) => {
            setNewRenovationDetails(e.target.value)
          }
          } />
          <label>UniqueFeatures:</label>
          <input type="text" placeholder="Unique feature of the property, Ex: Secert Roof" onChange={(e) => {
            setNewUniqueFeatures(e.target.value)
          }
          } />
          <label>ListingDate:</label>
          <input type="text" placeholder="The Listing date, 2024-02-15T08:00:00.000Z " onChange={(e) => {
            setNewListingDate(e.target.value)
          }
          } />
          <select className="dropdown" onChange={(e) => setNewAgentID(e.target.value)}>
            <option value="">Select Agent</option>
            {AgentList.map((agent) => (
              <option key={agent.AgentID} value={agent.AgentID}>
                {agent.firstName} {agent.lastName}
              </option>
            ))}
          </select>

          <select className="dropdown" onChange={(e) => setNewReview_ReviewID(e.target.value)}>
            <option value="">Select Review ID</option>
            {ReviewList.map((review) => (
              <option key={review.ReviewID} value={review.ReviewID}>
                {review.ReviewID}
              </option>
            ))}
          </select>
          <button onClick={createProperty}>Submit</button>
        </form>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* Update Form */}
          <h2>Update Property</h2>
          <label>Select Property ID to update: </label>
          <select className="dropdown" onChange={(e) => setSelectedPropertyID(e.target.value)} value={SelectedPropertyID}>
            <option value="">Select Property ID</option>
            {propertyList.map((property) => (
              <option key={property.PropertyID} value={property.PropertyID}>{property.PropertyID}</option>
            ))}
          </select>
          <label>Title:</label>
          <input type="text" placeholder="Title" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
          <label>City:</label>
          <input type="text" placeholder="City" onChange={(e) => setNewCity(e.target.value)} value={newCity} />
          <label>State:</label>
          <input type="text" placeholder="State, Ex: NY, OR" onChange={(e) => setNewState(e.target.value)} value={newState} />
          <label>Zipcode:</label>
          <input type="text" placeholder="Zipcode, Ex: 97229" onChange={(e) => setNewZipcode(e.target.value)} value={newZipcode} />
          <label>Price:</label>
          <input type="text" placeholder="Price, Ex: 120,000" onChange={(e) => setNewPrice(e.target.value)} value={newPrice} />
          <label>Description:</label>
          <input type="text" placeholder="Description of property" onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />
          <label>Property Type:</label>
          <input type="text" placeholder="Property Type, Ex: Apartment or Villa" onChange={(e) => setNewPropertyType(e.target.value)} value={newPropertyType} />
          <label>Bedroom:</label>
          <input type="text" placeholder="Bedrooms in the property" onChange={(e) => setNewBedroom(e.target.value)} value={newBedroom} />
          <label>Bathroom:</label>
          <input type="text" placeholder="Bathrooms in the property" onChange={(e) => setNewBathroom(e.target.value)} value={newBathroom} />
          <label>Square Feet:</label>
          <input type="text" placeholder="SquareFeet of the property" onChange={(e) => setNewSquareFeet(e.target.value)} value={newSquareFeet} />
          <label>Year Built:</label>
          <input type="text" placeholder="Year built, Ex: 2012" onChange={(e) => setNewYearBuilt(e.target.value)} value={newYearBuilt} />
          <label>Renovation Details:</label>
          <input type="text" placeholder="Renovation details, Ex: New Roof (2016) " onChange={(e) => setNewRenovationDetails(e.target.value)} value={newRenovationDetails} />
          <label>Unique Features:</label>
          <input type="text" placeholder="Unique feature of the property, Ex: Secert Roof" onChange={(e) => setNewUniqueFeatures(e.target.value)} value={newUniqueFeatures} />
          <label>Listing Date:</label>
          <input type="text" placeholder="The Listing date, 2024-02-15T08:00:00.000Z " onChange={(e) => setNewListingDate(e.target.value)} value={newListingDate} />
          <button type="submit" onClick={() => updateProperty(SelectedPropertyID)} >Update Property</button>
        </form>
      </div>
    )
  }

export default Properties