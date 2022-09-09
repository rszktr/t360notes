// Olyan objektumok, melyek egy aszinkron művelet állapotát hordozzák magukban.

// 6.1.2 - Promise objektumok létrehozása, a then() metódus

/* 'callback hell' / spagettikód elkerülésére 

A Promise-nak 4 állapota lehet:
pending - amíg fut
fulfilled - sikeresen lefutott
rejected - sikertelenül lefutott
settled - amikor lefutott - akár sikeresen, akár sikertelenül */

const samplePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise is fulfilled')
  }, 3000)
});

samplePromise.then((data) => console.log(data))
/* akkor hívódik meg, ha a samplePromise sikeres, resolve értékét kapja meg, ami
ugye az első paraméter. 
A then is egy promise-t fog visszaadni */


// 6.1.3 - A then() metódus paraméterei

const samplePromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (true) {
      resolve('Promise is fulfilled')
    }
    else {
      reject('Promise error') // Alternatíva: (new Error('Promise error'))
    }
  }, 3000)
});

samplePromise2.then(
  (data) => console.log(data),        // 1. paraméter - sikeres működés (resolve)
  (error) => console.error(error)     // 2. paraméter - sikertelen működés (reject)
)


// 6.1.4 - A catch() metódus használata

/* Az előző .then() metódus átszerkesztése, 2. paraméter helyett + .catch() */
samplePromise2
  .then((data) => console.log(data))
  .catch((error) => console.error(error))

/* több then-catch águnk lehet, erre nincs számbéli korlátozás */


// 6.1.5 - A finally() metódus használata

const samplePromise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 11);
    if (randomNumber > 5) {
      resolve('Promise is fulfilled')
    }
    else {
      reject('Promise error') // Alternatíva: (new Error('Promise error'))
    }
  }, 3000)
});

samplePromise3
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .finally(() => console.log('Settled'))

/* Minden esetben lefut. Ha sikeres, ha sikertelen */







// 6.1.6 - Több then() használata

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 33
  },
  {
    firstName: 'Gábor',
    lastName: 'Kiss',
    age: 41
  },
  {
    firstName: 'Ilona',
    lastName: 'Nagy',
    age: 56
  }
];

function findUserByAge(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.age === age);
      if (user) {
        resolve(user);
      }
      else {
        reject(Error('Data not found'))
      }
    }, 0)
  })
}

findUserByAge(33)
  .then((user) => {
    user.firstName = user.firstName.toLocaleUpperCase();
    return user
  })
  .then((user) => {
    console.log(user)
  })
  .catch((error) => {
    console.error(error)
  })

/* konzolon: {firstName: 'JOHN', lastName: 'Doe', age: 33}
Az 1. then() átalakította, a következő then() pedig az átalakítottat kiírta. */


// 6.1.7 - Promise-ok láncolása

new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000)
})
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 2000)
    })
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 3000)
    })
  })
  .then((result) => {
    console.log(result);
  })

/* konzolon: (1mp után) 1, (még 2 mp után) 2, (még 3 mp után) 3 */


// 6.1.8 - Az all() metódus bemutatása

/* Egyszerre több aszinkron művelet, de nem tudjuk melyiknek mennyi időre van
szüksége - várják meg egymást. Csak akkor fussanak le, ha mindegyik Promise
fulfilled */

const cat = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      sound: 'mao',
      loyal: false
    }, 3000)
  })
})

const dog = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      sound: 'vau',
      loyal: true
    }, 6000)
  })
})

Promise
  .all([cat, dog])
  .then((results) => {
    const [cat, dog] = results;
    console.log(cat, dog)
  })
  .catch((error) => {
    console.error(error)
  })
/* konzolon: A 2 objektum egymás mellett.
{sound: 'mao', loyal: false} {sound: 'vau', loyal: true} */


// 6.1.9 - Az allSettled() metódus bemutatása

/* Akkor is lefut, ha bármelyik hibába akad */

