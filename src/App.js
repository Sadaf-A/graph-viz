import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Line from './components/Line';
import { bfs } from './algorithms/bfs';
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
  const [startNode, setStartNode] = useState('');
  const [algorithm, setAlgorithm] = useState('BFS'); // State to select algorithm
  const [bfsOrder, setBfsOrder] = useState([]);
  const [currentBfsIndex, setCurrentBfsIndex] = useState(-1);
  const [bfsEdges, setBfsEdges] = useState([]);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


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

  const animateTraversal = (order, edges) => {
    setBfsOrder(order);
    setBfsEdges(edges);
    setCurrentBfsIndex(0);
    setHighlightedEdges([]); 
  };

  const startAnimation = () => {
    if (nodes.length > 0 && startNode) {
      const startNodeExists = nodes.some(node => node.id === startNode);
      if (startNodeExists) {
        if (algorithm === 'BFS') {
          bfs(nodes, lines, startNode, animateTraversal);
        }
        setErrorMessage('');
      } else {
        setErrorMessage('Start node does not exist.');
      }
    } else {
      setErrorMessage('Please specify a valid start node.');
    }
  };

  useEffect(() => {
    if (currentBfsIndex >= 0 && currentBfsIndex < bfsEdges.length) {
      const timer = setTimeout(() => {
        setHighlightedEdges((prev) => [...prev, bfsEdges[currentBfsIndex]]);
        setCurrentBfsIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentBfsIndex, bfsEdges]);

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
            highlighted={bfsOrder.includes(node.id) && bfsOrder.indexOf(node.id) <= currentBfsIndex}
          />
        ))}

        {lines.map((line, index) => {
          const sourceNode = nodes.find((node) => node.id === line.source);
          const destNode = nodes.find((node) => node.id === line.dest);
          if (!sourceNode || !destNode) return null;
          const highlight = highlightedEdges.some(edge => 
            (edge.source === line.source && edge.dest === line.dest) || 
            (edge.source === line.dest && edge.dest === line.source)
          );
          return (
            <Line
              key={index}
              sourceX={sourceNode.x + halfNodeSize}
              sourceY={sourceNode.y + halfNodeSize}
              destX={destNode.x + halfNodeSize}
              destY={destNode.y + halfNodeSize}
              highlighted={highlight}
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
      <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          placeholder="Start Node"
          title="Enter the ID of the starting node for BFS"
        />
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} title="Select the algorithm for traversal">
          <option value="BFS">BFS</option>
        </select>
        <button onClick={startAnimation} title="Start BFS animation">Start</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>

  );
}

export default App;
