// 22-08-11 - for ciklusok


// for ciklus

for (var i = 1; i < 10; i += 1) {
    console.log(i);
}
console.log(i);
/* konzolon számok 1-től 9-ig */

/* var miatt belát a függvénybe, konzolon 10 */

for (let j = 1; j < 10; j += 1) {
    console.log(j);
}
console.log(j)
/* konzolon számok 1-től 9-ig, j is undefined

let miatt a külső console log nem látja a j-t */


let e = 1;
while ( e < 10) {
    console.log(e);
    e += 1;
}
/* konzolok számok 1-től 9-ig

akkor javasolt a while, ha nem tudjuk, hogy milyen hosszú a ciklus */

// for ( ; ;) {};
// végtelen ciklus, böngészőt lefagyasztja, de amúgy szabályos

/* for ciklus felépítése 
ciklusváltozó megadása kezdőértékkel
feltétel megadása
léptetés 
kapcsos zárójeleken belül a ciklusmag */


const person = {
    firstName: 'Pablo',
    lastName: 'Picasso',
    age: 50
};


// for in - a kulcsokon megy végig
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(key);
    }
};
/* konzolon kulcsok kiírása */

for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(key, ':', person[key]);
    }
};
/* konzolon értékek kiírása */


// for of - az értékeken megy végig
for (const key of Object.keys(person)) {
    console.log(person[key]);
};


/* Object.prototype.hasOwnProperty()
Voltaképp egy vizsgálat, hogy az adott kulcs megtalálható-e az objektumban 
Boolean értéket ad vissza. */

/* Object.keys()
Tömböt ad vissza az objektumban található kulcsok neveivel */


// forEach() és map()

const array1 = ['a', 'b', 'c'];
array1.foreach(element => console.log(element));

/* konzolon: a, b, c külön sorokban

forEach - függvényt hív meg a tömb minden elemére, de önmagában nem ad 
ki semmit - másik függvényt kell ehhez meghívni */

const array2 = [1,4,9,16]
const map1 = array2.map(x => x*2);

console.log(map1);
/* konzolon: [2, 8, 18, 32] 

Új tömböt ad vissza, eredetit nem módosítja */


// Array.prototype.filter()
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction','present'];
const result = words.filter(word => word.length > 6);

console.log(result);
/* ['exuberant', 'destruction', 'present']

Azokat adja vissza, amelyek MEGFELELNEK a feltételnek, egy új tömbben.
Eredeti tömböt nem módosítja. */


// Array.reduce()

const array3 = [1,2,3,4];

const initialValue = 0;
const sumWithInitial = array3.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue // meg kell adni a kezdőértéket is
);

console.log(sumWithInitial);
/* konzolon: 10 

Számok összeadására használható.
Számot ad vissza. */


// Array.prototype.flat()

const arr1 = [0,1,2, [3,4]];
console.log(arr1.flat());
/* konzolon: [0,1,2,3,4 ] */

const arr2 = [0,1,2, [[[3,4]]]];
console.log(arr2.flat(2)); // paraméter, hogy "milyen mélységig"
/* konzolon: [0, 1, 2, Array]
Új tömböt ad vissza, megadott mélységig "kilapítva" */


// Array.prototype.flatMap()

flatMap()
/* Eredeti tömböt MÓDOSÍTJA */


// Array.from() 
console.log(Array.from('foo'));
/* konzolon: Array ["f", "o", "o"] */


console.log(Array.from([1,2,3], x => x + x));
/* konzolon: Array [2,3,6] */

/* Iterálható objektumból tömböt készít. 
querySelector nodeList-et ad vissza. Pl így lehet ebből tömböt készíteni. */


// Array.prototype.find()

const array4 = [5, 12, 8, 130, 44];
const found = array4.find(element => element > 10);
console.log(found)
/* konzolon: 12

Visszaadja az első, keresési feltételnek megfelelő elemet.
Ha nem találja = undefined */


// Array.prototype.findIndex()

const isLargeNumber = array4.find(element => element > 13);
console.log(isLargeNumber)

/* Visszaadja az első, keresési feltételnek megfelelő elem indexét.
Ha nem találja = -1 */


// Array.prototype.some()

const array5 = [1,2,3,4,5];
const even = (element) => element % 2 === 0;
console.log(array5.some(even));
/* konzolon: true

Van-e olyan elem, amelyre igaz a keresési feltétel. Boolean.
Maradékos osztást érdemes alaposan tudni. */


// Array.prototype.every()

const array6 = [1, 30, 39, 29, 10, 13];
const isBelowThresold = (currentValue) => currentValue < 40;
console.log(array6.every(isBelowThresold));
/* konzolon: true

A tömb összes elemére igaz-e a keresési feltétel. Boolean. */