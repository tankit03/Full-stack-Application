import { useEffect, useState } from 'react'
import Axios from 'axios'
import {Route, Routes} from 'react-router-dom'

function App() {

  const [AgentID, setAgentID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [AgencyName, setAgencyName] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [agentList, setAgentList] = useState([]);

  const [NewFirstAgentName, setNewFirstAgentName] = useState("");
  const [NewLastAgentName, setNewLastAgentName] = useState("");
  const [NewAgentEmail, setNewAgentEmail] = useState("");
  const [NewAgentPhone, setNewAgentPhone] = useState("");
  const [NewAgentAgency, setNewAgentAgency] = useState("");
  const [NewAgentLicense, setNewAgentLicense] = useState("");
  const [NewAgentList, setNewAgentList] = useState("");

  useEffect(() => {

    Axios.get('http://localhost:9124/api/get').then((response) => {
      setAgentList(response.data);
    });
  }, []);

  const submitAgent = () => {

    Axios.post('http://localhost:9124/api/insert',{
      AgentID: AgentID,
      firstName: firstName,
      lastName: lastName,
      Email: Email,
      PhoneNumber: PhoneNumber,
      AgencyName: AgencyName,
      LicenseNumber: LicenseNumber
    });
    
    setAgentList([
      ...agentList,
      {
        AgentID: AgentID,
        firstName: firstName,
        lastName: lastName,
        Email: Email,
        PhoneNumber: PhoneNumber,
        AgencyName: AgencyName,
        LicenseNumber: LicenseNumber
      },]);
  };


  const deleteAgent = (id) => {
    Axios.delete(`http://localhost:9124/api/delete/${id}`);
  }

  const updateAgent = (id) => {
    Axios.put('http://localhost:9124/api/update', {
      AgentID: id,
      firstName: NewFirstAgentName,
      lastName: NewLastAgentName,
      Email: NewAgentEmail,
      PhoneNumber: NewAgentPhone,
      AgencyName: NewAgentAgency,
      LicenseNumber: NewAgentLicense
    });
    setNewAgentList("");
  }

    const [count, setCount] = useState(0)

  return (

    

    <>
    
      <div className="App">

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Agency Name</th>
              <th>License Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {agentList.map((val) => (
              <tr key={val.AgentID}>
                <td>{val.AgentID}</td>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.Email}</td>
                <td>{val.PhoneNumber}</td>
                <td>{val.AgencyName}</td>
                <td>{val.LicenseNumber}</td>
                
                <td>
                  <button onClick={() => deleteAgent(val.AgentID)}>Delete</button>
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewFirstAgentName(e.target.value)
                  }
                  } />
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewLastAgentName(e.target.value)
                  }
                  } />
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewAgentEmail(e.target.value)
                  }
                  } />
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewAgentPhone(e.target.value)
                  }
                  } />
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewAgentAgency(e.target.value)
                  }
                  } />
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewAgentLicense(e.target.value)
                  }
                  } />
                  <button onClick={() => updateAgent(val.AgentID)}>Update</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="form">
          <label>First Name:</label>
          <input type="text" onChange={(e) => {
            setfirstName(e.target.value)
          }} />
          <label>Last Name:</label>
          <input type="text" onChange={(e) => {
            setlastName(e.target.value)
          }} />
          <label>Email:</label>
          <input type="text" onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <label>Phone Number:</label>
          <input type="text" onChange={(e) => {
            setPhoneNumber(e.target.value)
          }} />
          <label>Agency Name:</label>
          <input type="text" onChange={(e) => {
            setAgencyName(e.target.value)
          }} />
          <label>License Number:</label>
          <input type="text" onChange={(e) => {
            setLicenseNumber(e.target.value)
          }} />
          <button onClick={submitAgent}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App
