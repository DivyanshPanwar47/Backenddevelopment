// Experiment 5, Task 2: string, array and object manipulation methods.

const text = 'Backend Development';
console.log('\n--- String Methods ---');
console.log('Original:', text);
console.log('Upper Case:', text.toUpperCase());
console.log('Lower Case:', text.toLowerCase());
console.log('Split by space:', text.split(' '));

console.log('\n--- Array Methods (Add, Read, Update) ---');
const items = ['Node', 'Express'];
items.push('MongoDB');
console.log('After Adding:', items);
console.log('First Item (Read):', items[0]);
items[0] = 'Node.js';
console.log('After Updating:', items);

console.log('\n--- Object Methods (Add, Read, Update) ---');
const user = { name: 'John', role: 'Dev' };
user.age = 25;
console.log('After Adding Key:', user);
console.log('User Name (Read):', user.name);
user.role = 'Senior Dev';
console.log('After Updating Role:', user);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { text, items, user };
}