const dog2 = new Promise((resolve, reject) => {
  reject('Promise error')
})

Promise
  .all([cat, dog2])
  .then((results) => {
    const [cat, dog] = results;
    console.log(cat, dog)
  })
  .catch((error) => {
    console.error(error)
  })
/* konzolon: Hibaüzenet - Promise error */

Promise
  .allSettled([cat, dog2])
  .then((results) => {
    const [cat, dog] = results;
    console.log(cat, dog)
  })
  .catch((error) => {
    console.error(error)
  })
/* konzolon: 2 objektum.
{status: fulfilled, value: {sound: 'mao', loyal: false}} 
{status: 'rejected', reason: 'Promise error'} */


















// 6.1.10 - A race() metódus bemutatása

/* Promise példa: valamire szükségünk van, árajánlatot kérünk be különböző 
helyekről. Megvárjuk míg mind beérkezik és kiválasztjuk a legkedvezőbbet.

Promise.race() példa: Ahogy az első árajánlat beérkezik, azt rögtön elfogadjuk. */

const promises = [
  new Promise((resolve, reject) => setTimeout(resolve, 3000, '3000 HUF')),
  new Promise((resolve, reject) => setTimeout(resolve, 2000, '2000 HUF')),
  new Promise((resolve, reject) => setTimeout(resolve, 1000, '1000 HUF')),
  new Promise((resolve, reject) => setTimeout(resolve, 4000, '4000 HUF'))
]

Promise
  .race(promises)
  .then(console.log)    // 1000 HUF

Promise
  .all(promises)
  .then(console.log)      // (4) ['3000 HUF', '2000 HUF', '1000 HUF', '4000 HUF']


// 6.1.11 - Mi is az a thenable objektum

const thenable = {
  age: 30,
  then(resolve, reject) {
    setTimeout(() => resolve(this.age * 2), 1000)
  }
};

Promise
  .resolve('Success')
  .then((result) => {
    console.log(result)
    return thenable;
  })
  .then((value) => console.log(value))

/* konzolon egymás alatt: Success, 60
thenable object - olyan objektum, aminek van then() metódusa. Ha az objektumot
meghívjuk változóként, akkor voltaképp a then metódusát fogja lefuttatni.*/


// 6.1.12 - A fetch API alapjai

/* Régi módszer XMLHttpRequest*/
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function callback(result) {
  const users = JSON.parse(result);
  console.log(users.users)
}

request('./6.1 - data.json', callback)

/* Ugyanez csak fetch-csel */
const result = fetch('./6.1 - data.json')   // Promise-t fog visszaadni
result
  .then(() => data.json())                  // Szintén Promise-t fog visszaadni
  .then((data) => console.log(data.users))
/* konzolon json fájlban megadott, objektumokat tartalmazó tömb. */








// 6.1.13 - Opciók megadása fetch használatánál

/* Egyik megadási mód - Object */
const fetchHeaders = new Headers({
  'Content-Type': 'application/json'
});

/* Másik megadási mód - Array */
const fetchHeaders2 = new Headers([
  ['Content-Type', 'application/json']
]);


const fetchOptions = {
  method: 'GET',
  headers: fetchHeaders,  // példa, hogy kiszervezhető
  mode: 'cors',
  cache: 'no-cache'
}

const result2 = fetch('./6.1 - data.json', fetchOptions)
result
  .then(() => data.json())
  .then((data) => console.log(data.users))

/* KVÍZ

1. Mit hivatott felváltani a fetch API? - XMLHttpRequestet

2. A Promise az alábbi állapotokkal rendelkezhet: pending, fulfilled, rejected,
illetve settled, ha fulfilled vagy rejected, de nem pending. 

3. Az első thenben nagybetűssé alakítjuk az 'ok' string-et. A második then-ben
ezt kiírjuk a konzolra és továbbadjuk. A harmadik then callback function-je a
console.log, amely automatikusan megkapja a string-et, tehát felesleges ezt
írnunk: data => console.log(data) */