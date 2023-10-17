import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import MainScreen from '../MainScreen';
import { register } from '../../actions/userAction';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      try {
        const response = await axios.post('http://localhost:5212/api/Registration/register', {
          userName: name,  // Use the user input for 'userName'
          password: password, // Use the user input for 'password'
          nic: name, // Use the user input for 'nic'
          isActivated: true,
        });

        // Handle the response as needed
        console.log('Registration response:', response.data);
        // Redirect or perform other actions on success

      } catch (error) {
        // Handle any errors
        console.error('Registration error:', error);
        // Update 'error' state or display an error message
      }
    }
  };

  return (
    <MainScreen title="Let's Get Started!">
      <div className="top">
        <Card style={{ paddingtop: 0 }}>
          <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  placeholder="Enter Phone No"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Link to = '/login'><Button variant="primary" type="submit">
                Register
              </Button>
              </Link>
            </Form>
            <Link to="/login">Have an Account? Login</Link>
          </div>
        </Card>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
