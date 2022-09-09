//3.1.2.

/* Hoisting - a kód összes változójának "felemelése". 
Amíg az értékadásig nem érünk, addig undefined értéket ad vissza. */

// var sampleVariable = undefined;
console.log(sampleVariable)         // konzolon: undefined

var sampleVariable = 'global';
console.log(sampleVariable)         // konzolon: 'global'


//3.1.3.

var globalScope = 'global';

function sampleFunction() {
    console.log(globalScope);
}

sampleFunction();
// konzolon: global

function sampleFunction2() {
    var localScope = 'local';
    console.log(localScope);
}
// konzolon: local

function sampleFunction2() {
    var localScope = 'local';
}
console.log(localScope);
/* konzolon: Uncaught ReferenceError: localScope is not defined
változó csak a függvényen belül érhető el, utána kipucolódik a memóriából
var - function scope változó */


//3.1.4.

var globalScope2 = 'global'
function sampleFunction3() {
    var globalScope2 = 'local';
    console.log(globalScope2)
}
sampleFunction3();
console.log(globalScope2);
/* konzolon: local, alatta global
Voltaképp két különböző függvény létrehozásáról van szó. */


//3.1.5.

function sampleFunction4() {
    localVariable = 'local';
    console.log(localVariable);
}

sampleFunction4();
console.log(localVariable)
/* konzolon: local alatta local
var nélkül is létrejön a változó DE - valójában globálisan (window-ban) jön létre
Ez komoly memory leak probléma - a teljes program futása után végig a
memóriában ragad, garbagedumper nem tudja kiszedni.
MINDIG KULCSSZAVAKKAL HOZZUNK LÉTRE VÁLTOZÓKAT */

// kód elejére beírhatjuk hogy:
'use strict';

function sampleFunction4() {
    localVariable = 'local';
    console.log(localVariable);
}

sampleFunction4();
console.log(localVariable)
/* Uncaught ReferenceError: localVariable is not defined
use strict használata javasolt a problémák kiszűrésére */


// 3.1.6 - Nested scope

function outerFunction() {
    var sampleVariable2 = 1;
    console.log(sampleVariable2);

    function innerFunction1() {
        var sampleVariable2 = 2;
        console.log(sampleVariable2);

        function innerFunction2() {
            var sampleVariable2 = 3;
            console.log(sampleVariable2);
        }
        innerFunction2();
    }
    innerFunction1();
}
outerFunction();
/* konzolon egymás alatt: 1, 2, 3
Bár ugyanaz a nevük, a függvényen belül új változót jelent () */

function outerFunction() {
    var sampleVariable2 = 1;
    console.log(sampleVariable2);

    function innerFunction1() {
        console.log(sampleVariable2);

        function innerFunction2() {
            console.log(sampleVariable2);
        }
        innerFunction2();
    }
    innerFunction1();
}
outerFunction();
// konzolon egymás alatt: 1, 1, 1

function outerFunction() {
    var sampleVariable2 = 1;
    console.log(sampleVariable2);

    function innerFunction1() {
        sampleVariable2 = 2;
        console.log(sampleVariable2);

        function innerFunction2() {
            console.log(sampleVariable2);
        }
        innerFunction2();
    }
    innerFunction1();
}
outerFunction();
/* konzolon egymás alatt: 1, 2, 2
A változók látják az egyel kintebbi változót */


// 3.1.7 - let változó és Temporal Dead Zone

/* var-t ma már nemigen használjuk (2015-től ES6 szabvány: let és const) */

'use strict';

console.log(sampleVariable3);
let sampleVariable3 = 'sample';
/* konzolon: Uncaught RefenenceError: cannot access 'sampleVariable3' before 
initialization let-tel létrehozott változó nem lesz undefined kezdő értékkel 
inicializálva let csak inicializálás után elérhető! (fontos különbség var-ral 
szemben) */

var sampleVariable4 = 'sample2'
console.log(window.sampleVariable4);
console.log(window.sampleVariable3);
/* konzolon: sample2, undefined
Minden egyes var-ral létrehozott változó a window objecthez hozzá lesz kötve
és elérhető rajta keresztül. Let nem lesz hozzákötve a window globális objektumhoz.
*/

