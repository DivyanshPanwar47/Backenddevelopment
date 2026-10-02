// Experiment 5, Task 1: arrays, objects, functions and a small library utility.

const fruits = ['Apple', 'Banana', 'Mango'];
console.log('--- Array Demonstration ---');
console.log('Fruits array:', fruits);
fruits.push('Orange');
console.log('After push:', fruits);

const student = {
  name: 'John Doe',
  age: 20,
  course: 'Backend Development',
};

console.log('\n--- Object Demonstration ---');
console.log('Student object:', student);
console.log('Student Name:', student.name);

function greet(name) {
  return `Hello, ${name}! Welcome to Backend Development Lab.`;
}

console.log('\n--- Function Demonstration ---');
console.log(greet('Student'));

const library = [];

function addBook(title, author) {
  if (!title || !author) {
    throw new Error('Both title and author are required.');
  }

  const book = { title, author };
  library.push(book);
  return book;
}

function findBook(title) {
  return library.find((book) => book.title.toLowerCase() === title.toLowerCase());
}

addBook('The Pragmatic Programmer', 'Andrew Hunt and David Thomas');
addBook('Clean Code', 'Robert C. Martin');
console.log('\n--- Library PBL Activity ---');
console.log('Library:', library);
console.log('Found book:', findBook('Clean Code'));

if (typeof document !== 'undefined') {
  const output = document.querySelector('#library-output');
  if (output) {
    output.textContent = JSON.stringify(
      { books: library, searchResult: findBook('Clean Code') },
      null,
      2,
    );
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fruits, student, greet, library, addBook, findBook };
}
