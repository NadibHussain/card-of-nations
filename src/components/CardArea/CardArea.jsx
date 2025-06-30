// src/components/game/CardsArea/CardsArea.jsx
import './CardArea.css';

export default function CardsArea({ cards = [] }) {
  return (
    <div className="cards-area">
      <h3>Your Cards</h3>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="game-card">
            <div className="card-image"></div>
            <div className="card-name">{card.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}