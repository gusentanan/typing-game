import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import GameResults from "@/components/GameResults";
import { useTypingGame } from "@/hooks/useTypingGame";

export default function TypingGame() {
  const {
    wpm,
    accuracy,
    quote,
    userInput,
    timeLeft,
    status,
    setUserInput,
    startGame,
  } = useTypingGame();

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <Card>
        <CardContent className="p-4 text-xl whitespace-pre-wrap">{quote}</CardContent>
      </Card>

      <Textarea
        value={userInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
        className="w-full h-32"
        disabled={status !== "running"}
        placeholder="Start typing here..."
      />

      <div className="flex items-center justify-between">
        <Button onClick={startGame}>
          {status === "running" ? "Restart" : "Start"}
        </Button>
        <span className="text-lg font-semibold">Time Left: {timeLeft}s</span>
      </div>

      {status === "finished" && (
        <GameResults
          wpm={wpm}
          accuracy={accuracy}
          wordsTyped={userInput.trim().split(/\s+/).length}
        />
      )}
    </div>
  );
}