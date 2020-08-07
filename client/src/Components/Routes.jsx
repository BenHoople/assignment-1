import React from "react";
import {Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Videos from './videos/Index';
import NewVideo from './videos/New';
import EditVideo from './videos/Edit';
import Profile from './videos/Profile';
import Register from './users/Register';

function Routes ({user, setUser}) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" render={
                renderProps => <Login
                {...renderProps}
                setUser={setUser}
                />
            }/>
            <Route exact path="/logout" render={
                renderProps => <Logout
                {...renderProps}
                setUser={setUser}
                />
            }/>
            <Route exact path="/videos" render={
                renderProps => <Videos
                {...renderProps}
                user={user}
                />
            }/>
            <Route exact path="/videos/new" component = {NewVideo} />
            <Route exact path="/videos/edit" component = {EditVideo} />
            <Route exact path="/videos/profile" component = {Profile} user = {user}/>
            <Route exact path="/users/register" component = {Register}/>
        </Switch>
    );
}

export default Routes;