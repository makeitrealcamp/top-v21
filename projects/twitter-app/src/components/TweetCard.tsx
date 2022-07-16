import React, { SyntheticEvent } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Tweet } from '../api/types';

function CommentsComponent({ count }) {
  return (
    <div className="d-flex me-2 align-items-center" data-cy="comments">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          d="M1.5 2.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-3.5a.75.75 0 00-.53.22L3.5 11.44V9.25a.75.75 0 00-.75-.75h-1a.25.25 0 01-.25-.25v-5.5zM1.75 1A1.75 1.75 0 000 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.457 1.457 0 002.487 1.03L7.061 10h3.189A1.75 1.75 0 0012 8.25v-5.5A1.75 1.75 0 0010.25 1h-8.5zM14.5 4.75a.25.25 0 00-.25-.25h-.5a.75.75 0 110-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.457 1.457 0 01-2.487 1.03L9.22 12.28a.75.75 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z"
        ></path>
      </svg>
      <span className="ms-1" data-cy="count">
        {count}
      </span>
    </div>
  );
}

const Comments = React.memo(CommentsComponent, function (prevProps, nextProps) {
  return prevProps.count === nextProps.count;
});

function Likes({ count, onClick }) {
  return (
    <div
      className="d-flex me-2 align-items-center"
      data-cy="likes"
      onClick={onClick}
    >
      {count === 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            fill="red"
            d="M7.655 14.916L8 14.25l.345.666a.752.752 0 01-.69 0zm0 0L8 14.25l.345.666.002-.001.006-.003.018-.01a7.643 7.643 0 00.31-.17 22.08 22.08 0 003.433-2.414C13.956 10.731 16 8.35 16 5.5 16 2.836 13.914 1 11.75 1 10.203 1 8.847 1.802 8 3.02 7.153 1.802 5.797 1 4.25 1 2.086 1 0 2.836 0 5.5c0 2.85 2.045 5.231 3.885 6.818a22.075 22.075 0 003.744 2.584l.018.01.006.003h.002z"
          ></path>
        </svg>
      )}
      <span className="ms-1" data-cy="count">
        {count}
      </span>
    </div>
  );
}

type TweetCardProps = Pick<
  Tweet,
  'user' | 'content' | 'date' | 'commentsCount' | 'likes' | 'photo'
> & {
  onLike: (event: SyntheticEvent) => void;
};

export default function TweetCard({
  user,
  content = '',
  date = '',
  commentsCount = 0,
  likes = 0,
  photo,
  onLike,
}: TweetCardProps) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          {user.name} @{user.username}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        {photo?.path && <Card.Img variant="top" src={photo.path} />}
        <div className="d-flex me-2 mt-2">
          <Comments count={commentsCount} />
          <Likes count={likes} onClick={onLike} />
        </div>
      </Card.Body>
    </Card>
  );
}

TweetCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }),
  content: PropTypes.string,
  date: PropTypes.string,
  commentsCount: PropTypes.number,
  likes: PropTypes.number,
  onLike: PropTypes.func,
};

TweetCard.defaultProps = {
  user: {
    name: '',
    username: '',
  },
  content: '',
  date: '',
  commentsCount: 0,
  likes: 0,
  onLike: undefined,
};
