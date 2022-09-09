// 6.3.2 - A generátorfüggvényekről

function* languages() {
  console.log('start')
  yield 'php';
  yield 'perl';
  yield 'ruby';
  console.log('end')
}

const generatorObject = languages();
/* A függvény így nem fog lefutni

futása bármikor szüneteltethető, bármikor újraindítható.
minden egyes kilépésnél tudunk "visszatérési értéket" adni (nem az, de hasonló) 

A generátorfüggvények visszatérési értéke mindig egy generatorObject, ami 
valójában egy iterátor. 

iterátor - olyan struktúra, amely az iteráció következő elemére mutató pointert
tartalmaz. 

iterable - olyan adatszerkezetet ír le, ami lehetőséget biztosít a belső adatok
egymás utáni elérésére */

console.log(generatorObject.next());
/* konzolon egymás alatt: start, {value: 'php', done: false}

A yield kulcsszóig fut le és a kulcsszó utáni rész fog visszatérési értékként
szerepelni. 

next mindig egy object-et ad vissza, aminek 2 property-je van. Az érték és az, 
hogy van-e még utána érték. */

console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());
/* konzolon egymás alatt: 
{value: 'perl', done: false}
{value: 'ruby', done: false}
end
{value: undefined, done: true} */


// 6.3.3 - Generátorfüggvény használata tömb bejárására

const users = [
  {
    firstName: 'József',
    lastName: 'Kiss',
    age: 18
  },
  {
    firstName: 'Péter',
    lastName: 'Horváth',
    age: 34
  },
  {
    firstName: 'Ilona',
    lastName: 'Kováts',
    age: 24
  },
  {
    firstName: 'Antal',
    lastName: 'Nagy',
    age: 66
  },
]

function* loop(arr) {
  for (const item of arr) {
    yield item
  }
}

const items = loop(users);
console.log(items.next())
/* konzolon: Object {value: {...}, done: false} 
A value itt a users tömb első objektuma. */

console.log(items.next().value)
/* konzolon: {firstName: 'Péter', lastName: 'Horváth', age 34} */


// 6.3.4 - A return() metódus

function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generatorObject2 = generatorFunction();
console.log(generatorObject2.next())
/* konzolon: {value: 1, done: false} */

function* generatorFunction2() {
  yield 1;
  return;
  yield 2;
  yield 3;
}

const generatorObject3 = generatorFunction2();
console.log(generatorObject3.next())
/* konzolon: {value: 1, done: false} (újraindítottuk az oldalt) */

console.log(generatorObject3.next())
console.log(generatorObject3.next())
/* konzolon 2x egymás alatt: {value: undefined, done: true}
return kulcsszó esetén a függvény futása befejeződik. */

function* generatorFunction3() {
  yield 1;
  return 'end';
  yield 2;
  yield 3;
}

const generatorObject4 = generatorFunction3();
console.log(generatorObject4.next())
console.log(generatorObject4.next())
console.log(generatorObject4.next())
/* konzolon: (újraindítottuk az oldalt)
{value: 1, done: false}
{value: 'end', done: true}
{value: undefined, done: true} */


console.log(generatorObject2.next())
generatorObject2.return()
console.log(generatorObject2.next())
/* konzolon: 
{value: 1, done: false}
{value: undefined, done: true} */

console.log(generatorObject2.next())
console.log(generatorObject2.return())
console.log(generatorObject2.next())
/* konzolon: 
{value: 1, done: false}
{value: undefined, done: true} 
{value: undefined, done: true} */

console.log(generatorObject2.next())
console.log(generatorObject2.return('new end'))
console.log(generatorObject2.next())
/* konzolon:
{value: 1, done: false}
{value: 'new end', done: true}
{value: undefined, done: true} */


// 6.3.5 - A throw() metódus

function* generatorFunction4() {
  try {
    yield 1;
  } catch (error) {
    console.error(error);
  }
  yield 2;
  yield 3;
}

const generatorObject5 = generatorFunction4();
console.log(generatorObject5.next());
/* konzolon:  {value: 1, done: false} */

console.log(generatorObject5.throw(new Error('Custom error')));
console.log(generatorObject5.next());
/* konzolon egymás alatt (oldal újratöltése után):
{value: 1, done: false}
Error: Custom error hibaüzenet
{value: 2, done: false} 
{value: 3, done: false} */

