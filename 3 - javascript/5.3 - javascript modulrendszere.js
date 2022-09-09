// 5.3.2 - Az export és az import utasítás I.

/* Több ezer soros fájlok elkerülése érdekében */

// module.js fájlban:
export const sumValues = (x, y) => x + y;
export const subtractValues = (x, y) => x - y;

// app.js fájlban:
import {
  sumValues, subtractValues
} from './module.js'

// index.html fájlban
// <script type="module" src="./app.js"></script></>


// 5.3.3 - Az export és az import utasítás II.
// 5.3.4 - Modulok exportálása más néven

// index.html fájl, alternatív kapcsolás (nem ajánlott)
// <script type="module">
// import {sumValues, subtractValues} from './module.js'
// </script>

/* FONTOS! A beimportált függvények és változók, globálisan nem elérhetőek,
nem meghívhatóak 

Ha úgy próbálunk meg importálni egy függvényt, hogy azt a module fájlban nem
exportáltuk, akkor a konzolon Uncaught SyntaxError. */

// module.js fájlban:
const pi = 3.14;
export const sumValues2 = (x, y) => x + y + pi;
/* Lehetőség 'rejtett' változókra és függvényekre. */


// Alternatív exportálás, nem a deklarálásnál, hanem a fájl végén, objektumként
export {
  sumValues as sum,         // 'as' kulcsszóval más néven exportálható
  subtractValues as sub
}


// 5.3.5 - Modulok importálása más néven

import {
  sumValues as sum
} from './module.js'

console.log(sum(10, 15)) // 28.14


// 5.3.6 - Az összes modul importálása más néven

import * as MyMath from './module.js'
/* myMath egy objektum lesz, metódusokkal */

console.log(MyMath.sumValues(10, 15))        //28.14
console.log(MyMath.subtractValues(10, 15))   // -5


// 5.3.7 - A default export használata

// module.js fájlban
const person = { // Alternatívaként 'const person =' helyett 'export default'
  firstName: 'John',
  lastName: 'Doe'
};

export default person;
/* 1 fájlon belül kizárólag 1 db 'export default' lehet! */

// app.js fájlban
import person from './module.js';
/* Ha nem a fájl végén, hanem 'deklarálásként' használjuk az 'export default'-ot,
akkor az importálásnál ugyanez a kiírás azt eredményezi, hogy az itt megadott 
tetszőleges néven tudunk hivatkozni az 'export default' objektumra, 'as' 
használata nélkül is. */


// 5.3.8 - Az export és az export default utasítás együttes használata

// module.js fájlban
const age = 30;
const isDead = true;
const user = {
  firstName: 'Jane',
  lastName: 'Doe'
};

export { age, isDead };
/*
export default user;
*/

// app.js fájlban
import user, { age, isDead } from './module.js';

/* FONTOS! Előbb mindig az 'export default'-ot importáljuk. */


// ALTERNATÍV export (ez rövidebb, előző átláthatóbb)
// module.js fájlban
export const age2 = 30;
export const isDead2 = true;
/*
export default {
  firstName: 'Jane',
  lastName: 'Doe'
};
*/

/* KVÍZ

1. Minden importnak a fájl elején kell szerepelnie. Tehát nem lehet ilyen módon
feltételhez kötni.

2. Míg named export-ból akármennyi lehet, default-ból csak egy darab. Akkor
használjuk, ha az adott fájl csak egy class-t, objectet ... stb. tartalmaz. 

3. Az exportok száma nincsen korlátozva a szabvány alapján. */