// src/components/TypingGame.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TypingGame() {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [quote, setQuote] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");

  const fallbackQuotes = [
    "The best way to get started is to quit talking and begin doing. Stay consistent and keep pushing forward.",
    "Don’t let yesterday take up too much of today. Focus on the now and keep going.",
    "It’s not whether you get knocked down, it’s whether you get up. Resilience is everything.",
  ];

  // useEffect(() => {
  //   if (status === "running" && timeLeft > 0) {
  //     const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
  //     return () => clearInterval(interval);
  //   } else if (status === "running" && timeLeft === 0) {
  //     setStatus("finished");
      
  //     // calculate wpm
  //     const wordsTyped = userInput.trim().split(/\s+/).length;
  //     const minutes = 60 / 60; // 60 sec → 1 min
  //     const calculatedWpm = Math.round(wordsTyped / minutes);
  //     setWpm(calculatedWpm);

  //      // calculate accuracy
  //     let correct = 0;
  //     const typed = userInput;
  //     for (let i = 0; i < typed.length; i++) {
  //       if (typed[i] === quote[i]) correct++;
  //     }
  //     const totalTyped = typed.length || 1; 
  //     const calculatedAccuracy = Math.round((correct / totalTyped) * 100);
  //     setAccuracy(calculatedAccuracy);
  //   }
  // }, [status, timeLeft]);

  // Countdown useEffect
  useEffect(() => {
    if (status === "running" && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  
    if (status === "running" && timeLeft === 0) {
      setStatus("finished");
    }
  }, [status, timeLeft]);
  

  // WPM & accuracy useEffect
  useEffect(() => {
    if (status !== "running") return;
  
    // Calculate WPM
    const wordsTyped = userInput.trim().split(/\s+/).filter(w => w).length;
    const elapsedTime = 60 - timeLeft;
    const minutes = elapsedTime / 60 || 1 / 60; // Avoid divide by 0
  
    const newWpm = Math.round(wordsTyped / minutes);
    setWpm(newWpm);
  
    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === quote[i]) correct++;
    }
  
    const totalTyped = userInput.length || 1;
    const newAccuracy = Math.round((correct / totalTyped) * 100);
    setAccuracy(newAccuracy);
  }, [userInput, timeLeft, status]);
  
  
  // fetching qoute method
  const fetchQuote = async () => {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      return data[0].q;
    } catch (e) {
      console.warn("Failed to fetch quote, using fallback");
      const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return fallback;
    }
  };
  
  // Start game method
  const startGame = async () => {
    const newQuote = await fetchQuote();
    setQuote(newQuote);
    setUserInput("");
    setTimeLeft(60);
    setStatus("running");
    setWpm(0);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <Card>
        <CardContent className="p-4 text-xl whitespace-pre-wrap">{quote}</CardContent>
      </Card>

      <Textarea
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
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
        <div className="space-y-2">
          <div className="text-green-600 font-bold">
            Words typed: {userInput.trim().split(/\s+/).length}
          </div>
          <div className="text-blue-600 font-semibold text-lg">
            WPM: {wpm}
          </div>
          <div className="text-orange-600 font-semibold text-lg">
            Accuracy: {accuracy}%
          </div>
        </div>
        
      )}
    </div>
  );
}
