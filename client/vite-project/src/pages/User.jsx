// 1 Citation for the following function:
// 2 Date: 12/18/2022
// 3 Based on Pedro Tech video on implementing a CRUD application with React and Node.js
// 4 Source URL: https://www.youtube.com/watch?v=re3OIOr9dJI
// 5

import { useEffect, useState } from "react"
import Axios from "axios"
import { Route, Routes } from "react-router-dom"


// define the User function
function User() {

    // define the useState function to set the state of the variables
    const [UserID, setUserID] = useState(" ");
    const [firstName, setfirstName] = useState(" ");
    const [lastName, setlastName] = useState(" ");
    const [Email, setEmail] = useState(" ");
    const [PhoneNumber, setPhoneNumber] = useState(" ");
    const [Budget, setBudget] = useState(" ");
    const [PasswordHash, setPasswordHash] = useState(" ");
    const [UserList, setUserList] = useState([]);

    // define the useState function to set the state of the variables
    const [SelectedUserID, setSelectedUserID] = useState(" ");
    const [NewFirstUserName, setNewFirstUserName] = useState(" ");
    const [NewLastUserName, setNewLastUserName] = useState(" ");
    const [NewUserEmail, setNewUserEmail] = useState(" ");
    const [NewUserPhone, setNewUserPhone] = useState(" ");
    const [NewUserBudget, setNewUserBudget] = useState(" ");
    const [NewUserPassword, setNewUserPassword] = useState(" ");

    // define the fetchUsers function to fetch the users from the database
    const fetchUsers = async () => {
        const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/users/get')
        const data = response.data;
        setUserList(data);
    }

    // define the useEffect function to fetch the users from the database
    useEffect(() => {
        const getUsers = async () => {
            const response = await Axios.get('http://flip1.engr.oregonstate.edu:9125/api/users/get')
            const data = response.data;

            setUserList(data);
        }
        getUsers();

    }, []);

    // define the createUser function to create a new user

    const createUser = async () => {

        try {
            const response = await Axios.post('http://flip1.engr.oregonstate.edu:9125/api/users/insert', {
                UserID: UserID,
                firstName: firstName,
                lastName: lastName,
                Email: Email,
                PhoneNumber: PhoneNumber,
                Budget: Budget,
                PasswordHash: PasswordHash
            });
            if (response.status === 201) {
                await fetchUsers();
            } else {
                console.log(response);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    // define the deleteUser function to delete a user

    const deleteUser = async (id) => {

        try{
            const response = await Axios.delete(`http://flip1.engr.oregonstate.edu:9125/api/users/delete/${id}`);
            console.log(response);
            await fetchUsers();
        }catch (error){
            console.error(error);
        }   
    }

    // define the updateUser function to update a user

    const updateUser = async (id) => {
        try{
            const response = await Axios.put(`http://flip1.engr.oregonstate.edu:9125/api/users/update`, {
                UserID: id,
                firstName: NewFirstUserName,
                lastName: NewLastUserName,
                Email: NewUserEmail,
                PhoneNumber: NewUserPhone,
                Budget: NewUserBudget,
                PasswordHash: NewUserPassword
            });
            console.log(response);
            const user = response.data;
            console.log(user);
            setUserList(user);

        }catch (error){
            console.error(error);
        }
    }

    // return the following html code
           
    return (
        <div className="App">
            <h1>Users</h1>
            <div className="table-container">
                {/* if the UserList is empty, display the message */}
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Budget</th>
                            <th>Password Hash</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {UserList.map((val) => (
                            <tr key={val.UserID}>
                                <td>{val.UserID}</td>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.Email}</td>
                                <td>{val.PhoneNumber}</td>
                                <td>{val.Budget}</td>
                                <td>{val.PasswordHash}</td>
                                <td>
                                    <button onClick={() => deleteUser(val.UserID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* create a form to create a new user */}

                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Create User</h2>
                    <label>User ID:</label>
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
                    <label>Budget:</label>
                    <input type="text" placeholder="Input New budget value: 90000" onChange={(e) => {
                        setBudget(e.target.value)
                    }} />
                    <label>Password Hash:</label>
                    <input type="text" placeholder="Input password hash" onChange={(e) => {
                        setPasswordHash(e.target.value)
                    }} />
                    <button onClick={createUser}>Create User</button>
                </form>

                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Update User</h2>
                    <label>Select User ID to update: </label>
                    <select className="dropdown" onChange={(e) => setSelectedUserID(e.target.value)} value={SelectedUserID}>
                        <option value="">Select User ID</option>
                        {UserList.map((user) => (
                            <option key={user.UserID} value={user.UserID}>{user.UserID}</option>
                        ))}
                    </select>

                    {/* if the SelectedUserID is not empty, display the form to update the user */}

                    <label>First Name:</label>
                    <input type="text" placeholder="First name" onChange={(e) => {setNewFirstUserName(e.target.value)}} />
                    <label>Last Name:</label>
                    <input type="text" placeholder="Last name" onChange={(e) => {setNewLastUserName(e.target.value)}} />
                    <label>Email:</label>
                    <input type="text" placeholder="Ex: hello@gmail.com" onChange={(e) => {setNewUserEmail(e.target.value)}} />
                    <label>Phone Number:</label>
                    <input type="text" placeholder="Ex: (xxx)-xxx-xxxx" onChange={(e) => {setNewUserPhone(e.target.value)}} />
                    <label>Budget:</label>
                    <input type="text" placeholder="Ex: 90000" onChange={(e) => {setNewUserBudget(e.target.value)}} />
                    <label>Password Hash:</label>
                    <input type="text" placeholder="Ex: 123456" onChange={(e) => {setNewUserPassword(e.target.value)}} />
                    <button type="submit" onClick={() => updateUser(SelectedUserID)} >Update User</button>
                </form>

            </div>
    )
} export default User