// 6.4.2 - Aszinkron függvények írása

async function one() {
  return 1
}
console.log(one());
/* konzolon: Promise {<resolved>: 1} 
Mindig egy Promise-t ad vissza. Tehát itt voltaképp: Promise.resolve(1); */

one().then(console.log)
/* konzolon: 1 
then catch helyett, Promise-ok kezelésére egy egyszerűbb módszer*/


// 6.4.3 - Az await utasítás

async function one2() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
  const result = await promise;
  console.log(result)
}
one2()
/* konzolon: 1 
await megvárja a megadott Promise lefutását. */

// rossz példa: 
async function one3() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
  const result = await promise;
  return result;
}
console.log(one3())             // konzolon: Promise {<pending>} 

one3().then(conslole.log)       // konzolon: 1

/* await kizárólag aszinkron függvényen belül használható, sehol máshol!
Sima függvényen belül elhelyezve Syntax Error */


// 6.4.4 - Soros és párhuzamos futás

function resolve(value) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000, value * 2)
  })
}

async function serial() {
  const a = await resolve(1);
  const b = await resolve(2);
  return a + b;                                   // kb. 2000 + 2000 ms
}

async function parallel() {
  const promiseA = resolve(10);
  const promiseB = resolve(20);
  return (await promiseA) + (await promiseB);     // kb 2000ms
}

serial().then(console.log)
parallel().then(console.log)
/* konzolon 2 mp múlva: 60, újabb 2 mp múlva: 6 */














// 6.4.5 - A végrehajtási idő mérése

/* előző leckében írt kód folytatása */

function executionTime(func) {
  const start = performance.now();
  func();
  const end = performance.now();
  return end - start
}

console.log(executionTime(serial))
/* konzolon: 0.195 (ms)  (hiányzik az aszinkron kulcsszó) */

async function executionTime2(func) {
  const start = performance.now();
  await func();
  const end = performance.now();
  return end - start
}

executionTime2(serial).then(console.log)  // konzolon: 4018.66 (ms)

async function executionTime3(func) {
  const start = performance.now();
  const result = await func();
  const end = performance.now();
  console.log({
    functionName: func.name,
    executionTime: end - start,
    result
  })
}

executionTime3(serial)
/* konzolon: {functionName: 'serial', executionTime: 4017.59... result: 6 */

executionTime3(parallel)
/* konzolon: {functionName: 'parallel', executionTime: 2017.00... result: 60 */


// 6.4.6 - A fetch API használata aszinkron függvényekkel

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const result = await response.json() // json.parse-szal szemben egy Promise-t ad
    console.log(result.users)
  }
  catch (error) {
    console.error(error)
  }
}

request('./6.1 - data.json')
/* konzolon a JSON fájl tartalma 
try catch ilyenkor MINDIG kell!*/

//előző átírása 
function success(response) {
  console.log(response);
}

async function request2(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    success(result.users)
  }
  catch (error) {
    console.error(error)
  }
}

request2('./6.1 - data.json')
/* konzolon a JSON fájl tartalma */




//előző átírása 
function success(response) {
  console.log(response);
}

async function request2(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    return result.users                           // átírás
  }
  catch (error) {
    console.error(error)
  }
}

request2('./6.1 - data.json').then(console.log)   // átírás
/* konzolon a JSON fájl tartalma */


// 6.4.7 - A callback generátor-, Promise és aszinkron függvény összehasonlítása


// CALLBACK HELL
function addOneTo(number, callback) {
  let result = number + 1;
  if (callback) {
    setTimeout(function () {
      callback(result);
    }, 1000)
  }
}

addOneTo(5, function (res1) {
  addOneTo(res1, function (res2) {
    addOneTo(res2, function (res3) {
      addOneTo(res3, function (res4) {
        addOneTo(res4, function (res5) {
          console.log(res5)
        })
      })
    })
  })
})

// PRMOMISE
function addOneTo2(number) {
  let result = number + 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 1000)
  })
}

addOneTo2(5)
  .then(res1 =>
    addOneTo2(res1)
  )
  .then(res2 =>
    addOneTo2(res2)
  )
  .then(res3 =>
    addOneTo2(res3)
  )
  .then(res4 =>
    addOneTo2(res4)
  )
  .then(res5 => {
    console.log(res5)
  })

// PROMISE és GENERÁTOR - bluebird library-vel
function addOneTo3(number) {
  let result = number + 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 1000)
  })
}

Promise.coroutine(function* () {
  const res1 = yield addOneTo3(5)
  const res2 = yield addOneTo3(res1)
  const res3 = yield addOneTo3(res2)
  const res4 = yield addOneTo3(res3)
  const res5 = yield addOneTo3(res4)
  return res5
})()
  .then((result => console.log(result)))


// ASYNC - legszebb
function addOneTo4(number) {
  let result = number + 1;
  return new Promise((resolve, reject) => {
    resolve(result)
  })
}

async function main() {
  const res1 = await addOneTo4(5)
  const res2 = await addOneTo4(res1)
  const res3 = await addOneTo4(res2)
  const res4 = await addOneTo4(res3)
  const res5 = await addOneTo4(res4)
  console.log(res5)
}

main();

/* KVÍZ

1. Az await után megadtunk egy thaneble objectet, tehát egy olyan objektumot, 
amelynek van then metódusa.
Tehát az await után a thenable object then metódusa hívódik meg. Ott egy
setTImeout van, amely egy másodperc múlva meghívja a resolve-ot,
paraméterként átadva neki az age property értékének a dupláját, a 2*30-at. 
Az f függvlnyen belül ezt az értéket fogjuk kiírni.

2. Az aszinkron függvények visszatérési értéke mindig egy Promise.
Az async-await valójában csak egy egyszerűsített szintaxis a new Promise, then...
részekre */