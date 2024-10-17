const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'library_db',
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

// Get all books
app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year, isbn } = req.body;
    const query = 'INSERT INTO books (title, author, year, isbn) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author, year, isbn], (err, result) => {
        if (err) throw err;
        res.status(201).send('Book added');
    });
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Book deleted');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