// 3.1.8 - let változó újradeklarálása

let sampleVariable5 = '1';
let sampleVariable5 = '2';
/* konzolon: Uncaught SyntaxError: Identifier 'sampleVariable5 has already been 
declared
let kulcsszóval újra deklarálás nem lehetséges 
( var még engedi, bár az sem ajánlott... ) */

// 3.1.9 - Mi is az a block scope?

/* 
var - function scope
let - block scope

block - kapcsos zárójelek közötti rész {}
*/
{
    let sampleVariable6 = 1;
    console.log(sampleVariable6);
}

console.log(sampleVariable6);
/* konzolon: 1, Uncaught ReferenceError: sampleVariable6 is not defined
változó csak a blokkon belül látszódik.
'use strict' ide vagy oda, a hibaüzenet fix - ezentúl mindig ott a kód elején */


// 3.1.10 - A let használata az if else vezérlési szerkezeten belül

let value = 1;
if (value === 1) {
    let result = true;
}
else {
    let result = false;
}
console.log(result);
/* konzolon: Uncaught ReferenceError: result is not defined
Result csak a kapcsos zárójeleken belül érhető el.
if és else is külön block-nak számít */

// Probléma megoldása: 
let value2 = 1;
let result;
if (value === 1) {
    result = true;
}
else {
    result = false;
}
console.log(result);
//konzolon: true


// 3.1.11 - A let használata a switch case vezérlési szerkezeten belül

let value3 = 1;

switch (value) {
    case 0:
        let result = 'Nulla';
        break;
    case 1:
        let result = 'Egy';
        break;
    default:
        let result = "Null"
}
/* konzolon: Uncaught SyntaxError: Identifier result has already been declared.
switch esetén a case-ek nem külön block-ok, hanem egyetlen block-nak számít */









// Probléma megoldása:
let value4 = 1;
let result2

switch (value) {
    case 0:
        result2 = 'Nulla';
        break;
    case 1:
        result2 = 'Egy';
        break;
    default:
        result2 = "Null"
}

console.log(result2);
// konzolon: Egy


// 3.1.12 - A let használata ciklusoknál

var elements = document.querySelectorAll('.click-me');
for (var i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('click', function () {
        console.log('item: ' + i)
    })
}
/* konzolon minden kattintásra 3-as választ ad
1. Még mielőtt bármit kattintanánk a függvény lefut felülről lefelé, i értékét
ezzel 3-ra növelve.
2. addEventListener ezt a 3-as értéket fogja kidobni
3. Oka: var miatt az i nem block-szintű, i bárhonnan elérhető */


// 3.1.13 - Eseményfigyelők használata cikluson belül, let nélkül

function clickHandler(i) {
    elements[i].addEventListener('click', function () {
        console.log('item: ' + i);
    })
}

var elements = document.querySelectorAll('.click-me');
for (var i = 0; i < elements.length; i += 1) {
    clickHandler(i);
}

/* Eseményfigyelő ciklusmag "kiszervezése". 
Konzolon: 0, 1 és 2 attól függően, hogy hányadik gombra kattintunk.
Nem akkor foglalkozunk az i-vel amikor már a loop lefutott, hanem
rögtön meghívunk egy függvényt aminek átadjuk az i-t paraméterként. */


// 3.1.14 - Eseményfigyelők használata cikluson belül, let használatával

var elements = document.querySelectorAll('.click-me');
for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('click', function () {
        console.log('item: ' + i)
    })
}

/* 'var i = 0' átírása 'let i = 1'-ra
let esetében minden egyes loopnál egy egy új "binding" lesz, kvázi minden egyes
esetben új i változó jön létre.

Internet Explorer 11 - let és egyéb nem támogatott, ilyesmikre figyelni kell 
kangax.github.io/compat-table/es6/
caniuse.com */











// 3.1.15 - Polyfill, transpiler

