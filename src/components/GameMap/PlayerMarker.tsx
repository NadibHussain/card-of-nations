import { FC } from 'react';
import { Nation } from '../../assets/data/gameType';

interface PlayerMarkerProps {
  player: {
    userId: string;
    playerName: string;
    nationId: string;
    isHost: boolean;
  };
  nations: Nation[];
  position?: {
    x: number;
    y: number;
  };
}

const PlayerMarker: FC<PlayerMarkerProps> = ({ player, nations, position }) => {
  const nation = nations.find(n => n.id === player.nationId);
  
  return (
    <div 
      className="player-marker"
      style={position ? {
        left: `${position.x}%`,
        top: `${position.y}%`
      } : undefined}
    >
      <div className="player-icon">
        {nation && (
          <img 
            src={nation.flag} 
            alt={nation.name}
            className="nation-flag"
          />
        )}
      </div>
      <div >
        <span className="player-name">
          {player.playerName}
          {player.isHost && <span className="host-badge">👑</span>}
        </span>
      </div>
    </div>
  );
};

export default PlayerMarker;