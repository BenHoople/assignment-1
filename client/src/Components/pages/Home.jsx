import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

function Home () {
    return (
        <Fragment>
            <video  className="landingVideo" loop autoPlay>
                <source src="videos/coverVideo.mp4"/> 
            </video>

            <header className="home-cta">
                <h1>Vloggins!</h1>
                <br/>
                <Link to="/videos"><button className="btn btn-secondary btn-lg homeButton">View Vlogs.</button></Link>
            </header>
        </Fragment>
    );
}

export default Home;