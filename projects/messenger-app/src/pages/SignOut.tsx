import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function SignOut() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    context?.setUser(null);
    navigate('/signin');
  }, [context, navigate]);

  return null;
}
