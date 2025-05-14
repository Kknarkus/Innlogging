const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Ugyldig e-post eller passord' });
    }

    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Innlogging vellykket', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfeil' });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [existing] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Bruker finnes allerede' });
    }

    await db.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );

    res.status(201).json({ message: 'Bruker registrert' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfeil ved registrering' });
  }
};

module.exports = { login, register };