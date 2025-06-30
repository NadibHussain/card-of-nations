import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../features/game/gameSlice';
import ConfigPanel from '../components/ConfigPanel/ConfigPanel';

export default function CreateGame() {
  const [gameName, setGameName] = useState('');
  const [gameConfig, setGameConfig] = useState({
    totalYears: 10,
    maxPlayers: 6
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleCreate = async () => {
  try {
    // Dispatch and wait for the action to complete
    const resultAction = await dispatch(createGame({ gameName, config: gameConfig }));
    
    // Check if the action was successful
    if (createGame.fulfilled.match(resultAction)) {
      // Access the payload (gameId) from the fulfilled action
      navigate(`/game/${resultAction.payload}/nation-selection/host`);
    } else {
      // Handle error case
      console.error('Game creation failed');
    }
  } catch (error) {
    console.error('Error creating game:', error);
  }
};

  return (
    <div className="container py-4">
      <h2 className="mb-5">Game Configuration</h2>

      <div className="row mb-4">
        <div className="col-md-12 mx-auto">
          <input
            className="form-control form-control-lg"
            value={gameName} 
            onChange={(e) => setGameName(e.target.value)} 
            placeholder="Enter game name"
          />
        </div>
      </div>

            {/* Config Panel */}
      <ConfigPanel onConfigChange={setGameConfig} />


      <div className="row mt-4">
        <div className="col text-center">
          <button 
            className="btn btn-primary btn-lg px-5"
            onClick={handleCreate}
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
}