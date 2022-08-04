import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

import { createMessage } from '../api/messages';
import { Conversation, Message, User } from '../api/types';

import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import Chat from '../containers/Chat';
import FormMessage from '../containers/FormMessage';
import UserContext from '../containers/UserContext';
import UsersList from '../containers/UsersList';
import useConversations from '../domain/useConversations';

import socket from '../socket';

export default function Home() {
  const {
    data,
    error,
    loading,
    actions: { fetch },
  } = useConversations();
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

  const findConversationIdByUsers = useCallback(
    ({ user1Id, user2Id }: { user1Id?: number; user2Id?: number }) => {
      let conversationId = -1;
      if (conversations) {
        const conversation = conversations.find((item) => {
          return (
            (item.user1Id === user1Id || item.user2Id === user1Id) &&
            (item.user1Id === user2Id || item.user2Id === user2Id)
          );
        });
        if (conversation) {
          conversationId = conversation.id;
        }
      }
      return conversationId;
    },
    [conversations],
  );

  const addMessageToConversation = useCallback(
    ({ message }: { message: Message }) => {
      if (conversations) {
        const updatedConversations = conversations.map((conversation) => {
          if (conversation.id === message.conversationId) {
            return {
              ...conversation,
              messages: [message, ...conversation.messages],
            };
          }
          return conversation;
        });
        setConversations(updatedConversations);
      }
    },
    [conversations],
  );

  async function onSendMessage(text: string) {
    try {
      if (
        selectedUserId !== undefined &&
        selectedConversationId !== undefined
      ) {
        const { data: message } = await createMessage({
          text,
          recipientId: selectedUserId,
          conversationId: selectedConversationId,
        });
        addMessageToConversation({
          message,
        });
        socket.emit('message', message);
      }
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    socket.on('response', (message) => {
      const conversationId = findConversationIdByUsers({
        user1Id: user?.id,
        user2Id: message.senderId,
      });
      if (conversationId !== -1) {
        addMessageToConversation({ message });
      } else {
        fetch();
      }
    });

    return () => {
      socket.off('response');
    };
  }, [addMessageToConversation, fetch, findConversationIdByUsers, user?.id]);

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
        {messages && <FormMessage onSendMessage={onSendMessage} />}
        <Chat data={messages} senderId={user?.id} />
      </Col>
    </Row>
  );
}
