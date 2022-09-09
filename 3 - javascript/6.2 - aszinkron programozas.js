// 6.2.2 - Event Loop és Task Queue
/* Javascript alapvetően egyszálú, mindig egy szál van. */

console.log('start')
setTimeout(() => console.log(0), 0);
setTimeout(() => console.log(1000), 1000);
console.log('end')
/* konzolon egymás alatt: start, end, 0, 1000
Hiába 0 az idő, így is később fut le. Miért?

Event loop -
1. Függvények sorban lefutnak a Stack-ben
2. Bizonyos függvények átadásra kerülnek a böngészőnek, a program továbbfut
3. Program végigfut, most jönnek a böngészőnek átadott függvények
4. Böngésző, aszinkron callback függvényei a Task Queue-be kerülnek
5. Stack kiürülése után a Task Queue callback függvényei bekerülnek a Stack-be
4. Újrakezdés

Milyen típusú függvényeket érint? pl.: ajaxRequest(), setTimeout(), DOMevent()

Ha a szinkron művelet lefutása 10 másodpercig tart a Stack-ben, akkor a rövidebb
időre állított aszinkron műveletek is csak ezután tudnak majd lefutni */


// 6.2.3 - A setTimeout() és egyéb aszinkron műveletek

setTimeout(console.log(1000, '1000'));
setTimeout(console.log(999, '999'));
/* konzolon egymás alatt: 999, 1000 */

setTimeout(console.log(1, '1'));
setTimeout(console.log(0, '0'));
/* konzolon egymás alatt: 1000, 0 
A két függvény meghívása között több mint 1 ms telik el, így hiába adtunk meg 
nagyobb számot, meg fogja előzni */

setTimeout(console.log(1000, '1000'));

for (let i = 0; i < 5000; i++) {
  console.log(i)
}

setTimeout(console.log(0, '0'));
/* konzolon egymás alatt: Számok 0-tól 4999-ig, majd 0 és 1 
for loop tovább tart mint egy másodperc. Addig a második setTimeout a Stack-ben
áll és csak a for loop után kerül át a böngészőbe. */


// 6.2.4 - Az XMLHttpRequest aszinkron művelet

let result;

function request(method, url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(xhr.responseText);
    }
  }
  xhr.open(method, url, true);
  xhr.send();
}

request('GET', './6.1 - data.json')
console.log(result)
/* konzolon: undefined 
Mivel a result-ot úgy akarjuk kiíratni, hogy még nem kapott értéket.
Elképzelhető, hogy olyan gyorsan fut a kód, hogy megkapja mégis, de nem biztos */












function callBack(response) {
  const result = JSON.parse(response.responseText);
  console.log(result)
}

function request2(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr)
    }
  }
  xhr.open(method, url, true);
  xhr.send();
}

request2('GET', './6.1 - data.json', callBack)
console.log(result)
/* konzolon a json fájl tartalma */


// 6.2.5 - Szinkron callback hell

function one(args, callback) {
  console.log('one', args);
  callback()
}

function two(args, callback) {
  console.log('two', args);
  callback()
}

function three(args, callback) {
  console.log('three', args);
  callback()
}

function four(args, callback) {
  console.log('four', args);
  callback()
}

function five(args, callback) {
  console.log('five', args);
  callback()
}

one(1, function () {
  two(2, function () {
    three(3, function () {
      four(4, function () {
        five(5, function () {
          // ... stb
        });
      });
    });
  });
});





















// Helyes megoldás:

function one2(args) {
  console.log('one', args)
}
function two2(args) {
  console.log('two', args)
}
function three2(args) {
  console.log('three', args)
}
function four2(args) {
  console.log('four', args)
}
function five2(args) {
  console.log('five', args)
}

function caller() {
  one2(1);
  two2(2);
  three2(3);
  four2(4);
  five2(5)
}

caller();


// 6.2.6 - Aszinkron callback hell

function one3(args, callback) {
  setTimeout(function () {
    callback();
    console.log(args * 1);
  }, 1000)
}

function two3(args, callback) {
  setTimeout(function () {
    callback();
    console.log(args * 2);
  }, 10000)
}

function three3(args, callback) {
  setTimeout(function () {
    callback();
    console.log(args * 3);
  }, 3000)
}

function four3(args, callback) {
  setTimeout(function () {
    callback();
    console.log(args * 4);
  }, 5000)
}

function five3(args, callback) {
  setTimeout(function () {
    callback();
    console.log(args * 5);
  }, 1000)
}

one3(1, function () {
  two3(2, function () {
    three3(3, function () {
      four3(4, function () {
        five3(5);
      });
    });
  });
});
// Aszinkron működésnél ez volt a bevett írásmód... így jobb híján megengedett

function one4(args) {
  setTimeout(function () {
    return args * 1
  }, 1000)
}

function two4(args) {
  setTimeout(function () {
    return args * 2
  }, 10000)
}

function three4(args) {
  setTimeout(function () {
    return args * 3
  }, 3000)
}

function four4(args) {
  setTimeout(function () {
    return args * 4
  }, 5000)
}

function five4(args) {
  setTimeout(function () {
    return args * 5
  }, 1000)
}

function caller2() {
  let result1 = one4(1);
  let result2 = two4(result1);
  let result3 = three4(result2);
  let result4 = four4(result3);
  let result5 = five4(result4)
  console.log(result5);
}

caller()
/* konzolon: undefined
Aszinkron függvényekre ez nem jó megoldás. */


// 6.2.7 - Microtask Queue

const btn = document.querySelector('.click-me');
btn.addEventListener('click', () => {
  console.log('Listener 1')

  setTimeout(() => {   // alternatív: setTimeout(console.log, 0, 'SetTimeout 1')
    console.log('setTimeout 1')
  }, 0)

  Promise
    .resolve('Promise 1')
    .then(console.log)

  Promise
    .resolve('Promise 1.5')
    .then(console.log)
})

btn.addEventListener('click', () => {
  console.log('Listener 2')

  setTimeout(console.log, 0, 'SetTimeout 2')

  Promise
    .resolve('Promise 2')
    .then(console.log)
})

/* konzolon egymás alatt:
Listener 1
Promise 1
Promise 1.5
Listener 2
Promise 2
setTimeout 1
setTimeout 2 

Miért? 
1. Callback lefut. 
2. setTimeout kikerül a böngészőbe 
3. Promise szintén kikerül a böngészőbe 
4. Promise és ScriptJobs egy másik ún. Microtask Queue-be kerül, ami 
prioritást élvez és megelőzi a Task Queue-ben található egyéb feladatokat 

Ajánlott videó: Philip Roberts: What the heck is the event loop anyway */


/* KVÍZ

1. Először sorrendben a 2 szinkron utasítás: start, end
Utána a két callback, jelen esetben elsőnek a 0, mert itt sokkal kisebb volt a delay
(ha csak az előtte lévő console.log('end') művelet lefuttatása nem tart egy 
másodpercig, és nem fog), mint az 1000-es párjánál, amely a legvégén fog 
csak lefutni. 

2. Először lefut a szinkron kód, utána a microtask queue-ben lévő 2 Promise,
tehát Promise1, Promise 2, és a végén a task queue-ben lévő timeout callback-je.

3. Függvény, amely paraméterként kap egy függvényt, amely paraméterként kap egy
függvényt, amely... 
Callback hell. Callback-nek hívjuk azt a függvényt, amelyet paraméterként adunk
át egy másik függvénynek. Ebből van sok egymásba ágyazva. Pokoli nehéz átlátni
egy idő után. */
