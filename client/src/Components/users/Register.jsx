import React from 'react';
import {useState} from 'react';
//yarn add axios
import Axios from 'axios';
import {Form, Container} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setUser}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        firstName : '',
        lastName : '',
        emailConfirmation : '',
        passwordConfirmation : ''
    });
    
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/users', inputs);

      if (resp.status === 200) {
        setUser(resp.data.user);
        toast('you have logged in succesfully', {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast('Please check your credentials! '+resp.status, {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast('something went wront '+error, {
        type: toast.TYPE.ERROR
      });
    }
  };
  
    const handleInputChange = event => {
      event.persist();
  
      const {name, value} = event.target;
  
      setInputs(inputs => ({
        ...inputs,
        [name]: value
      }));
    };
    if (redirect){
      return (<Redirect to="../sessions/Login"/>);
    }

    return(
        <Container>
    
        <h1>Register</h1>
        <hr/>

        <div>
            <Form onSubmit = {handleSubmit}>
                <Form.Group>
                    <label htmlFor="firstName">First Name: </label>
                    <Form.Control type="text" name = "firstName" onChange={handleInputChange} value={inputs.firstName}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="lastName">Last Name</label>
                    <Form.Control type="text" name = "lastName" onChange={handleInputChange} value={inputs.lastName}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="email">Email</label>
                    <Form.Control type="email" name = "email" onChange={handleInputChange} value={inputs.email}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="emailConfirmation">Re-Enter your Email</label>
                    <Form.Control type="email" name = "emailConfirmation" onChange={handleInputChange} value={inputs.emailConfirmation}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="password">Password</label>
                    <Form.Control type="password" name = "password" onChange={handleInputChange} value={inputs.password}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="passwordConfirmation">Re-Enter your Password</label>
                    <Form.Control type="password" name = "passwordConfirmation" onChange={handleInputChange} value={inputs.passwordConfirmation}/>
                </Form.Group>
                <Form.Group>
                    <button className="btn btn-primary">Create User</button>
                </Form.Group>
            </Form>
        </div>
        </Container>
    );
};

export default Login;