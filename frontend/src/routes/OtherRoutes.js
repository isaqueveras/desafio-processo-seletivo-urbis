import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/index';

function OtherRoutes() {
 return (
   <BrowserRouter>
     <Route path="/" component={Dashboard} />
   </BrowserRouter>
 );
};

export default OtherRoutes;
