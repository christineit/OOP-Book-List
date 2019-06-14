// ES5 App

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI() { }

// Add book to list
UI.prototype.addBookToList = function (book) {
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
// Show Alert
UI.prototype.showAlert = function (message, className) {
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
    }, 3000);
}

// Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove(); // b/c want to go up to delete <tr>
    }
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}




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

    let books;

    if (localStorage.getItem('books') === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    console.log(books);



    // Instantiate a UI Object
    const ui = new UI();
    // console.log(ui);


    // Validate
    if (title === '' || author === '' || isbn === '') {
        // alert('Must enter book info')
        // Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);

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

    //Show message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();
})