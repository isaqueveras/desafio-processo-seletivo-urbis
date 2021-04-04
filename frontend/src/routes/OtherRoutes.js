import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreateTask from '../pages/CreateTask';
import Dashboard from '../pages/Dashboard/index';
import EditTask from '../pages/EditTask';
import ListTasks from '../pages/ListTasks';

function OtherRoutes() {
 return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/task" exact component={ListTasks} />
      <Route path="/task/:id" exact component={EditTask} />
      <Route path="/create/task" exact component={CreateTask} />
    </BrowserRouter>
 );
}

export default OtherRoutes;
