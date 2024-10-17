// Fetch books from the database on page load
document.addEventListener('DOMContentLoaded', loadBooks);

const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', addBook);

async function loadBooks() {
    try {
        const response = await fetch('https://your-backend-api.com/api/books');
        const books = await response.json();
        const tbody = document.querySelector('#bookTable tbody');
        tbody.innerHTML = '';  // Clear existing rows
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.isbn}</td>
                <td>
                    <button onclick="deleteBook('${book.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

async function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isbn = document.getElementById('isbn').value;

    const newBook = { title, author, year, isbn };
    try {
        const response = await fetch('https://your-backend-api.com/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });
        if (response.ok) {
            loadBooks();  // Refresh the book list after adding
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
}

async function deleteBook(id) {
    try {
        const response = await fetch(`https://your-backend-api.com/api/books/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            loadBooks();  // Refresh the book list after deleting
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}
