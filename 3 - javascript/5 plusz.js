// Duplikálások kiszedése tömbből Set objektummal
const arr = [1, 1, 2, 2, 3, 4,];
[...new Set(arr)]


// Ha már van rajta akkor leveszi, ha nincs rajta akkor hozzáadja
classList.toggle('mystyle')

/* Map és Set objektumok használata jellemzően csak akkor, ha valamiért
nagyon spórolni kell a memóriával, vagy ugye ha valamilyen okból kifolyólag a
kulcsnak objektumnak kell lennie. */

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8]
const odd = [];
const even = []

for (let i = 0; i < arr2.length; i++) {
  if (arr2[i] % 2 === 0) {
    even.push(arr2.shift());
  } else {
    odd.push(arr2.shift());
  }
}

console.log(even, odd)
// A tömb első elemét kitörli, ezáltal a loop-ba is bezavar

// helyesen:
for (let i = 0; i < arr2.length; i++) {
  if (arr2[i] % 2 === 0) {
    even.push(arr2[i]);
  } else {
    odd.push(arr2[i]);
  }
}

// alternatív megoldás, tömb teljes lecserélése
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8]
let odd2 = []
let even2 = []

for (let i = 0; i < arr3.length; i++) {
  if (arr3[i] % 2 === 0) {
    even2 = [...even2, arr3[i]];
  } else {
    odd2 = [...odd2, arr3[i]];
  }
}


// create, read, update, delete push és hasonlóak nélkül

const store = {
  people: [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 25,
    },
    {
      id: 3,
      name: 'Johnny Boy',
      age: 13,
    },
  ]
}

export default store;

// másik people.js fájlban

import store from '.state.js'

const generateId = () => Math.max(...store.people.map(person => person.id)) + 1;

// findAll
export const findAll = () => store.people;

// create - C
export const createPerson = (person) => {
  const newPerson = { ...person, id: generateId() };
  store.people = [...store.people, newPerson]
  return newPerson
}

// findById - R
export const findPersonById = (id) => store.people.find(person => person.id === id)

// update - U
export const updatePerson = (id, updatedPerson) => {
  store.people = store.people.map(person => person.id === id
    ? { ...person, ...updatedPerson }
    : person);
  return findPersonById(id);
}

// delete - D
export const removePerson = (id) => {
  store.people = store.people.filter(person => person.id !== id);
}

// main.js fájlban

import {
  findAll,
  findPersonById,
  createPerson,
  updatePerson,
  removePerson,
} from './people.js';