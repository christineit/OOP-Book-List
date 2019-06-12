// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


let submitBtn = document.querySelector('submit');
console.log('Clicked!!!');


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

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}


// Event Listeners
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
    // console.log(ui);


    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();

    e.preventDefault();

})