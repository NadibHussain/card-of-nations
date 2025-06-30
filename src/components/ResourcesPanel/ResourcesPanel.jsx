// src/components/game/ResourcesPanel/ResourcesPanel.jsx
import './ResourcesPanel.css';

const resourceTypes = ['wood', 'stone', 'food', 'gold'];

export default function ResourcesPanel({ resources = {} }) {
  return (
    <div className="resources-panel">
      <h3>Resources</h3>
      <ul>
        {resourceTypes.map(type => (
          <li key={type}>
            <span className="resource-icon">{type[0].toUpperCase()}</span>
            <span className="resource-value">
              {resources[type] || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}