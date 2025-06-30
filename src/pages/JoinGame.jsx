import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinGame } from '../features/game/gameSlice';

export default function JoinGame() {
  const [gameIdInput, setGameIdInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinGame = async () => {
    if (!gameIdInput.trim()) return;
    
    try {
      const resultAction = await dispatch(joinGame(gameIdInput));
      
      if (joinGame.fulfilled.match(resultAction)) {
        navigate(`/game/${resultAction.payload}/nation-selection/`);
      } else if (joinGame.rejected.match(resultAction)) {
        alert(resultAction.payload || 'Failed to join game');
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
    }
  };

  return (
    <div className="app-container">
      <h2>Join Existing Game</h2>
      <input
        type="text"
        value={gameIdInput}
        onChange={(e) => setGameIdInput(e.target.value)}
        placeholder="Enter game ID"
        className="input-field"
      />
      <button onClick={handleJoinGame} className="action-button">
        Join
      </button>
      <button onClick={() => navigate('/')} className="action-button secondary">
        Back
      </button>
    </div>
  );
}