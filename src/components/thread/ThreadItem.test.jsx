import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

/**
 * Skenario Pengujian:
 *
 * - ThreadItem Component
 *  - harus merender informasi thread (judul, owner, komentar) dengan benar
 *  - harus memanggil onUpvote ketika tombol upvote ditekan dan pengguna sudah login
 */

describe('ThreadItem Component', () => {
  afterEach(() => {
    cleanup();
  });

  const fakeThread = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: 'Test Thread Body',
    category: 'react',
    createdAt: '2022-09-22T10:06:55.588Z',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 5,
  };

  const fakeOwner = {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://generated-image.url/john',
  };

  it('should render thread information correctly', () => {
    render(
      <MemoryRouter>
        <ThreadItem
          thread={fakeThread}
          owner={fakeOwner}
          onUpvote={() => {}}
          onDownvote={() => {}}
          onNeutralizeVote={() => {}}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('5 komentar')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should call onUpvote when upvote button is clicked and user is logged in', async () => {
    const mockOnUpvote = vi.fn();

    render(
      <MemoryRouter>
        <ThreadItem
          thread={fakeThread}
          owner={fakeOwner}
          authUserId="user-2"
          onUpvote={mockOnUpvote}
          onDownvote={() => {}}
          onNeutralizeVote={() => {}}
        />
      </MemoryRouter>,
    );

    // There are two buttons, upvote and downvote. Upvote is the first one.
    // The button has a title="Upvote" if logged in.
    const upvoteButton = screen.getByTitle('Upvote');
    await userEvent.click(upvoteButton);

    expect(mockOnUpvote).toHaveBeenCalledWith('thread-1');
  });
});
