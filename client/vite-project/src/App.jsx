import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios'


function App() {

  const [AgentID, setAgentID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [AgencyName, setAgencyName] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [agentList, setAgentList] = useState([]);


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
    }).then(() => {
      alert('successful insert');
    });    

  }

  

  const [count, setCount] = useState(0)



  return (
    <>
      <div className="App">
        <h1>Database application</h1>

       {agentList.map((val) => {

        return (
          <div className="agent">
            <p>Agent ID: {val.AgentID}</p>
            <p>First Name: {val.firstName}</p>
            <p>Last Name: {val.lastName}</p>
            <p>Email: {val.Email}</p>
            <p>Phone Number: {val.PhoneNumber}</p>
            <p>Agency Name: {val.AgencyName}</p>
            <p>License Number: {val.LicenseNumber}</p>
          </div>
        )
       })} 


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
