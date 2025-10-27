const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://U3-1-UsuarioA:ouxWM63D4EHdMiYp@cluster0.31a2h7a.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  completed: Boolean
});
const Todo = mongoose.model('Todo', todoSchema);

// Get all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a todo
app.post('/api/todos', async (req, res) => {
  const { title, description, date } = req.body;
  const todo = new Todo({ title, description, date, completed: false });
  await todo.save();
  res.json(todo);
});

// Edit a todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
  res.json(todo);
});

// Remove a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ success: true });
});

app.listen(3001, () => console.log('Server running on port 3001'));