/* A polyfill egy olyan kód/kódrészlet, mely biztosítja számunkra azt a működést;
melyet natív módon elvárnánk a böngészőtől. */

console.log(String.prototype.includes);

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
    }
    if (typeof start !== 'number' || isNaN(start)) {
        start = 0;
    }
    if (typeof search !== 'string' || start + search.length > this.length) {
        return false;
    } else {
        return this.indexOf(search, start) !== -1;
    }
}

console.log('result: ', 'Borabora'.includes('bora'));

/* A transpiler-ek olyan eszközök, amelyek egy adott nyelvben írt kódot 
átalakítanak egy másik nyelv ekvivalens kódjáva. A JavaScript esetében ez nem 
feltétlenül egy másik nyelvet, hanem a szabvány egy másik verzióját jelenti. 
Akkor használjuk, ha nem csak új tulajdonságokat, metódusokat akarunk használni, 
hanem újfajta szintaxist is. 

babeljs.io */


// 3.1.16 - A const kulcsszó használata

const sampleVariable7 = 'value';
console.log(sampleVariable7)

/* const ugyanúgy block szintű, mint a let, de új érték megadása nem lehetséges
A const ún. 'immutable binding'-ot hoz létre - módosíthatatlan. */

sampleVariable7 = 'new value'
/* konzolon: Uncaught TypeError: Assignment to constant variable. */


const sampleObject = {
    firstName: 'John',
    lastName: 'Doe'
};

sampleObject.firstName = 'Jane';
console.log(sampleObject);
/* konzolon: firstName: Jane, lastName: Doe 
FONTOS! A const-hoz rendelt objektumon belüli értékek változtathatóak!

Hogyha a változó értéke a program során nem fog módosulni, akkor használjunk 
const-t, ellenkező esetben használjunk let-et. */


// 3.1.17 - Az Object.freeze()metódus használata

const user = {
    firstName: 'John',
    lastName: 'Doe'
};

Object.freeze(user);

user.firstName = 'Jane'
console.log(user)
/* konzolon: Uncaught TypeError: Cannot Assign to read only property 'firstName'
of object ...stb.
Objektum lefagyasztása után a benne lévő értékek nem módosíthatóak. 
Ha egy objektumot lefagyasztunk az utána már úgy is marad, nincs mód a
'kiolvasztásra'. */






// 3.1.18 - Memory life cycle

/*Memory life cycle

Memóriaterület..
1. ... lefoglalása - Allocata
2. ... írása/olvasása - Use
3. ... felszabadítása - Release - Garbage collection

Változó létrehozása, értékadás
1. Egyedi azonosító létrehozása
2. Memóriaterület lefoglalása
3. Érték tárolása a lefoglalt memóriaterületen.

Primitívek
number (8 byte),
string (2 byte / character),
boolean (4 byte),
undefined,
null,
symbol,
bigint */

let sampleNumber = 42;
sampleNumber = 84;

/* immutable:
új érték megadásakor az új érték egy újabb memóriaterületen fog tárolódni,
a korábbi érték pedig törlődni fog a korábbi memóriaterületről */

let newSampleNumber = sampleNumber;

/* Az értéket kiolvassa, majd átmásolja egy új memóriaterületre.
A két változó, külön életet él. Ha az egyiket módosítom, a másik változatlan. */

/* const immutable bindingot hoz létre, a reassignement nem megengedett */

const sampleArray = [1, 2, 3, 4, 5];

/* Objektum létrehozásakor a memória STACK részében voltaképp egy pointer/mutató 
tárolódik a HEAP-ben tárolt objektumra. Mert a STACK kis méretű, pici. */

const sampleArrayCopy = sampleArray;

/* STACK részben új memóriaterület a pointernek, ami a már meglévő HEAP 
memóriaterületre mutat. (Az érték nem másolódik. Objektum módosítása esetén
mindkét változó a módosított objektumot hozza fel.
Az objektumok esetén az érték egy referencia. Mindkét esetben érték
szerinti átadás történik, csak ebben az esetben az érték egy referenciát 
tartalmaz) */
