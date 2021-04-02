import React from 'react';
import { useAuth } from '../contexts/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

export default function Routes() {
  const { signed } = useAuth();

  return signed ? <OtherRoutes /> : <SignRoutes />;
};

