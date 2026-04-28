let myLibrary = [];

const newBookBtn = document.querySelector('.new-book');
const dialog = document.querySelector('.book-dialog');
const bookForm = document.querySelector('.book-form');
const cancelBtn = document.querySelector('.cancel-btn');
const seedLibraryBtn = document.querySelector('.seed-library');

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleRead = function() {
        this.read = !this.read;
    }
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
        // this was added for visual purposes so dev tools shows the same id as myLibrary
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
        readStatus.addEventListener('change', ()=> book.toggleRead());

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', ()=> removeBook(book.id));

        card.append(title, author, pages, readStatus, deleteBtn);
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

function removeBook(id) {
    myLibrary = myLibrary.filter((book)=> book.id !== id);
    displayBooks();
}

bookForm.addEventListener('submit', handleSubmitForm);
cancelBtn.addEventListener('click', () => dialog.close());
newBookBtn.addEventListener('click', ()=> {
    dialog.showModal();
});

// for testing purposes and quick library visuals
function seedLibrary() {
    const books = [
        { t: "The Lies of Locke Lamora", a: "Scott Lynch", p: 539, r: true },
        { t: "Red Seas Under Red Skies", a: "Scott Lynch", p: 576, r: true },
        { t: "The Republic of Thieves", a: "Scott Lynch", p: 606, r: false },
        { t: "The Raven Boys", a: "Maggie Stiefvater", p: 409, r: false },
        { t: "The Dream Thieves", a: "Maggie Stiefvater", p: 439, r: false },
        { t: "Blue Lily, Lily Blue", a: "Maggie Stiefvater", p: 391, r: false },
        { t: "The Final Empire", a: "Brandon Sanderson", p: 541, r: true },
        { t: "The Well of Ascension", a: "Brandon Sanderson", p: 590, r: true },
        { t: "The Hero of Ages", a: "Brandon Sanderson", p: 572, r: true },
        { t: "Quiet", a: "Susan Cain", p: 333, r: true },
        { t: "The Girl with the Dragon Tattoo", a: "Stieg Larsson", p: 465, r: true },
        { t: "The Girl Who Played with Fire", a: "Stieg Larsson", p: 503, r: true },
        { t: "The Girl Who Kicked the Hornets' Nest", a: "Stieg Larsson", p: 563, r: true }
    ];

    books.forEach(b => {
        const newBook = new Book(b.t, b.a, b.p, b.r);
        myLibrary.push(newBook);
    });

    displayBooks();
}

seedLibraryBtn.addEventListener('click', seedLibrary)