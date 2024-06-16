import Node from './components/Node';
import React, { useState } from 'react';
import './App.css';

const nodeSize = 35;

function App() {
  const initialNodes = [
    { id: 1, x: 50, y: 50 },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [nextId, setNextId] = useState('B');

  const addNode = () => {
    const container = document.getElementById('node-container');
    const containerRect = container.getBoundingClientRect();

    const newNode = {
      id: nextId,
      x: Math.random() * (containerRect.width - nodeSize),
      y: Math.random() * (containerRect.height - nodeSize),
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNextId((prevId) => String.fromCharCode(prevId.charCodeAt(0) + 1));
  };

  return (
    <div className="container">
      <div className="node-container" id="node-container">
        {nodes.map((node) => (
          <Node
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
          />
        ))}
      </div>
      <div className="form">
      <button onClick={addNode}>Add Node</button>
      </div>
    </div>

  );
}

export default App;
