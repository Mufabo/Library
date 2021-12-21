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
if (localStorage.getItem("myLibrary") !== null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    console.log("myLibrary loaded");
} else {

    console.log("myLibrary created");
}

function addBookToScreen(book) {
    let bookinfo = info(book);
    let newDiv = document.createElement("div");
    newDiv.classList.add("mdc-layout-grid__cell");

    let img = document.createElement("img");
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Open_book_nae_02.svg';

    let newContent = document.createElement("div");
    newContent.setAttribute("id", "text");
    let bookText = document.createTextNode(bookinfo)
    newContent.appendChild(bookText);
    //newContent.innerText = bookinfo;

    let btn = document.createElement("button")
    btn.innerHTML = "Delete Book"
    btn.classList.add("mdc-button", "mdc-button--outlined")
    let btnDiv = document.createElement("div");
    btnDiv.appendChild(btn);

    let btn2 = document.createElement("button")
    btn2.innerHTML = "read?"
    btn2.classList.add("mdc-button", "mdc-button--outlined")
    let btn2Div = document.createElement("div");
    btn2Div.appendChild(btn2);

    newDiv.appendChild(img);
    newDiv.appendChild(newContent);
    newDiv.appendChild(btn2Div);
    newDiv.appendChild(btnDiv);

    newDiv.setAttribute("id", myLibrary.indexOf(book))

    let grid = document.getElementById("grid");
    grid.appendChild(newDiv);

    btn.onclick = deleteBook;
    btn2.onclick = readBook;
}

function openForm() {
    document.getElementById("addBookForm").style.display = "inline";
}

function cancel() {
    document.getElementById("addBookForm").style.display = "none";
}

function closeForm() {
    document.getElementById("addBookForm").style.display = "none";
    let book = new Book(document.getElementById("Title").value,
        document.getElementById("Author").value,
        document.getElementById("Pages").value,
        document.getElementById("readyet").value);
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    addBookToScreen(book);
}

function deleteBook() {
    let inner_div = this.parentNode.parentNode;
    myLibrary.splice(parseInt(inner_div.id), 1);
    let grid = document.getElementById("grid");
    grid.removeChild(document.getElementById(inner_div.id));

    //update ids to match the new indices. TODO: Inefficient
    let new_indx = 0;
    for (let child of grid.children) {
        child.setAttribute("id", new_indx)
        new_indx += 1;
    }
}

function readBook() {
    let inner_div = this.parentNode.parentNode;
    let book = myLibrary[parseInt(inner_div.id)];
    if (book.read === "Yes") book.read = "No"
    else book.read = "Yes";
    document.getElementById(inner_div.id).querySelector("div").innerText = info(book);
}

function libToScreen() {
    for (let book of myLibrary) {
        addBookToScreen(book);
    }
}

window.onload = libToScreen;