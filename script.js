const myLibrary = []; 
const showDialog = document.getElementById("addBookBtn");
const toAddBook = document.getElementById("addBook");
const confirmBtn = document.getElementById("confirm"); 
const cancelBtn = document.getElementById("cancel");
const checkboxRead = document.getElementById("read");
const form = document.querySelector("form");


function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call constructor")
    }
    this.title = title; 
    this.author = author;
    this.pages = pages; 
    this.id = crypto.randomUUID(); 
    this.read = read; 
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, ID: ${this.id}`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295", "not read yet"); 
const book2 = new Book("Harry Potter", "J.K. Rowling", "350", "not read yet");
const book3 = new Book("The Outsiders", "S. E. Hinton", "224", "read");
const book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "200", "read");


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);


// =============================To Display Books into cards======================================

function displayBooks() {
    let container = document.getElementById("library");
        if (!container) {
        container = document.createElement("div");
        container.id = "library";
        document.body.appendChild(container);
    }
    container.innerHTML = "";
    myLibrary.forEach((book) => {

        // this creates a bookCard with the class "cards"
        const bookCard = document.createElement("div");
        bookCard.classList.add("cards"); 

        const title = document.createElement("h2");
        title.textContent = book.title;
        bookCard.appendChild(title); 

        const author = document.createElement("h3"); 
        author.textContent = book.author;
        bookCard.appendChild(author); 

        const pages = document.createElement("h4");
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);

        container.appendChild(bookCard);

    });
}

displayBooks(); 

//===========================Add a new Book =================================

showDialog.addEventListener("click", () => {
    toAddBook.showModal(); 
})
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = checkboxRead.checked ? "read" : "not read yet";

    newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks(); 
    form.reset();
    toAddBook.close(); 
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    toAddBook.close(); 
    form.reset(); 
})







