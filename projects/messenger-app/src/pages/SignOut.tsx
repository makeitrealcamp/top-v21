import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';
import socket from '../socket';

export default function SignOut() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    context?.setUser(null);
    socket.emit('offline', context?.user);

    navigate('/signin');
  }, [context, navigate]);

  return null;
}
