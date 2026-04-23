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
    display.querySelectorAll('.book-card').forEach(card => card.remove());

    for (const book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('book-card');
        // this hidden data id was added to make removing specific books easier
        card.dataset.id = book.id;

        const title = document.createElement('p');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = book.pages;

        const readStatus = document.createElement('input');
        readStatus.type = 'checkbox';
        readStatus.classList.add('read-checkbox');
        readStatus.checked = book.read ? true : false;
        readStatus.addEventListener('change', (e)=>{
            // grabs the ID from the current 'book' in the array loop
            // and the status from the checkbox 'e.target'
            toggleReadStatus(book.id, e.target.checked)
        })

        card.append(title, author, pages, readStatus);
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

// takes the true/false read from the DOM checkbox and updates the array myLibrary with it.
function toggleReadStatus(bookId, isChecked) {
    // console.log("I am looking for book ID:", id);
    // console.log("The user wants the read status to be:", status);
    const bookToUpdate = myLibrary.find(b => b.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.read = isChecked;
    }
}

bookForm.addEventListener('submit', handleSubmitForm);
cancelBtn.addEventListener('click', () => dialog.close());
newBookBtn.addEventListener('click', ()=> {
    dialog.showModal();
});