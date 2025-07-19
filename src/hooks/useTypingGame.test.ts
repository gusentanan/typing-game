import { renderHook, act } from '@testing-library/react';
import { useTypingGame } from './useTypingGame';
import { expect, test, vi } from 'vitest';

vi.mock('@/lib/quotes', () => ({
  fetchQuote: () => Promise.resolve('test quote'),
}));

test('should start the game', async () => {
  const { result } = renderHook(() => useTypingGame());

  await act(async () => {
    await result.current.startGame();
  });

  expect(result.current.status).toBe('running');
  expect(result.current.quote).toBe('test quote');
});