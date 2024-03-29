// 1 Citation for the following function:
// 2 Date: 12/18/2022
// 3 Based on Pedro Tech video on implementing a CRUD application with React and Node.js
// 4 Source URL: https://www.youtube.com/watch?v=re3OIOr9dJI
// 5

import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom'



function App() {



  // State hooks with proper camelCase naming

  const [btntrigger, setTrigger] = useState(false);
  const [AgentID, setAgentID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [AgencyName, setAgencyName] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [agentList, setAgentList] = useState([]);

  // New viewing state hooks

  const [SelectedAgentID, setSelectedAgentID] = useState("");
  const [NewFirstAgentName, setNewFirstAgentName] = useState("");
  const [NewLastAgentName, setNewLastAgentName] = useState("");
  const [NewAgentEmail, setNewAgentEmail] = useState("");
  const [NewAgentPhone, setNewAgentPhone] = useState("");
  const [NewAgentAgency, setNewAgentAgency] = useState("");
  const [NewAgentLicense, setNewAgentLicense] = useState("");


  // Fetch all data from the server

  const fetchAgents = async () => {
    const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/agents/get')
    const data = response.data;
    setAgentList(data);

  }

  // Fetch data from the server

  useEffect(() => {
    const getAgents = async () => {
      const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/agents/get')
      const data = response.data;
      console.log(data);

      setAgentList(data);

    }
    getAgents();

  }, []);

  // Fetch all data from the server

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

  // Fetch all data from the server

  const deleteAgent = async (id) => {

    try {

      const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/delete/${id}`);
      console.log(response);
      await fetchAgents();
    } catch (error) {
      console.error(error);


    }
  }

  // Fetch all data from the server

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
      <h1>Agent</h1>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* Create Agent Form */}
          <h2>Create Agent</h2>
          <label>First Name:</label>
          <input type="text" placeholder="First name" onChange={(e) => {
            setfirstName(e.target.value)
          }} />
          <label>Last Name:</label>
          <input type="text" placeholder="Last name" onChange={(e) => {
            setlastName(e.target.value)
          }} />
          <label>Email:</label>
          <input type="text" placeholder="Type email: Ex hello@gamil.com" onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <label>Phone Number:</label>
          <input type="text" placeholder="Type Phone Number: (xxx)-xxx-xxxx" onChange={(e) => {
            setPhoneNumber(e.target.value)
          }} />
          <label>Agency Name:</label>
          <input type="text" placeholder="Add your Agency Name" onChange={(e) => {
            setAgencyName(e.target.value)
          }} />
          <label>License Number:</label>
          <input type="text" placeholder="Add your License number" onChange={(e) => {
            setLicenseNumber(e.target.value)
          }} />
          <button onClick={createAgent}>Submit</button>
        </form>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h2>Update Agent</h2>
            <label>Select Agent ID to update: </label>
            <select className="dropdown" onChange={(e) => setSelectedAgentID(e.target.value)} value={SelectedAgentID}>
              <option value="">Select Agent ID</option>
              {agentList.map((agent) => (
                <option key={agent.AgentID} value={agent.AgentID}>{agent.AgentID}</option>
              ))}
            </select>
            <label>First Name:</label>
            <input type="text" placeholder="First name" onChange={(e) => setNewFirstAgentName(e.target.value)} />
            <label>Last Name:</label>
            <input type="text" placeholder="Last name" onChange={(e) => setNewLastAgentName(e.target.value)} />
            <label>Email:</label>
            <input type="text" placeholder="Type email: Ex: hello@gmail.com" onChange={(e) => setNewAgentEmail(e.target.value)} />
            <label>Phone Number:</label>
            <input type="text" placeholder="Type Phone Number: (xxx)-xxx-xxxx" onChange={(e) => setNewAgentPhone(e.target.value)} />
            <label>Agency Name:</label>
            <input type="text" placeholder="Add your Agency Name" onChange={(e) => setNewAgentAgency(e.target.value)} />
            <label>License Number:</label>
            <input type="text" placeholder="Add your License number" onChange={(e) => setNewAgentLicense(e.target.value)} />
            <button type="submit" onClick={() => updateAgent(SelectedAgentID)} >Update Agent</button>
          </form>
      </div>
    </>
  )
}

export default App
