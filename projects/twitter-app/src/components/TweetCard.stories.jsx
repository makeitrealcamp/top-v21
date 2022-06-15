import React from 'react';

import TweetCard from './TweetCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/TweetCard',
  component: TweetCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TweetCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Gustavo Morales',
    username: 'gmoralesc',
  },
  content: 'Hello World',
  date: '1 minute ago',
  commentsCount: 0,
  likes: 0,
  onLike: undefined,
};

export const withLikes = Template.bind({});
withLikes.args = {
  user: {
    name: 'Gustavo Morales',
    username: 'gmoralesc',
  },
  content: 'Hello World',
  date: '1 minute ago',
  commentsCount: 0,
  likes: 100,
  onLike: undefined,
};
