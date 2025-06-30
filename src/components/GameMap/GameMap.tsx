
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import PlayerMarker from './PlayerMarker';
import nations from '../../assets/data/nation';
import { maps } from '../../assets/data/maps';
import './GameMap.css';

export default function GameMap({ game }) {
  const [players, setPlayers] = useState([]);
  const maxPlayers = game?.config?.maxPlayers || 4;
  const currentMap = maps[maxPlayers] || maps.default;

  useEffect(() => {
    if (!game?.id) return;
    
    const gameRef = doc(db, 'games', game.id);
    const unsubscribe = onSnapshot(gameRef, (doc) => {
      if (doc.exists()) {
        setPlayers(doc.data().players || []);
      }
    });

    return () => unsubscribe();
  }, [game?.id]);

  const getPlayerPosition = (playerIndex) => {
    // Use predefined positions from the map data
    return currentMap.positions[playerIndex] || currentMap.positions[0];
  };

  return (
    <div className="map-section">
      <h2 >{game?.name || 'Game Map'}</h2>
      <div className="map-container">
        <div 
          className="map-background"
            style={{ 
            backgroundImage: `url(${currentMap.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {players.map((player, index) => (
            <PlayerMarker
              key={player.userId}
              player={player}
              nations={nations}
              position={getPlayerPosition(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}