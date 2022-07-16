import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getTweets } from '../api/tweets';
import { generateTweet } from '../test/tweet.factory';
import List from './List';

jest.mock('../api/tweets');

describe('List Component', () => {
  test('Display tweets', async () => {
    const data = [generateTweet(), generateTweet()];
    const [{ content }] = data;

    getTweets.mockResolvedValue({
      data,
    });

    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>,
    );

    await waitFor(() => screen.findByText(content));

    expect(screen.getByText(content)).toBeTruthy();
  });
});
