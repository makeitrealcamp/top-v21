import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(null);
    navigate('/signin');
  }, [navigate, setUser]);

  return null;
}
