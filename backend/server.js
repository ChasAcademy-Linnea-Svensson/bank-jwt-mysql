import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './key.env' });
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';

const app = express();
const PORT = 5001;
const secret = process.env.TOKEN;
const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'linnea',
  password: 'linnea',
  database: 'BankJwt',
});

app.use(bodyParser.json(), cors());

const authenticateAccessToken = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secret, (err, id) => {
    if (err) return res.sendStatus(403);
    req.id = id;
    next();
  });
};

const generateAccessToken = (userId) => {
  return jwt.sign(userId, secret);
};

app.get('/', (req, res) => {
  res.send('Bank backend');
});

app.get('/me/accounts', authenticateAccessToken, (req, res) => {
  connection.query(
    'SELECT * FROM accounts WHERE user_id = (?)',
    [req.id],
    (err, results) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.send(results[0]);
      }
    }
  );
});

app.put('/me/accounts/:id', authenticateAccessToken, (req, res) => {
  connection.query(
    'UPDATE accounts SET amount = amount + (?) WHERE user_id = (?)',
    [req.body.amount, req.id],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        connection.query(
          'SELECT amount FROM accounts WHERE user_id = (?)',
          [req.id],
          (err, results) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(results[0].amount);
            }
          }
        );
      }
    }
  );
});

app.post('/users', (req, res) => {
  const user = req.body;

  const { name, email, password, balance } = user;

  connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        connection.query(
          'INSERT INTO accounts (user_id, amount) VALUES (?, ?)',
          [results.insertId, parseInt(balance)],
          (err, results) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else {
              res.send('ok');
            }
          }
        );
      }
    }
  );
});

app.post('/sessions', (req, res) => {
  const user = req.body;

  const { email, password } = user;

  connection.query(
    'SELECT * FROM users WHERE email = (?)',
    [email],
    (err, results) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (results[0].password == password) {
          const token = generateAccessToken(results[0].id);
          res.json({ token, username: results[0].username });
        } else {
          res.sendStatus(403);
        }
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
