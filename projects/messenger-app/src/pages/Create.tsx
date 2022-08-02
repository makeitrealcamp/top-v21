import { useContext, useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '../api/conversations';
import { User } from '../api/types';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import UserContext from '../containers/UserContext';
import UsersList from '../containers/UsersList';
import useUsers from '../domain/useUsers';

export default function Create() {
  const navigate = useNavigate();
  const { data, error, loading } = useUsers();
  const context = useContext(UserContext);

  const user = context?.user;

  const users = useMemo(() => {
    return data?.filter((item) => item.id !== user?.id);
  }, [data, user?.id]);

  async function onSelectItem(selectedUser: User) {
    try {
      if (user) {
        await createConversation({
          senderId: user.id,
          recipientId: selectedUser.id,
        });

        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="my-4">
      {error && <ErrorLayoutBuilder error={error} />}
      <UsersList data={users} onSelectItem={onSelectItem} />
    </div>
  );
}
