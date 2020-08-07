import React from 'react';
import { Link } from 'react-router-dom';
import {Fragment} from 'react';
function Nav ({user}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="#">Vloggins</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" id="videosDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Videos
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="videosDropdown">
                            <Link to="/videos" className="dropdown-item">Library</Link>
                            {user ? (
                                <Fragment>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/videos/new" className="dropdown-item">New</Link>
                                </Fragment>
                                )
                                :null}
                        </div>
                    </li>

                </ul>


                <ul className="navbar-nav">
                <li className="nav-item">
                    {user ? (
                        <Fragment>
                            <i className=" fa fa-sign-out">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </i>
                            <i className=" fa fa-user">
                                <Link to={{
                                    pathname: "/videos/profile",
                                    state: {
                                    email: user.email
                                    }
                                }}>Profile</Link>
                            </i>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <i className=" fa fa-user-plus">
                                <Link to="users/register" className="nav-link">Register</Link>
                            </i>
                            <i className=" fa fa-sign-in">
                                <Link to="/login" className="nav-link">Login</Link>
                            </i>
                        </Fragment>
                    )}
                        

                </li>
            </ul> 
            </div>
    </nav>
    );
};



export default Nav;