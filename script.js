const booklist = document.getElementById('book-list');

const newTitle = document.getElementById('title');

const newAuthor = document.getElementById('author');

const addBook = document.getElementById('submit');

// Local Storage Section

if (!localStorage.getItem('bookInfo')) {
  localStorage.setItem('bookInfo', JSON.stringify([]));
}

let books;

function saveBooks(book) {
  localStorage.setItem('bookInfo', JSON.stringify(book));
}

/* eslint-disable no-use-before-define */

function displayBookData() {
  books = JSON.parse(localStorage.getItem('bookInfo'));

  updateUI();
}

displayBookData();

addBook.addEventListener('click', (e) => {
  e.preventDefault();

  if (newTitle.value && newAuthor.value) {
    const obj = { title: newTitle.value, author: newAuthor.value };

    books.push(obj);

    saveBooks(books);

    displayBookData();

    newTitle.value = '';

    newAuthor.value = '';
  }
});

function updateUI() {
  booklist.innerHTML = '';

  books.forEach((data, index) => {
    const classBook = document.createElement('div');

    classBook.classList.add('class-book');

    const titlePar = document.createElement('p');

    titlePar.textContent = `${data.title} `;

    const authorPar = document.createElement('p');

    authorPar.textContent = `${data.author}`;

    const btnRemove = document.createElement('button');

    btnRemove.textContent = 'Remove';

    btnRemove.addEventListener('click', removeBook.bind(index));

    classBook.appendChild(titlePar);

    classBook.appendChild(authorPar);

    classBook.appendChild(btnRemove);

    booklist.appendChild(classBook);
  });
}

function removeBook() {
  books.splice(this, 1);

  saveBooks(books);

  displayBookData();
}