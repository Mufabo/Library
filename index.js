function Book(title, author, pages, read) {
    this.title = title; //String
    this.author = author; // String
    this.pages = pages; // int
    this.read = read; // boolean
}

Book.prototype.info = function() {
    let output = this.title + ", " + this.author + ", " + this.pages + " pages, ";
    if (this.read) output += " read"
    else output += " not yet read";
    return output;
}

let myLibrary = localStorage.getItem("myLibrary");

if (myLibrary === null) { myLibrary = []; }

function addBookToScreen(bookinfo) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("mdc-layout-grid__cell");

    let img = document.createElement("img");
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Open_book_nae_02.svg';

    let newContent = document.createTextNode(bookinfo);

    let btn = document.createElement("button")
    btn.onclick = deleteBook;
    btn.innerHTML = "Delete Book"
    btn.classList.add("mdc-button", "mdc-button--outlined")

    newDiv.appendChild(img);
    newDiv.appendChild(newContent);
    newDiv.appendChild(btn);

    let grid = document.getElementById("grid");
    grid.appendChild(newDiv);
}

function addBookToLibrary(Book) {
    // do stuff here
    myLibrary.push(Book);
    localStorage.setItem("myLibrary", myLibrary)
}

function openForm() {
    document.getElementById("addBookForm").style.display = "inline";
}

function closeForm() {
    document.getElementById("addBookForm").style.display = "none";
    let book = new Book(document.getElementById("Title").value,
        document.getElementById("Author").value,
        document.getElementById("Pages").value,
        document.getElementById("readyet").value);
    addBookToLibrary(book);
    addBookToScreen(book.info());

}

function deleteBook() {}


function libToScreen() {

    for (let book of myLibrary) {
        addBookToScreen(book.info());
    }
}

window.onload = libToScreen;