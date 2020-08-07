import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id;

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    videoID: '',
    status: 'PRIVATE'
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const videoResp = await Axios.get(`/api/videos/${id}`);
      if (videoResp.status === 200){
        setInputs(videoResp.data);
        console.log(videoResp.data);
      }
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/videos/update', inputs);
      console.log(resp.status); 
      if (resp.status === 200)  {
        toast("The video was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the video", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the video", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/videos/Index"/>);

  return (
    <Container className="my-5">
        <header>
          <h1>Edit Your Video</h1>
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
                value={`https://www.youtube.com/watch?v=${inputs.videoID}`}
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
              <button type="submit" className="btn btn-primary">Edit</button>
            </Form.Group>
          </Form>
        </div>
      </Container>
  );

};

export default Edit;