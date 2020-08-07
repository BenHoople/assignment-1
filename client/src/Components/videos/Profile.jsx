import React, { useEffect, useState, Fragment } from 'react';
import {Container} from 'react-bootstrap';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
const Profile = (props, user) => {
    
    const [videos, setVideos] = useState([]);

    const[latestVideo, setLatestVideo] = useState([]);
    
    const email =  props.location.state.email;
    
    useEffect(() => {
        (async () => {
          await getVideos();
        })();
      }, []);

    const getVideos = async () => {
      const videosResp =  await Axios.post('/api/videos/profile',{'email': email});
      if(videosResp.status === 200){
        setVideos(videosResp.data);
        if(videosResp.data[0] !== undefined)
          setLatestVideo(videosResp.data[0]);
      }else{
        toast("That didn't work...", {type: toast.TYPE.ERROR});
      }
    };

    const deleteVideo = async (video) => {
      try{
        const videosResp = await Axios.post('/api/videos/delete',{
          id: video._id
        });
        if(videosResp.status === 200){
          toast("Video deleted succesfully!", {type: toast.TYPE.SUCCESS});
          await getVideos();
        }
      }catch(error){
        toast("That didn't work...", {type: toast.TYPE.ERROR});
      }
    }
    return(
      <Container className="videosIndex">
      {(latestVideo.videoID !== undefined ? (
        <Fragment> 
          <header className="headliner">
            <h1> {latestVideo.user.fullname}'s Latest Videos!</h1>
          </header> 
                <div className= "latestVideo">
                  <div className="image-description-div flexbox-container latestVideoFrame"> 
                      <iframe src={"https://www.youtube.com/embed/".concat(latestVideo.videoID)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      <h5 className="video-description flexbox-item mt-1">{latestVideo.description}</h5>
                  </div>
                  <div>
                      <h1 className="card-text">{latestVideo.title}</h1>
                      <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            {user._id == latestVideo.user.id ? (
                                  <Fragment>
                                      <Link  to="/videos/{video._id}/edit"><button type="button" className="btn btn-sm btn-outline-secondary">Edit</button></Link>
                                      <button className="delete btn btn-sm btn-outline-secondary" onClick = {() => deleteVideo(latestVideo)}>
                                          Delete
                                      </button>
                                  </Fragment>
                              ) : null }
                          </div>
                          <small className="text-muted">{latestVideo.updatedAt.toLocaleString("en-CA")}</small>
                      </div>
                      <h4>By : {latestVideo.user.fullname}</h4>
                      <br/>
                  </div>
              </div>
            </Fragment>
                ) : (
                  <h1>You have to upload some videos!</h1>
                ))}
      <header className="Archive">
        <h1>Archive</h1>
      </header>

      <hr/>

      <div className="content">
        {videos && videos.map((video, i) => ( 
            <div key= {i} className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <div className="image-description-div flexbox-container"> 
                        <iframe src={"https://www.youtube.com/embed/".concat(video.videoID)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <p className="video-description flexbox-item mt-1">{video.description}</p>
                    </div>
                    <div className="card-body">
                        <h4 className="card-text">{video.title}</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                {user._id == video.user.id ? (
                                    <Fragment>
                                        <Link  to="/videos/{video._id}/edit"><button type="button" className="btn btn-sm btn-outline-secondary">Edit</button></Link>
                                        <button className="delete btn btn-sm btn-outline-secondary" onClick = {() => deleteVideo(video)}>
                                            Delete
                                        </button>
                                    </Fragment>
                                ) : null }
                            </div>
                            <small className="text-muted">{video.updatedAt.toLocaleString("en-CA")}</small>
                        </div>
                        <Link to={{
                            pathname: "/videos/profile",
                            state: {
                              user: video.user
                            }
                          }}>
                          <small className="text-muted">By : {video.user.fullname}</small>
                        </Link>
                        <br/>
                    </div>
                </div>
            </div> 
        ))}
      </div>        
    </Container>
    )

}
export default Profile;
