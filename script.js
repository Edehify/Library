// constructor function for the book object
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// creating an empty array to store the books
const myLibrary = [];

// testing the Book constructor function

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
// adding the books to the library array
myLibrary.push(book1, book2);


// get the form element from the DOM
const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", (event) => {
    // prevent the form from submitting and refreshing the page
    event.preventDefault();
    // get the values from the form inputs
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    // convert the pages input value to a number
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

const newBook = new Book(title, author, pages, read);
myLibrary.push(newBook);
displayBook(newBook);
clearForm();

});  

// function to clear the form inputs after submission
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}   

// function to display the books in the library array as cards in the DOM
function displayBook(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;
    const authorElement = document.createElement("p");
    authorElement.textContent = `by ${book.author}`;
    const pageElement = document.createElement("p");
    pageElement.textContent = `${book.pages} pages`;
    const readElement = document.createElement("p");
    readElement.textContent = book.read ? "Read" : "Not Read";

    // create a Read/Not Read button for each book card
    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "Mark as Not Read" : "Mark as Read";
    readButton.addEventListener("click", () => {
        book.read = !book.read;  
        // update display text for read status
        readElement.textContent = book.read ? "Read" : "Not Read";       
        // Update the button text
        readButton.textContent = book.read ? "Mark as Not Read" : "Mark as Read";
    });
    // create delete button for each book card
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        // remove the book from the library array
        const index = myLibrary.findIndex((item) => item.id === book.id);
            myLibrary.splice(index, 1);
            // remove the book card from the DOM
            libraryContainer.removeChild(bookCard);
    
    }); 
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pageElement);
    bookCard.appendChild(readElement);
    bookCard.appendChild(readButton);
    bookCard.appendChild(deleteButton);
    libraryContainer.appendChild(bookCard);
}



// get library id in DOM
libraryContainer = document.getElementById("library");

// loop through the library array and create a card for each book
myLibrary.forEach((book) => {
    displayBook(book);
});
