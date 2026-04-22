const myLibrary = [];

const newBookBtn = document.querySelector('.new-book');
const dialog = document.querySelector('.book-dialog');
const bookForm = document.querySelector('.book-form');
const cancelBtn = document.querySelector('.cancel-btn');

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

        card.append(title, author, pages, read);
        display.appendChild(card);
    }
}

function handleSubmitForm(event) {
    // prevents page from refreshing (default browser behavior)
    event.preventDefault();

    const title = document.querySelector('.input-title').value;
    const author = document.querySelector('.input-author').value;
    const pages = document.querySelector('.input-pages').value;
    const read = document.querySelector('.input-read').checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookForm.reset();
    dialog.close();
}

bookForm.addEventListener('submit', handleSubmitForm);
cancelBtn.addEventListener('click', () => dialog.close());
newBookBtn.addEventListener('click', ()=> {
    dialog.showModal();
});