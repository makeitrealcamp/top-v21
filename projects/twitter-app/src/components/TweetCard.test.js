import { render, screen } from '@testing-library/react';
import { generateTweet } from '../__fixtures__/tweet.fixture';
import TweetCard from './TweetCard';

describe('TweetCard', () => {
  test('Render basic information', () => {
    const tweet = generateTweet();

    render(<TweetCard user={tweet.user} content={tweet.content} />);

    expect(
      screen.getByText(`${tweet.user.name} @${tweet.user.username}`),
    ).toBeTruthy();
    expect(screen.getByText(tweet.content)).toBeTruthy();
  });
});
