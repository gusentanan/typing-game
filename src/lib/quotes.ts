// src/lib/quotes.ts

const fallbackQuotes = [
  "The best way to get started is to quit talking and begin doing. Stay consistent and keep pushing forward.",
  "Don’t let yesterday take up too much of today. Focus on the now and keep going.",
  "It’s not whether you get knocked down, it’s whether you get up. Resilience is everything.",
];

export const fetchQuote = async () => {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return data[0].q;
  } catch {
    console.warn("Failed to fetch quote, using fallback");
    const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    return fallback;
  }
};
