import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'


function Properties() {


    const [ProperyID, setProperyID] = useState(" ")
    const [Title, setTitle] = useState(" ")
    const [City, setCity] = useState(" ")
    const [State, setState] = useState(" ")
    const [Zipcode, setZipcode] = useState(" ")
    const [Price, setPrice] = useState(" ")
    const [Description, setDescription] = useState(" ")
    const [PropertyType, setPropertyType] = useState(" ")
    const [Bedroom, setBedroom] = useState(" ")
    const [Bathroom, setBathroom] = useState(" ")
    const [SquareFeet, setSquareFeet] = useState(" ")
    const [YearBuilt, setYearBuilt] = useState(" ")
    const [RenovationDetails, setRenovationDetails] = useState(" ")
    const [UniqueFeatures, setUniqueFeatures] = useState(" ")
    const [ListingDate, setListingDate] = useState(" ")
    const [AgentID, setAgentID] = useState(" ")
    const[Review_ReviewID, setReview_ReviewID] = useState(" ")
    const [propertyList, setPropertyList] = useState([]);

    const [NewTitle, setNewTitle] = useState(" ")
    const [NewCity, setNewCity] = useState(" ")
    const [NewState, setNewState] = useState(" ")
    const [NewZipcode, setNewZipcode] = useState(" ")
    const [NewPrice, setNewPrice] = useState(" ")
    const [NewDescription, setNewDescription] = useState(" ")
    const [NewPropertyType, setNewPropertyType] = useState(" ")
    const [NewBedroom, setNewBedroom] = useState(" ")
    const [NewBathroom, setNewBathroom] = useState(" ")
    const [NewSquareFeet, setNewSquareFeet] = useState(" ")
    const [NewYearBuilt, setNewYearBuilt] = useState(" ")
    const [NewRenovationDetails, setNewRenovationDetails] = useState(" ")
    const [NewUniqueFeatures, setNewUniqueFeatures] = useState(" ")
    const [NewListingDate, setNewListingDate] = useState(" ")
    

    const fetchProperties = async () => {
        const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/properties/get')
        const data = response.data;
        setPropertyList(data);

    }

    useEffect(() => {
        const getProperties = async () => {
            const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/properties/get')
            const data = response.data;

            setPropertyList(data);

        }
        getProperties();

    }, []);

    const createProperty = () => {

      Axios.post('http://flip1.engr.oregonstate.edu:9125/api/properties/insert', {
        ProperyID: ProperyID,
        Title: Title,
        City: City,
        State: State,
        Zipcode: Zipcode,
        Price: Price,
        Description: Description,
        PropertyType: PropertyType,
        Bedroom: Bedroom,
        Bathroom: Bathroom,
        SquareFeet: SquareFeet,
        YearBuilt: YearBuilt,
        RenovationDetails: RenovationDetails,
        UniqueFeatures: UniqueFeatures,
        ListingDate: ListingDate,
        AgentID: AgentID,
        Review_ReviewID: Review_ReviewID
      });
      setPropertyList([
        ...propertyList,
        {
          ProperyID: ProperyID,
          Title: Title,
          City: City,
          State: State,
          Zipcode: Zipcode,
          Price: Price,
          Description: Description,
          PropertyType: PropertyType,
          Bedroom: Bedroom,
          Bathroom: Bathroom,
          SquareFeet: SquareFeet,
          YearBuilt: YearBuilt,
          RenovationDetails: RenovationDetails,
          UniqueFeatures: UniqueFeatures,
          ListingDate: ListingDate,
          AgentID: AgentID,
          Review_ReviewID: Review_ReviewID


        },]);
    };

    const deleteProperty = async (id) => {
        
          try {
  
              const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/properties/delete/${id}`);
              console.log(response);
              await fetchProperties();
          } catch (error) {
              console.error(error);

          }
    }

        
    return (
        <div className="App">
            <h1>Properties</h1>

            <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ProperyID</th>
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
                <tr key={val.ProperyID}>
                  <td>{val.ProperyID}</td>
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