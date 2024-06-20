import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyGraphs() {
  const [graphs, setGraphs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraphs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGraphs');
        setGraphs(response.data);
      } catch (error) {
        console.error('Error fetching graphs:', error);
      }
    };

    fetchGraphs();
  }, []);

  const handleSelectGraph = (graph) => {
    navigate('/profile', { state: { graph } });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
          My Graphs
        </Typography>
        <List>
        {graphs
          .filter((graph) => graph.user == localStorage.getItem('username'))
          .map((graph) => (
          <ListItem button key={graph._id} onClick={() => handleSelectGraph(graph)}>
            <ListItemText primary={`Graph: ${graph.name}`} />
          </ListItem>
        ))}
        </List>
      </Paper>
    </Container>
  );
}

export default MyGraphs;
