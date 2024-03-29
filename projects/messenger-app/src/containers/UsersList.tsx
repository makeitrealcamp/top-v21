import { Badge, ListGroup } from 'react-bootstrap';

import { User } from '../api/types';

interface UsersListProps {
  data?: User[];
  selectedId?: number;
  onSelectItem: (user: User) => void;
  showOnlineStatus?: boolean;
}

export default function UsersList({
  data,
  selectedId,
  onSelectItem,
  showOnlineStatus = false,
}: UsersListProps) {
  return (
    <ListGroup>
      {data?.map((user) => (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={user.id}
          active={user.id === selectedId}
          onClick={() => onSelectItem(user)}
        >
          <img
            src={
              user.avatarUrl
                ? user.avatarUrl
                : 'https://via.placeholder.com/48x48'
            }
            className="rounded-circle img-thumbnail me-2"
            alt={user.username}
            style={{ width: 48 }}
          />
          <div className="ms-2 me-auto">
            <div className="fw-bold">{user.name}</div>
            {user.username}
          </div>
          {showOnlineStatus && (
            <Badge bg={user.online ? 'primary' : 'secondary'} pill>
              {user.online ? 'online' : 'offline'}
            </Badge>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
