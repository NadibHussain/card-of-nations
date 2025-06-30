import './PlayerPanel.css';
import nations from '../../assets/data/nation';
import { useState } from 'react';
import shopCards from '../../assets/data/shopCards';
import { doc,  } from 'firebase/firestore';
import { db } from '../../services/firebase';


export default function PlayerPanel({ player,gameData}) {
  const playerNation = nations.find(nation => nation.id === player?.nationId);
  const [isShopOpen, setIsShopOpen] = useState(false);

const handleBuyCard = async (card) => {
  try {
    // console.log(findPlayerIndex(player));
    console.log('Buying card:', player);
    console.log(gameData)
    // await updateDoc(gameRef, {
    //   [`players.${findPlayerIndex(player)}.cards`]: arrayUnion(card.id)
    // });
    // console.log('Card purchased successfully!');

  } catch (error) {
    console.error('Error purchasing card:', error);
    alert('Failed to purchase card. Please try again.');
  }
};
const findPlayerIndex = (player) => {
  return gameData.players.findIndex(p => p.userId === player.userId);
};
  return (
    <div className="player-info">
      {/* Flag and Player Info */}
      {playerNation && (
        <div className="nation-flag-badge">
          <img src={playerNation.flag} alt={playerNation.name} />
        </div>
      )}
      
      <div className="player-stats">
        <h3>{player?.playerName || 'Player'}</h3>
        {player?.isHost && <span className="host-badge">👑 Host</span>}
      </div>

      {/* Action Buttons */}
      <div className="player-actions">
        <button 
          className="open-shop-btn"
          onClick={() => setIsShopOpen(true)}
        >
          Open Shop
        </button>
      </div>

      {/* Shop Modal */}
      {isShopOpen && (
        <div className="shop-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={(e) => {
                e.stopPropagation(); 
                setIsShopOpen(false);
              }}
            >
              &times;
            </button>
            <div className="modal-header text-center">
              <h2>Card Shop</h2>
            </div>
            <div className="modal-body">
              <div className="cards-grid">
                {shopCards.map(card => (
                  <div key={card.id} className="shop-card">
                    <img src={card.image} alt={card.name} className="card-image" />
                    <div className="card-info">
                      <button 
                        className="btn btn-success"
                        onClick={() => handleBuyCard(card)}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}