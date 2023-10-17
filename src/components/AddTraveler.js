import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import TravelerNavBar from './TravelerNavBar';
import './Train.css';
import axios from 'axios';


function AddTraveler() {

  const clearData = () => {
    window.location.reload(false);
};

  // State to manage traveler data with default values
  const [userName, setuserName]= useState("");
  const [password, setpassword]= useState("");
  const [nic, setnic]= useState("");
  const [isActive, setisActive]= useState(true);

  // State to manage success alert display
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle changes in form fields
  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   // Handle checkbox input
  //   if (type === 'checkbox') {
  //     setTravelData((prevState) => ({
  //       ...prevState,
  //       [name]: checked,
  //     }));
  //   } else {
  //   setTravelData((prevState) => ({
  //     ...prevState,
  //     [name]: name === 'firstClassCapacity' || name === 'secondClassCapacity' || name === 'thirdClassCapacity' ? parseInt(value, 10) : value,
  //   }));
  // }
  // };
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add new traveler from the api endpoint
      const response = await axios.post('http://localhost:5212/api/Registration/users', {
        userName: userName,
        password: password,
        nic: nic,
        isActivated: true,

      });

    console.log('Traveler response:', response.data);
    } catch (error) {
      console.error('Error adding traveler:', error);
    }
  };

  return (
    <>
    <TravelerNavBar/>
    <div className="containersss">
      <h2 style={{ textAlign: 'center' }}>Add New Traveler</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="nic">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={nic}
           onChange={(e) => setnic(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-check mb-3">
          <label htmlFor="isActive">Active</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={isActive}
             onChange={(e) => setisActive(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary mt-3">
            Add Travler
          </button>
          <buttons type="clear" className="btn btn-primary mt-3" onClick={clearData}>Clear</buttons>
        </div>
      </form>
            {/* React Sweet Alert for success */}
            {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Traveler added successfully!
        </SweetAlert>
      )}
    </div>
    </>
  );
}

export default AddTraveler;
