
import  { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from '../MainScreen';
import { Form, Button, Row, Col,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from "../Loading/Loading";
import { login } from "../../actions/userAction";
import axios from 'axios';

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
   {
      try {
        const response = await axios.post('http://localhost:5212/api/auth', {
          userName: name,  // Use the user input for 'userName'
          password: password, // Use the user input for 'password'
          nic: name, // Use the user input for 'nic'
        });

        // Handle the response as needed
        console.log('Login response:', response.data);
        // Redirect or perform other actions on success

      } catch (error) {
        // Handle any errors
        console.error('Login error:', error);
        // Update 'error' state or display an error message
      }
    }
  };


  return (
    <>
    

      <MainScreen tittle="LOGIN" style={{ margin: 150 }}>
      <Card style={{ margin: 150 }}>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="NIC"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>


              <br/>
            <Link to = '/admin-home'><Button variant="primary" type="submit">
              Submit
            </Button>
            </Link>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </Card>
    </MainScreen>

  
    </>
  );
  
}

export default LoginScreen;
