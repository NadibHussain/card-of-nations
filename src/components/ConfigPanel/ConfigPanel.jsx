import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ConfigPanel({ onConfigChange }) {
  const [config, setConfig] = useState({
    totalYears: 10,
    maxPlayers: 6,
  });

  const handleChange = (e) => {
    const newConfig = {
      ...config,
      [e.target.name]: parseInt(e.target.value)
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="config-panel p-3 border rounded mb-4">
      
      <Form.Group className="mb-3">
        <Form.Label>Total Years: {config.totalYears}</Form.Label>
        <Form.Range 
          name="totalYears"
          min="5" 
          max="70" 
          value={config.totalYears}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Max Players: {config.maxPlayers}</Form.Label>
        <Form.Select 
          name="maxPlayers"
          value={config.maxPlayers}
          onChange={handleChange}
        >
          {[3, 4, 5, 6, 7, 8].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
}