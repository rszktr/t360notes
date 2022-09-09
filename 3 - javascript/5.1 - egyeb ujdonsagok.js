// 5.1.2 - A for of ciklus

const numbers = [345, 76, 24, 7682, 354];

for (let key in numbers) {
  if (numbers.hasOwnProperty(key)) {  // for in ciklus esetén MINDIG LEGYEN
    console.log(key);
  }
}
/* konzolon: kulcsok egymás alatt (0,1,2,3,4) 
Ha az értékeket írnánk ki: console.log(numbers[key]) */

for (let value of numbers) {
  console.log(value);
}
/* konzolon: az értékek egymás alatt (345,76,24,7682,354)
A 'for of' hasonlóan működik, mint a sima 'for' loop. Ha a tömb nem szekvenciális és
sok üres elem van benne, akkor a 'for of' ezeken az elemeken is végig fog menni, 
úgy mint a sima for loop. (A 'for in' csak azokat járja be, amelyekneknél a 
kulcs-érték pár nem üres. ) */

for (let key of Object.keys(numbers)) {
  console.log(key);
}
/* konzolon: kulcsok egymás alatt */


// 5.1.3 - Az Intl objektum, szövegek összehasonlítása lokalizáció szerint

const charlist = ['ä', 'a', 'z'];

const germanCollator = new Intl.Collator('de') // összehasonlítást végzi
const swedishCollator = new Intl.Collator('sv') // 

console.log(charlist.sort(germanCollator.compare))
console.log(charlist.sort(swedishCollator.compare))

/* konzolon: A két esetben a tömb karakterei, eltérő sorrendben.
'.compare' - összehasonlít két elemet, hogy az ABC-ben követik-e egymást. Értéke
1 vagy -1. 
'.sort' - sorbarendezés */


// 5.1.4 - Pénznem formázása lokalizáció szerint

const usCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const gbCurrency = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP'
});
const deCurrency = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
})

console.log(usCurrency.format(100200400.45));
console.log(gbCurrency.format(100200400.45));
console.log(deCurrency.format(100200400.45));
/* konzolon: beírt számérték az adott terület formátumában, valutaként
első paraméter: milyen nyelv.
második paraméter: Object egy (vagy több) style property-vel
format - ööö... formázza a megadott stílus szerint? */


// 5.1.5 - Dátum formázása lokalizáció szerint

const now = new Date();
console.log(new Intl.DateTimeFormat('hu-HU').format(now));
console.log(new Intl.DateTimeFormat('en-US').format(now));
/* konzolon: Az aktuális idő, magyar és amerikai írásmód szerint */


// 5.1.6 - A Symbol typus

const mySymbol = Symbol();
console.log(typeof mySymbol) // 'symbol'

const mySymbol2 = Symbol('mySymbol');
const mySymbol3 = Symbol('mySymbol');
console.log(mySymbol2 == mySymbol3)
/* konzolon: false
Symbol létrehozásakor a háttérben egy egyedi azonosító is létrejön a 
szimbólumokhoz. Tehát két symbol sosem lesz egyenlő. */

console.log(mySymbol2.toString())
/* konzolon: 'Symbol(mySymbol)' */


// 5.1.7 - A for() metódus és a globális szimbólumnyilvántartó

const id = Symbol.for('id');
console.log(id.description) // 'id'

const anotherId = Symbol.for('id');
console.log(id === anotherId); // true

/* global symbol registry - tárolja az összes szimbólumot, amit létrehoztak
globálisan. Kulcs-érték párok. Kulcsok = description-ök.

for() csak akkor hozza létre az új szimbólumot, ha a globális szinkron 
regiszterben az még nem szerepelt. 
Két szimbólum sosem lesz egyenlő egymással, azonban egy for metódussal létrehozott
szimbólum egy a metódus által visszaadott, már létező szimbólum. Tehát ugyanaz. 
*/

const nameSymbol = Symbol.for('name');
console.log(Symbol.keyFor(nameSymbol))      // 'name'
console.log(Symbol.nameSymbol.description)  // 'name'
/* '.keyFor' - global symbol registry-ben szereplő symbol kulcsa kérhető le */


// 5.1.8 - Symbol használata objektum tulajdonságaként

/* object property lehet symbol is - de rejtett, vagyis pl egy loop-ban 
nem jelenik meg */

const id2 = Symbol('id');
const person = {
  [id]: 1,              // symbol, mint object property
  firstName: 'John',
  lastName: 'Doe'
};

for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key)
  }
}
/* konzolon: firstName, lastName */

console.log(Object.getOwnPropertySymbols(person));
/* konzolon: [Symbol(id)] */
console.log(Object.getOwnPropertySymbols(person).map(symbol => person[symbol]));
/* konzolon: [1] */


// 5.1.9 - A Map objektum és a set(), get(), has() metódusai

/* kulcs-érték párok tárolására, de objektummal szemben kulcsai nem csak
stringek lehetnek, hanem másik object is */

const sampleMap = new Map();

sampleMap
  .set('foo', 123)      // kb. mint tömböknél a .push()
  .set('moo', 456)
  .set('boo', 789)

console.log(sampleMap.get('foo')); // konzolon: 123
console.log(sampleMap.has('boo')); // konzolon: true

/* Map-ben sorbarendezett módon tárolódnak */

const objKey = {
  name: 'John Doe'
};

sampleMap.set(objKey, 'dead');
console.log(sampleMap.get(objKey)) // konzolon: dead
console.log(sampleMap.has(objKey)) // konzolon: true
/* Ha sok elemhozzáadást és eltávolítást tervezünk, akkor célszerű Mapet és
object kulcsokat használni, mert teljesítmény szempontjából gyorsabb */


