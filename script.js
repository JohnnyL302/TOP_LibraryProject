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

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295", "Not read yet"); 
const book2 = new Book("Harry Potter", "J.K. Rowling", "350", "Not read yet");
const book3 = new Book("The Outsiders", "S. E. Hinton", "224", "Read");
const book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "200", "Read");


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

        bookCard.dataset.id = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;
        bookCard.appendChild(title); 

        const author = document.createElement("h3"); 
        author.textContent = book.author;
        bookCard.appendChild(author); 

        const pages = document.createElement("h4");
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);

        const read = document.createElement("h4");
        read.textContent = `${book.read}`;
        bookCard.appendChild(read);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", () => {
            const bookId = bookCard.dataset.id; 
            const updatedLibrary = myLibrary.filter(b => b.id !== bookId);
            myLibrary.length = 0;
            myLibrary.push(...updatedLibrary);
            displayBooks(); 
        })

        const toggleRead = document.createElement("button");
        toggleRead.textContent = "Toggle Read"; 
        toggleRead.classList.add("toggleRead");

        toggleRead.addEventListener("click", () => {
            const bookId = bookCard.dataset.id;
            const bookToToggle = myLibrary.find(b => b.id === bookId);

            if (bookToToggle) {
                bookToToggle.read = bookToToggle.read === "Read" ? "Not Read Yet" : "Read";
                displayBooks(); 
            }
        })
        
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(toggleRead); 
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
    const read = checkboxRead.checked ? "Read" : "Not read yet";

    if (!title || !author || !pages) {
        alert("Please complete the form");
        return;
    }

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

//=============================To Delete A Book================================









