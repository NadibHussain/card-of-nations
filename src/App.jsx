import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateGame from './pages/CreateGame';
import JoinGame from './pages/JoinGame';
import GameDashboard from './pages/GameDashboard';
import NationSelection from './pages/NationSelection';
import './App.css';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/game/:gameId" element={<GameDashboard />} />
        <Route path="/game/:gameId/nation-selection/host" element={<NationSelection isHost={true}/>} />
        <Route path="/game/:gameId/nation-selection/" element={<NationSelection isHost={false}/>} />

      </Routes>
    </Router>
  );
}

export default App;