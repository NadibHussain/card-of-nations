import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1 className="app-title">Card of Nations</h1>
      <div className="button-container">
        <button 
          className="action-button" 
          onClick={() => navigate('/create-game')}
        >
          Create Game
        </button>
        <button 
          className="action-button" 
          onClick={() => navigate('/join-game')}
        >
          Join Game
        </button>
      </div>
    </div>
  );
}