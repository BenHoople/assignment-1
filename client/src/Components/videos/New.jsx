import React, {useState} from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        videoID: '',
        status: 'PRIVATE'
    });

    const [redirect,setRedirect] = useState(false);
    const handleSubmit = async event => {
        event.preventDefault();
        const resp = await Axios.post('/api/videos',inputs);
        try{
          if(resp.status === 200) {
            toast('Video Created Succesfully!!', {
              type: toast.TYPE.SUCCESS
            });
            setRedirect(true);
          }
        }catch(error){
          toast('That didnt work... sorry!', {
            type: toast.TYPE.ERROR
          });
        }
    };
    const handleInputChange = async event => {
        event.persist();
        const {name, value} = event.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    if (redirect) return(<Redirect to="/videos"/>);
    return(
        <Container className="my-5">
        <header>
          <h1>New Video Post</h1>
        </header>
  
        <hr/>
  
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Video Description:</Form.Label>
              <Form.Control
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Video URL:</Form.Label>
              <Form.Control
                name="videoID"
                onChange={handleInputChange}
                value={inputs.videoID}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control
                as="select"
                name="status"
                onChange={handleInputChange}
                defaultValue={inputs.status || 'PRIVATE'}
              >
                <option value="PRIVATE">Private</option>
                <option value="PUBLIC">Public</option>
              </Form.Control>
            </Form.Group>
  
            <Form.Group>
              <button type="submit" className="btn btn-primary">Create</button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    )
}

export default New;