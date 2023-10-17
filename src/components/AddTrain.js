import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import TrainNavBar from './TrainNavBar';
import './Train.css';
import axios from 'axios';


function AddTrain() {

  const clearData = () => {
    window.location.reload(false);
};

  // State to manage train data with default values
   const [trainNo, settrainNo]= useState("");
   const [trainName, settrainName]= useState(""); 
   const [firstClassCapacity, setfirstClassCapacity]= useState(0); 
   const [secondClassCapacity, setsecondClassCapacity]= useState(0); 
   const [thirdClassCapacity, setthirdClassCapacity]= useState(0);
   const [type, settype]= useState("");
   const [isPublished, setisPublished]= useState(true);  
   const [isActive, setisActive]= useState(true); 

  // State to manage success alert display
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle changes in form fields
  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   // Handle checkbox input
  //   if (type === 'checkbox') {
  //     setTrainData((prevState) => ({
  //       ...prevState,
  //       [name]: checked,
  //     }));
  //   } else {
  //   setTrainData((prevState) => ({
  //     ...prevState,
  //     [name]: name === 'firstClassCapacity' || name === 'secondClassCapacity' || name === 'thirdClassCapacity' ? parseInt(value, 10) : value,
  //   }));
  // }
  // };
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add new train from the api endpoint
      const response = await axios.post('http://localhost:5212/api/traindetails', {
        trainNo: trainNo, 
        trainName: trainName,
        firstClassCapacity: firstClassCapacity, 
        secondClassCapacity:secondClassCapacity,
        thirdClassCapacity:thirdClassCapacity,
        type:type,
        isPublished: true,
        isActivated: true,
      });

      console.log('Train response:', response.data);


    } catch (error) {
      console.error('Error adding train:', error);
    }
  };

  return (
    <>
    <TrainNavBar/>
    <div className="containersss">
      <h2 style={{ textAlign: 'center' }}>Add New Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="trainNo">Train No</label>
          <input
            type="text"
            id="trainNo"
            name="trainNo"
            value={trainNo}
            onChange={(e) => settrainNo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trainName">Train Name</label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            value={trainName}
            onChange={(e) => settrainName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstClassCapacity">First Class Capacity</label>
          <input
            type="number"
            id="firstClassCapacity"
            name="firstClassCapacity"
            value={firstClassCapacity}
            onChange={(e) => setfirstClassCapacity(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="secondClassCapacity">Second Class Capacity</label>
          <input
            type="number"
            id="secondClassCapacity"
            name="secondClassCapacity"
            value={secondClassCapacity}
            onChange={(e) => setsecondClassCapacity(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thirdClassCapacity">Third Class Capacity</label>
          <input
            type="number"
            id="thirdClassCapacity"
            name="thirdClassCapacity"
            value={thirdClassCapacity}
            onChange={(e) => setthirdClassCapacity(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => settype(e.target.value)}
            className="form-control"
            required
          >
            <option value="" hidden selected>Select train type</option>
            <option value="Express">Express</option>
            <option value="Intercity">Intercity</option>
            <option value="Night Mail">Night Mail</option>
            <option value="Slow">Slow</option>
          </select>
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
        <div className="form-check mb-3">
          <label htmlFor="isPublished">Published</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublished"
            name="isPublished"
            checked={isPublished}
            onChange={(e) => setisPublished(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary mt-3">
            Add Train
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
          Train added successfully!
        </SweetAlert>
      )}
    </div>
    </>
  );
}

export default AddTrain;
