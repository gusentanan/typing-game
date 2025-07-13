import './App.css'

import TypingGame from './components/TypingGame';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">Start Typing!</h1>
      <TypingGame />
    </div>
  );
}

export default App;
