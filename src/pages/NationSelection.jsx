import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import nations from '../assets/data/nation';
import { v4 as uuidv4 } from 'uuid';

export default function NationSelection({ isHost }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
const [userId, setUserId] = useState(() => {
  const storedData = localStorage.getItem('userId');
  let localUser = null;
  try {
    localUser = storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.error("Failed to parse stored user", e);
  }

  if (localUser && localUser.gameId === gameId) {
    return localUser.userID;
  }
  const newUserId = uuidv4();
  const newUser = {
    userID: newUserId,
    gameId: gameId
  };
  localStorage.setItem('userId', JSON.stringify(newUser));
  
  return newUserId;
});

  const [playerName, setPlayerName] = useState(''); // New state for player name
  const [selectedNation, setSelectedNation] = useState(null);
  const [availableNations, setAvailableNations] = useState(nations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTakenNations = async () => {
      const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        const takenNations = gameSnap.data().players?.map(p => p.nationId) || [];
        setAvailableNations(nations.map(nation => ({
          ...nation,
          taken: takenNations.includes(nation.id)
        })));
      }
    };
    fetchTakenNations();
  }, [gameId]);

  const handleSelectNation = async () => {
  if (!selectedNation || !userId) return;
  
    try {
      const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      
      if (gameSnap.exists()) {
        const gameData = gameSnap.data();
        const playerCount = gameData.players?.length || 0;
        const maxPlayers = gameData.config?.maxPlayers || 0;

      // Check if game is full
      if (playerCount +1 > maxPlayers) {
        alert('Game is already full!');
        return;
      }
        const newPlayer = 
        {
            userId,
            playerName,
            nationId: selectedNation.id,
            isHost,
            cards: [],
            resources: { 
              militaryPoints:0,
              money:0,
              sciencePoints:0,
            },
            ready: false
          }
        await updateDoc(gameRef, {
          players: arrayUnion(newPlayer),
          takenNations: arrayUnion(selectedNation.id)
        });
      }
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return (
    <div className="container py-3">
      <h2 className="text-center mb-4">Select Your Nation</h2>
      
      {/* Player Name Input */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <label htmlFor="playerName">Your Name</label>
            <input
              type="text"
              id="playerName"
              className="form-control"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
      </div>

      <div className="row row-cols-3 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-4">
        {availableNations.map(nation => (
          <div key={nation.id} className="col">
            <div 
              className={`nation-circle ${selectedNation?.id === nation.id ? 'selected' : ''} ${nation.taken ? 'taken' : ''}`}
              onClick={() => !nation.taken && setSelectedNation(nation)}
            >
              <img 
                src={nation.flag} 
                alt={nation.name} 
                className="nation-flag img-fluid" 
              />
              <div className="nation-name">{nation.name}</div>
              {nation.taken && <div className="taken-overlay">Taken</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          className="btn btn-primary btn-lg px-5"
          onClick={handleSelectNation}
          disabled={!selectedNation || loading || !playerName.trim()}
        >
          {loading ? 'Joining Game...' : 'Confirm Selection'}
        </button>
      </div>
    </div>
  );
}