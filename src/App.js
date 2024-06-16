import React, { useState } from 'react';
import Node from './components/Node';
import Line from './components/Line';
import './App.css';

const nodeSize = 35;
const halfNodeSize = nodeSize / 2;

function App() {
  const initialNodes = [
    { id: 'A', x: 50, y: 50 },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [lines, setLines] = useState([]);
  const [nextId, setNextId] = useState('B');
  const [sourceNode, setSourceNode] = useState('');
  const [destNode, setDestNode] = useState('');

  const handleDrag = (id, newPosition) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, ...newPosition } : node
      )
    );
  };

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

  const addLine = () => {
    if (sourceNode && destNode && sourceNode !== destNode) {
      setLines((prevLines) => [...prevLines, { source: sourceNode, dest: destNode }]);
      setSourceNode('');
      setDestNode('');
    }
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
            onDrag={handleDrag}
          />
        ))}

        {lines.map((line, index) => {
          const sourceNode = nodes.find((node) => node.id === line.source);
          const destNode = nodes.find((node) => node.id === line.dest);
          if (!sourceNode || !destNode) return null;
          return (
            <Line
              key={index}
              sourceX={sourceNode.x + halfNodeSize}
              sourceY={sourceNode.y + halfNodeSize}
              destX={destNode.x + halfNodeSize}
              destY={destNode.y + halfNodeSize}
            />
          );
        })}
      </div>
      <div className="form">
        <input
            type="text"
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            placeholder="Source Node"
          />
          <input
            type="text"
            value={destNode}
            onChange={(e) => setDestNode(e.target.value)}
            placeholder="Destination Node"
          />
        <button onClick={addLine}>Add Line</button>
      <button onClick={addNode}>Add Node</button>
      </div>
    </div>

  );
}

export default App;
