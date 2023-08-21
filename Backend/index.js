const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Accounts',
  password: 'deepak28',
  port: 5432,
});

app.post('/signup', async (req, res) => {
  const { name, username, mail, mobile } = req.body;

  try {
    const query = 'INSERT INTO users (name, username, mail, mobile) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [name, username, mail, mobile];
    const result = await pool.query(query, values);

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, mobile } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND mobile = $2';
    const values = [username, mobile];
    const result = await pool.query(query, values);

    if (result.rows.length === 1) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