function* generatorFunction5() {
  yield 1;
  yield 2;
  yield 3;
}

const generatorObject6 = generatorFunction5();
console.log(generatorObject5.next());
console.log(generatorObject6.throw(new Error('Custom error')));
console.log(generatorObject6.next());
console.log('end')
/* konzolon:  
{value: 1, done: false} 
Uncaught Error: Custom error hibaüzenet 
És a kód elakad (lásd: nem íródott ki az end a konzolra*/


// 6.3.6 - A yield* utasítás

function* first() {
  yield 1;
  yield 2;
}

function* second() {
  yield* first();
  yield 3;
  yield 4;
  yield 5;
}

for (const value of second()) {
  console.log(value);
}
/* konzolon egymás alatt: 1,2,3,4,5
Ebben az esetben előbb a first() generátorfüggvényen lépked végig. */


// 6.3.7 - Egyedi azonosító és Fibonacci-sorozat generálása generátorfüggvények
//         segítségével

function* idGenerator() {
  let id = 0;
  while (true) { // végtelen generátor lehetősége, de mivel egyesével halad nem gond
    yield id++;
  }
}

const id = idGenerator();
console.log(id.next());
/* konzolon: {value: 1, done: false} */

console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
/* konzolon egymás alatt: 
{value: 2, done: false} 
{value: 3, done: false} 
{value: 4, done: false} 
{value: 5, done: false} */


function* fibonacci(current, next) {
  while (true) {
    next = next + current;
    current = next - current;
    yield next;
  }
}

const fibo = fibonacci(1, 1);
console.log(fibo.next());
console.log(fibo.next());
console.log(fibo.next());
/* konzolon egymás alatt:
{value: 2, done: false} 
{value: 3, done: false} 
{value: 5, done: false} 
{value: 8, done: false} 
{value: 13, done: false} 
{value: 21, done: false} */


// 6.3.8 - Python-szerű range ciklus készítése generátorfüggvénnyel

function* range(start, end, step) {
  while (start <= end) {
    yield start;
    start += step;
  }
}

for (const value of range(10, 200, 3)) {
  console.log(value);
}
/* konzolon egymás alatt a számok hármasával léptetve 10-től 200-ig */


const hashtagPattern = /#\w+/g;
const text = 'This is a #sample text which #contains a few #specific #hashtags.'

function* searchHashtags(text) {
  let match;
  do {
    match = hashtagPattern.exec(text);
    if (match) {
      yield match[0];
    }
  } while (match)
}

for (const hashtag of searchHashtags) {
  console.log(hashtag);
}

/* konzolon egymás alatt: #sample, #contains, #specific, #hashtags */


// 6.3.9 - Több Ajax-hívás kezelése generátorfüggvénnyel

const urls = ['./6.1 - data.json', './6.3 - data.json']

function responseHandler(gen) {
  const result = gen.next();
  const {
    done,
    value
  } = result;
  if (done) {
    value
      .then((data) => data.json())
      .then((user) => console.log(user))
      .catch((error) => console.error(error))
    responseHandler(gen);
  }
}

function* main() {
  for (const url of urls) {
    yield fetch(url);
  }
}

const myGenerator = main();
console.log(myGenerator.next())
/* konzolon a két json fájl tartalma egymás alatt, object-ként */


/* KVÍZ

1. Meg lehet adni generátorfüggvényen belül a yield után értéknek egy másik
generátorfüggvény-hívás értékét: igaz, hiszen a yield* pont erre szolgál

A hibakezelést mindig a generátorfüggvényen kívül kell megvalósítanunk, az
nem tartalmazhat try...catch blokkot: hamis, példát is láthattunk a használatára

Generátorfüggvényen belül a return használata esetén mindig hibát kapunk:
nem kapunk hibát, egyszerűen a next() metódushívásnál nem lesz ott return 
utáni érték

Generátorfüggvényeket kombinálhatunk Promise-okkal: természetesen, erre is 
láthattunk példát. Több fetch kérést küldünk el a kettő kombinálásával.

2. A visszatérési érték egy olyan object, ahol a done property értéke true, ha a
függvény befejezett, egyébként false, a value property értéke pedig a yield 
utáni érték. */