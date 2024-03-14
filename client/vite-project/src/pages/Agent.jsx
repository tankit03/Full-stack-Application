import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import AgentPopup from './popups/AgentPopup'

function App() {

  const [btntrigger, setTrigger] = useState(false);
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



  const fetchAgents = async () => {
    const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/agents/get')
    const data = response.data;
    setAgentList(data);

  }

  useEffect(() => {
    const getAgents = async () => {
      const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/agents/get')
      const data = response.data;
      console.log(data);

      setAgentList(data);

    }
    getAgents();

  }, []);

  const createAgent = async () => {

    try {
      const response = await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/insert', {
        AgentID: AgentID,
        firstName: firstName,
        lastName: lastName,
        Email: Email,
        PhoneNumber: PhoneNumber,
        AgencyName: AgencyName,
        LicenseNumber: LicenseNumber
      });
      if (response.status === 201) {
        await fetchAgents();
      } else {
        console.log(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const deleteAgent = async (id) => {

    try {

      const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/delete/${id}`);
      console.log(response);
      await fetchAgents();
    } catch (error) {
      console.error(error);


    }
  }

  const updateAgent = async (id) => {

    try {

      const response = await Axios.put('http://flip1.engr.oregonstate.edu:9125/api/update', {
        AgentID: id,
        firstName: NewFirstAgentName,
        lastName: NewLastAgentName,
        Email: NewAgentEmail,
        PhoneNumber: NewAgentPhone,
        AgencyName: NewAgentAgency,
        LicenseNumber: NewAgentLicense
      });
      console.log(response);
      const agents = response.data;
      console.log(agents);
      setAgentList(agents);

    }

    catch (error) {
      console.error(error);
    }
  }

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
          <button onClick={createAgent}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App
