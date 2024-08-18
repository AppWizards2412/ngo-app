const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = []; // An in-memory array to simulate a database

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);

  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id != id);
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
