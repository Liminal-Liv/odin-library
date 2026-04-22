const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const display = document.querySelector('.library-display');
    display.textContent = '';

    for (const book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('book-card');

        // this hidden data id was added to make removing specific books easier
        card.dataset.id = book.id;

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const read = document.createElement('p');
        read.textContent = `${book.read ? "Read" : "Unread"}`

        card.append(title, author, read);
        display.appendChild(card);
    }
}