// src/components/GameResults.tsx

interface GameResultsProps {
  wpm: number;
  accuracy: number;
  wordsTyped: number;
}

export default function GameResults({ wpm, accuracy, wordsTyped }: GameResultsProps) {
  return (
    <div className="space-y-2">
      <div className="text-green-600 font-bold">
        Words typed: {wordsTyped}
      </div>
      <div className="text-blue-600 font-semibold text-lg">
        WPM: {wpm}
      </div>
      <div className="text-orange-600 font-semibold text-lg">
        Accuracy: {accuracy}%
      </div>
    </div>
  );
}
