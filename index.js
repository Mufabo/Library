function Book(title, author, pages, read) {
    this.title = title; //String
    this.author = author; // String
    this.pages = pages; // int
    this.read = read; // boolean
}

function info(book) {
    let output = book.title + ", " + book.author + ", " + book.pages + " pages, ";
    if (book.read === "Yes") output += " read"
    else output += " not yet read";
    return output;
}

let myLibrary = [];

function addBookToScreen(bookinfo) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("mdc-layout-grid__cell");

    let img = document.createElement("img");
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Open_book_nae_02.svg';

    let newContent = document.createElement("div");
    newContent.appendChild(document.createTextNode(bookinfo));

    let btn = document.createElement("button")
    btn.onclick = deleteBook;
    btn.innerHTML = "Delete Book"
    btn.classList.add("mdc-button", "mdc-button--outlined")
    let btnDiv = document.createElement("div");
    btnDiv.appendChild(btn);

    newDiv.appendChild(img);
    newDiv.appendChild(newContent);
    newDiv.appendChild(btnDiv);

    let grid = document.getElementById("grid");
    grid.appendChild(newDiv);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    addBookToScreen(info(book));
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
}

function deleteBook() {}


function libToScreen() {
    if (localStorage.getItem("myLibrary") !== null) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        console.log("myLibrary loaded");
    } else console.log("myLibrary created");
    for (let book of myLibrary) {
        addBookToScreen(info(book));
    }
}

window.onload = libToScreen;