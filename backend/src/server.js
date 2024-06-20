const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = 5000;

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    let user = new User({ username, password: bcrypt.hashSync(password, 10) });
    console.log(user);
    await user.save();
    console.log('User saved');
    res.send("ok");
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password.'); 
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid username or password.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log(token)
    res.send({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


const graphSchema = new mongoose.Schema({
    user: String,
    name: String,
    nodes: Array,
    lines: Array,
  });
  
  const Graph = mongoose.model('Graph', graphSchema);
  
  app.post('/saveGraph', async (req, res) => {
    const { user, name, nodes, lines } = req.body;
    console.log(nodes, lines);
    const newGraph = new Graph({ user, name, nodes, lines });
    console.log(newGraph)
    try {
      const savedGraph = await newGraph.save();
      res.status(200).json(savedGraph);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/getGraphs', async (req, res) => {
    try {
      const graphs = await Graph.find();
      res.status(200).json(graphs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
