// src/hooks/useTypingGame.ts
import { useState, useEffect } from 'react';
import { fetchQuote } from '@/lib/quotes';

export function useTypingGame() {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [quote, setQuote] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');

  useEffect(() => {
    if (status === 'running' && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (status === 'running' && timeLeft === 0) {
      setStatus('finished');
    }
  }, [status, timeLeft]);

  useEffect(() => {
    if (status !== 'running') return;

    const wordsTyped = userInput.trim().split(/\s+/).filter((w) => w).length;
    const elapsedTime = 60 - timeLeft;
    const minutes = elapsedTime / 60 || 1 / 60;

    const newWpm = Math.round(wordsTyped / minutes);
    setWpm(newWpm);

    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === quote[i]) correct++;
    }

    const totalTyped = userInput.length || 1;
    const newAccuracy = Math.round((correct / totalTyped) * 100);
    setAccuracy(newAccuracy);
  }, [userInput, timeLeft, status, quote]);

  const startGame = async () => {
    const newQuote = await fetchQuote();
    setQuote(newQuote);
    setUserInput('');
    setTimeLeft(60);
    setStatus('running');
    setWpm(0);
  };

  return {
    wpm,
    accuracy,
    quote,
    userInput,
    timeLeft,
    status,
    setUserInput,
    startGame,
  };
}
