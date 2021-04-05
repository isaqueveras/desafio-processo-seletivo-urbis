import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreateTask from '../pages/CreateTask';
import CreateUser from '../pages/CreateUser';
import Dashboard from '../pages/Dashboard/index';
import EditTask from '../pages/EditTask';
import ListTasks from '../pages/ListTasks';
import ListUsers from '../pages/ListUsers.js';
import MyProfile from '../pages/MyProfile';

function OtherRoutes() {
 return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/task" exact component={ListTasks} />
      <Route path="/task/:id" exact component={EditTask} />
      <Route path="/create/task" exact component={CreateTask} />

      <Route path="/user" exact component={ListUsers} />
      <Route path="/create/user" exact component={CreateUser} />

      <Route path="/profile" exact component={MyProfile} />
    </BrowserRouter>
 );
}

export default OtherRoutes;