// 5.1.10 - A Map objektum delete(), keys() és values() metódusai

sampleMap.delete('foo');
console.log(sampleMap.size); // kb. mint tömböknél a .length()
console.log(sampleMap.keys());
/* konzolon: MapIterator {"moo", "boo", {...}} */

console.log(sampleMap.values());
/* konzolon: MapIterator {456,789, 'dead'} */

sampleMap.forEach((value, key) => console.log('key: ', key, 'value: ', value));
/* konzolon: kulcsok és értékek, páronként kiírva */

sampleMap.clear()             // Minden törlése
console.log(sampleMap.size)   // 0


// 5.1.11 - A WeakMap objektum

let key1 = {
  name: 'John Doe'
};

let key2 = {
  name: 'Jane Doe'
};

const sampleMap2 = new Map();
const sampleWeakMap = new WeakMap();

sampleMap2.set(key1, 'dead')          // key bármi lehet
sampleWeakMap.set(key2, 'dead');     // key KIZÁRÓLAG object lehet (string sem)

console.log(sampleMap2.get(key1));      // 'dead'
console.log(sampleWeakMap.get(key2));   // 'dead'

/* Azért weak, mert az objektumként megadott kulcsot csak gyenge referenciaként 
tárolja */

key1 = null;
sampleMap2.forEach((value, key) => {
  console.log(key)                      // {name: 'John Doe'}
});

key2 = null;
console.log(sampleWeakMap.get(key2));
/* konzolon: undefined
WeakMap esetén CSAK get(), set(), has(), delete() metódus lehetséges. 
Memóriaspórolásra alkalmas. */


// 5.1.12 - A Set objektum, az add(), entries(), values(), has() metódusok és a 
//          size tulajdonság

const languages = new Set();
languages
  .add('php')
  .add('python')
  .add('perl')
  .add('perl')

console.log(languages.size);          // 3 (duplikált elemek esetén is!)
console.log(languages.entries);
/* SetIterator {'php' => 'php', 'python' => 'python', 'perl' => 'perl'}
Az eredmény mint egy tömb, indexekkel ellátva.*/

console.log(languages.values);        // SetIterator {'php', 'python', 'perl'} 
console.log(languages.has('php'));    // true 


// 5.1.13 - A Set objektum delete(), clear() és next() metódusai

languages.delete('php');
console.log(languages.size)           // 2

languages.clear();
console.log(languages.size)           // 0

languages
  .add('php')
  .add('python')
  .add('perl')

const values = languages.values();      // SetIterator {'php', 'python', 'perl'} 
console.log(values.next());           // {value: 'php, done: false}
/* Kiírja a soron következő elemet és azt, hogy a végére értünk-e már az
iterátornak. */

console.log(values.next());           // {value: 'python,   done: false}
console.log(values.next());           // {value: 'perl,     done: false}
console.log(values.next());           // {value: undefined  done: true}

console.log(values.next().value)      // 'php'

/* Ha végiglépkedtünk, akkor nem kezdi előlről, vagyis az utolsó log valójában
undefined lenne, de a szemléltetés kedvéért ettől most tekintsünk el */


// 5.1.14 - WeakSet

/* A tárolt értékek CSAK object-ek lehetnek 
CSAK .add(), .get(), .has() és .delete() metódusok használhatóak */

let language = {
  name: 'perl'
};
const weakLanguages = new WeakSet();
weakLanguages.add(language);
language = null;

console.log(weakLanguages.has(language)) // false
/* FONTOS: Egy normál Set esetén is false választ kapnánk, de egy forEach-el
továbbra is el tudnánk érni az értéket! */


// 5.1.15 - Objektumok tulajdonságainak egyszerűsített megadási módja

const firstName = 'John'
const lastName = 'Doe'

const user = {
  firstName: firstName,
  lastName: lastName
}
console.log(user)           // {firstName: 'John', lastName: 'Doe'}

const user2 = {
  firstName,
  lastName
}
console.log(user)           // {firstName: 'John', lastName: 'Doe'}
/* A kulcs a változó lesz, az értéke, pedig a változó értéke. */


// 5.1.16 - Objektumok metódusainak egyszerűsített megadási módja

const user3 = {
  create: function () { },
  read: function () { },
  update: function () { },
  delete: function () { },
}

const user4 = {
  create() { },
  reade() { },
  update() { },
  delete() { }
}


// 5.1.17 - Számított tulajdonságok

const key3 = 'key'
const value3 = 'value'
const myObj = {
  [key3]: value3,
  [`computed${key3}123`]: 'computed'
};
console.log(myObj)
/* konzolon: {key: 'value', computedkey123: 'computed'}
computedkey123: "computed"
key: "value" */


// 5.1.18 - Dinamikus tulajdonságok

const keys2 = ['key1', 'key2', 'key3'];
const values2 = ['values1', 'values2', 'values3'];

const myObj2 = {
  [keys2.shift()]: values2.shift(),
  [keys2.shift()]: values2.shift(),
  [keys2.shift()]: values2.shift()
};
console.log(myObj2)
/* konzolon: {key1: 'values1', key2: 'values2', key3: 'values3'} 
.shift() helyett loop-al is megoldható. */

/* KVÍZ

1. A WeakMap csak get(), set(), has(), delete() metódusokkal rendelkezik.

2. (A Set adatszerkezetben nem lehetséges duplikált elemek elhelyezése.)

3. A person id tulajdonságát a pont operátorral nem érjük el. Használjuk a
getOwnPropertySymbols() metódust a Symbol property-k elérésére, vagy itt akár a
person[id]-t. */