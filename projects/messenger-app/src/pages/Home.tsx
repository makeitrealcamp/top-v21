import { useContext, useEffect, useMemo, useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Conversation, User } from '../api/types';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import Chat from '../containers/Chat';
import UserContext from '../containers/UserContext';
import UsersList from '../containers/UsersList';
import useConversations from '../domain/useConversations';

export default function Home() {
  const { data, error, loading } = useConversations();
  const context = useContext(UserContext);
  const [conversations, setConversations] = useState<
    Conversation[] | undefined
  >();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | undefined
  >();

  function onSelectItem(selectedUser: User) {
    setSelectedUserId(selectedUser.id);
    const conversation = conversations?.find((item) => {
      return (
        item.user1Id === selectedUser.id || item.user2Id === selectedUser.id
      );
    });
    if (conversation) {
      setSelectedConversationId(conversation.id);
    }
  }

  const user = context?.user;

  const users = useMemo(() => {
    return conversations?.reduce((list: User[], item) => {
      if (item.user1) {
        list.push(item.user1);
      }
      if (item.user2) {
        list.push(item.user2);
      }
      return list;
    }, []);
  }, [conversations]);

  const messages = useMemo(() => {
    const conversation = conversations?.find((item) => {
      return item.id === selectedConversationId;
    });
    if (conversation) {
      return conversation.messages;
    }
  }, [conversations, selectedConversationId]);

  useEffect(() => {
    if (data) {
      setConversations(data);
    }
  }, [data]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Row className="my-4">
      {error && <ErrorLayoutBuilder error={error} />}
      <Col md={4}>
        <UsersList
          data={users}
          selectedId={selectedUserId}
          onSelectItem={onSelectItem}
        />
      </Col>
      <Col md={8} className="d-flex flex-column border-start">
        <Form.Group className="mb-3 d-flex">
          <Form.Control type="text" placeholder="Enter your message" />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
        <Chat data={messages} senderId={user?.id} />
      </Col>
    </Row>
  );
}
