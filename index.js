const express = require('express');
const app = express();

const pool = require('./db');

app.use(express.json());

// routes

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('select * from todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a todo

app.get('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await pool.query('select * from todo where todo_id= $1', [
      todoId,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// create a  todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'insert into todo (description) values ($1) returning *',
      [description],
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description } = req.body;
    await pool.query('update todo set description = $1 where todo_id =  $2', [
      description,
      todoId,
    ]);
    res.json('todo was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    await pool.query('delete from todo where todo_id = $1', [todoId]);
    res.json('todo deleted successfully');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(process.env.PORT, () =>
  console.log('Server is listening on port', process.env.PORT),
);
