// ES5 App Converted ES6 Classes

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        // console.log(book);
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr');
        // console.log(row);
        // Insert columns
        row.innerHTML = `
        <td>${book.title}</td >
        <td>${book.author}</td >
        <td>${book.isbn}</td >
        <td><a href="#" class="delete">X</td > 
            `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent (insert into DOM)
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert div before #book-form form 
        container.insertBefore(div, form);

        //Timeout after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove(); // b/c want to go up to delete <tr>
        }
    }

    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
}

// Local storage Class
class Store {
    // Fetch from local storage
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }
    // Display books in UI
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }
    //Add to local storage
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    // Remove from local storage
    static removeBook(isbn) {
        // console.log(isbn);
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);



// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // console.log('test');
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    // console.log(title, author, isbn);

    //Instantiate a book
    const book = new Book(title, author, isbn);
    // console.log(book);

    // Instantiate a UI Object
    const ui = new UI();
    console.log(ui);

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // alert('Must enter book info')
        // Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to local storage
        Store.addBook(book);

        // Show successful add message
        ui.showAlert('Book added!', 'success')

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();

});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {

    // console.log('test');
    const ui = new UI();

    // Delete book 
    ui.deleteBook(e.target);

    // Remove from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();
})