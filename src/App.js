import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Line from './components/Line';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Typography,
  Grid
} from '@mui/material';
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
  const [algorithm, setAlgorithm] = useState('BFS'); 
  const [bfsOrder, setBfsOrder] = useState([]);
  const [dfsOrder, setDfsOrder] = useState([]);
  const [currentBfsIndex, setCurrentBfsIndex] = useState(-1);
  const [currentDfsIndex, setCurrentDfsIndex] = useState(-1);
  const [bfsEdges, setBfsEdges] = useState([]);
  const [dfsEdges, setDfsEdges] = useState([]);
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
    if (algorithm === 'BFS') {
      setBfsOrder(order);
      setBfsEdges(edges);
      setCurrentBfsIndex(0);
      setHighlightedEdges([]);
    } else if (algorithm === 'DFS') {
      setDfsOrder(order);
      setDfsEdges(edges);
      setCurrentDfsIndex(0);
      setHighlightedEdges([]);
    } 
  };

  const startAnimation = () => {
    if (nodes.length > 0 && startNode) {
      const startNodeExists = nodes.some(node => node.id === startNode);
      if (startNodeExists) {
        if (algorithm === 'BFS') {
          bfs(nodes, lines, startNode, animateTraversal);
        } else if (algorithm === 'DFS') {
          dfs(nodes, lines, startNode, animateTraversal);
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
    if (algorithm === 'BFS' && currentBfsIndex >= 0 && currentBfsIndex < bfsEdges.length) {
      const timer = setTimeout(() => {
        setCurrentBfsIndex((prevIndex) => prevIndex + 1);
        setHighlightedEdges((prev) => [...prev, bfsEdges[currentBfsIndex]]);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (algorithm === 'DFS' && currentDfsIndex >= 0 && currentDfsIndex < dfsEdges.length) {
      const timer = setTimeout(() => {
        setCurrentDfsIndex((prevIndex) => prevIndex + 1);
        setHighlightedEdges((prev) => [...prev, dfsEdges[currentDfsIndex]]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentBfsIndex, currentDfsIndex, bfsEdges, dfsEdges, algorithm]);

  return (
    <Container className="container" maxWidth="xl">
      <Grid container spacing={2} style={{ height: '90vh' }}>
        <Grid item xs={8}>
          <Paper className="node-container" id="node-container" elevation={3} style={{ height: '100%' }}>
            {nodes.map((node) => (
              <Node
                key={node.id}
                id={node.id}
                x={node.x}
                y={node.y}
                onDrag={handleDrag}
                highlighted={algorithm === 'BFS' 
                  ? bfsOrder.includes(node.id) && bfsOrder.indexOf(node.id) <= currentBfsIndex 
                  : dfsOrder.includes(node.id) && dfsOrder.indexOf(node.id) <= currentDfsIndex}
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
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="form" elevation={3} style={{ padding: '20px', height: '100%' }}>
            <TextField
              label="Source Node"
              value={sourceNode}
              onChange={(e) => setSourceNode(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Destination Node"
              value={destNode}
              onChange={(e) => setDestNode(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addLine}
              style={{ marginRight: '10px' }}
            >
              Add Line
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addNode}
            >
              Add Node
            </Button>
            <TextField
              label="Start Node"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              margin="normal"
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Algorithm</InputLabel>
              <Select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <MenuItem value="BFS">BFS</MenuItem>
                <MenuItem value="DFS">DFS</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              onClick={startAnimation}
              fullWidth
            >
              Start
            </Button>
          </Paper>
          {errorMessage && (
            <Typography color="error" variant="body1" style={{ marginTop: '20px' }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
