import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameData } from '../features/game/gameSlice'; 
import GameMap from '../components/GameMap/GameMap';
import PlayerPanel from '../components/PlayerPanel/PlayerPanel';
import CardsArea from '../components/CardArea/CardArea';
import ResourcesPanel from '../components/ResourcesPanel/ResourcesPanel';
import '../assets/css/GameDashboard.css';

export default function GameDashboard() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const game = useSelector(state => state.game.currentGame);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameData, setGameData] = useState({});

useEffect(() => {
  const loadGameData = async () => {
    try {
      const resultAction = await dispatch(fetchGameData(gameId));
      
      if (fetchGameData.fulfilled.match(resultAction)) {
        setGameData(resultAction.payload);
        console.log('Game data loaded:', resultAction.payload);
        let localData = JSON.parse(localStorage.getItem('userId')); 
        console.log('Local data:', localData);
        GetCurrentplayer(gameData,localData)
      } else {
        console.error('Failed to load game:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error loading game:', error);
    }
  };

  loadGameData();
}, [gameId, dispatch]);

const GetCurrentplayer = (gameData,localData) => {
  if(gameData.id ===localData.gameId){
    console.log('Current game ID matches local data:', gameData.id, localData.gameId);
    setCurrentPlayer(gameData.players.find(player => player.userId === localData.userID));
  }
}
  return (
    <div className="game-container">
      <GameMap game={game} />
      
      <div className="dashboard-section">
        <PlayerPanel player={currentPlayer||{}} gameData={gameData||{}} />
        {/* <CardsArea cards={currentPlayer||{}} />
        <ResourcesPanel resources={currentPlayer||{}} /> */}
      </div>
    </div>
  );
}