import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login/index';

function SignRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/create" exact component={CreateUser} />
    </BrowserRouter>
  );
}

export default SignRoutes;
