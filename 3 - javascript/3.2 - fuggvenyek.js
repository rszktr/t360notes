// 3.2.2 Függvény definíció

// Function definition
console.log(getGrossPriceFD(10000, 27));

function getGrossPriceFD(netPrice, vatPercent) {
    return netPrice * (1 + vatPercent / 100);
}
/* konzolon: 12700 */


// Function expression

console.log(getGrossPriceFE(10000, 27));

const getGrossPriceFE = function (netPrice, vatPercent) {
    return netPrice * (1 + vatPercent / 100);
}
/* konzolon: Cannot access 'getGrossPriceFE' before initialization */

console.log(getGrossPriceFE(10000, 27));

var getGrossPriceFE2 = function (netPrice, vatPercent) {
    return netPrice * (1 + vatPercent / 100);
}
/* konzolon: Uncaught TypeError 'getGrossPriceFE2' is not a function

var esetén a hoisting felemeli a var getGrossPriceFE2-t undefined
kezdőértékkel.

const esetén a hoisting felemeli a const getGrossPriceFE-t, viszont 
nincs inicializálva. const és let esetében azok az inicializálás/értékadás 
előtt nem elérhetőek.

Function expression-t csak akkor tudjuk használni, hogyha azt a függvényt
a deklarációs utasítás után hívjuk meg. 

Function definition-t a törzsével együtt emeli fel a hoisting. Vagyis a függvény
még a deklarációs utasítás megadása előtt is használható.  */


// 3.2.3 Callback függvények

/* Egy olyan függvény, amely paraméterként van átadva egy másik függvénynek.
Mintha azt bemásoltuk volna oda. */

const numericArray = [5435435, 4534, 4587, 78, 89, 4546, 7];

function compare(a, b) {
    return a - b;
}

numericArray.sort(compare); // Itt a compare a callback függvény

console.log(numericArray);
/* konzolon a tömb, benne a számok sorrendben.

A 'sort' metódus alapvetően stringekre van kitalálva. 
Írnunk kell egy compare függvényt. Attól függően, hogy negatív vagy pozitív az 
érték, dönti el, hogy kicserélje-e az adott két elemet. + = csere, - = marad 

higher order function = azok a függvények, amelyek más függvényekkel dolgoznak */


















// 3.2.4 Closure

/* Ha lefut egy függvényünk, akkor a Garbage Collector kitörli a felesleges 
elemeket a memóriából, mert már nincs rá szükségünk. De van lehetőség a Garbage 
Collector megakadályozására, így pl. a függvényben deklarált változóhoz is hozzá 
tudunk férni. */

function makeCounter() {
    let counter = 0;
    return function increaseCounter() {
        counter += 1;
        console.log(counter);
    }
}

const increaseCounter = makeCounter();
// A makeCounter által kiadott függvény változóba helyezése.
/* A függvény = first class type object - bármit meg tudunk csinálni vele, amit egy 
változóval. Pl.: Függvény hozzárendelése egy változóhoz. pl. a függvény lehet 
paraméter pl. a függvény lehet egy visszatérési érték is. */

increaseCounter(); // Az így létrehozott változóban lévő függvény meghívható.
// konzolon: 1

increaseCounter();
increaseCounter();
increaseCounter();
increaseCounter();
increaseCounter();
increaseCounter();
// konzolon: 6

/* A counter értéket a makeCounter lefutása után ki kellett volna pucolnia a Garbage
Collectornek, de a return-ben/visszatérési értékében van egy másik függvény, 
amiben hivatkozunk a külső (makeCounter) függvényben szereplő változóra. Így a
counter változó továbbra is a memóriában marad. */

makeCounter()() // Függvény és az általa visszaadott függvény meghívása egyszerre


// 3.2.5 Azonnal meghívott függvénykifejezés (IIFE)

// Alapeset:
function log() {
    console.log('IIFE');
}
log();

// Ez az alábbi módon egyszerűsíthető:
(function log() {
    console.log('IIFE');
})();                          // Függvény zárójelekbe helyezése és végén még () 

// Lehet anonim is. 
(function () {
    console.log('IIFE');
})();


// 3.2.6 Azonnal meghívott függvénykifejezés és a blokkok

'use strict';

(function () {
    function calculate(a, b) {
        return a + b;
    }
    console.log(calculate(1, 2));
    {
        function calculate(a, b) {
            return a * b;
        }
        console.log(calculate(2, 3));
    }
    console.log(calculate(2, 3))
})();
/* konzolon: 3, 6, 5
Mivel a szorzó függvény egy blokkon belül van.
Ha NINCS az elején use strict, akkor az eredmény 3, 6, 6 lesz, mert strict 
mód nélkül nem fog külön blokként működni. */
// 3.2.7 Blokk hatókörű függvények

{
    function calculate(a, b) {
        return a + b;
    }
    console.log(calculate(1, 2));
    {
        function calculate(a, b) {
            return a * b;
        }
        console.log(calculate(2, 3));
    }
    console.log(calculate(2, 3))
}

console.log(calculate(10, 10));

/* strict mode: 3,6,5, Uncaught ReferenceError: calculate is not defined.
calculate függvény a blokkon kívül nem elérhető.

NINCS strict mode: 3,6,5, 20 
Még egy példa, hogy miért javasolt a strict mode használata. */


// 3.2.8 Alapértelmezett paraméter

function getGrossPrice(netPrice, vatPercent, discountPercent) {
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
}

console.log(getGrossPrice());
/* konzolon: NaN 
minden paraméter undefined lesz, amely NaN */

function getGrossPrice(netPrice, vatPercent, discountPercent) {
    var netPrice = netPrice || 1000;
    var vatPercent = vatPercent || 27;
    var discountPercent = discountPercent || 5;
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
}

console.log(getGrossPrice());
/* konzolon: 1206.5
fordítás: legyen a megadott érték, vagy ha az undefined, akkor 1000 */

// Alternatív megoldás:
function getGrossPrice(netPrice = 1000, vatPercent = 27, discountPercent = 5) {
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
}

console.log(getGrossPrice());
/* konzolon: 1206.5 */

console.log(getGrossPrice(10000));
/* konzolon: 12065 
Ha csak 1 paramétert írunk be, akkor az elsőnek állítja be azt, a többi
pedig default. Olyan viszont nincs, hogy csak a második vagy csak a 
harmadik paramétert adjuk meg az előttük lévőek kihagyásával. Ilyenkor
is az első paraméterként fogja értelmezni. Vagyis a default értékes
paramétereket érdemes mindig hátrébb helyezni, a változóakat meg előre.*/


// 3.2.9 Alapértelmezett paraméter objektumok esetében

function getGrossPrice(param =
    { netPrice: 1000, vatPercent: 27, discountPercent: 5 }) {
    return param.netPrice * ((100 - param.discountPercent) / 100) * (
        1 + param.vatPercent / 100);
}

console.log(getGrossPrice());
/* konzolon: 1206.5 */

console.log(getGrossPrice({ netPrice: 10000 }));
/* konzolon: NaN 
Az objektumban csak a netPrice kapott értéket, a többi így undefined értéket
vett fel. */


function getGrossPrice({
    netPrice = 1000, vatPercent = 27, discountPercent = 5 } = {}) {
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
}
console.log(getGrossPrice({ netPrice: 10000 }));
/* konzolon: 12065
Ilyenkor ha olyan objectet adunk meg ami nem tartalmazza mind a három tulajdonságot, 
akkor a hiányzóakat az alapértelmezett objektumból fogja kiszedni. */


// 3.2.10 Az arrow functionök használata

/* Szintén a 2015-ös szabvány újdonsága */

const add = function (a, b) { return a + b };

const add2 = (a, b) => a + b;

/* A zárójelek csak akkor hagyhatóak el, ha pontosan 1 db paraméterünk van. 
Ha csak szimpla visszatérési értékünk van, akkor a kapcsos zárójelek és a return
kulcsszó elhagyható. */


// 3.2.11 Objektum mint egy arrow function visszatérési értéke

const arrowFunction1 = firstName => { };

/* implicit return érték itt undefined
Mivel csak egy paramétert adtunk meg, ezért a zárójelek nem kötelezőek. */

console.log(arrowFunction1('John'));
/* konzolon: undefined (ez egy implicit return) */


const arrowFunction2 = firstName => 'Hello' + firstName + '!';

/* Mivel egyszerű utasításunk van csak, ezért nem kell kapcsoszárójel és nem kell
return szócska. */

console.log(arrowFunction2('John'));
/* konzolon: Hello John! */

const arrowFunction3 = firstName => { 'Hello' + firstName + '!' };
/* konzolon: undefined
Ha már kapcsos zárójelünk van, akkor a return kulcsszót is ki kell tennünk */

const arrowFunction4 = firstName => { return 'Hello' + firstName + '!' };
/* konzolon: Hello John! - működik*/


const arrowFunction5 = firstName => { name: firstName };
console.log(arrowFunction3('John'));
/* konzolon: undefined
Objektumba akarjuk helyezni, de a kapcsoszárójel itt most mást jelent, 
a függvényünk egy block-ját fogják jelképezni. Úgynevezett label / címkére (name:) 
akarna ez esetben ugrani. */

// 1. megoldás: zárójelek
const arrowFunction6 = firstName => ({ name: firstName });
console.log(arrowFunction4('John'));
/* konzolon: Object, benne name: John */

// 2. megoldás: dupla kapcsoszárójelek
const arrowFunction7 = firstName => { return { name: firstName } };
console.log(arrowFunction5('John'));
/* konzolon: Object, benne name: John */


// 3.2.12 Arrow function, mint callback

const numericArray2 = [21031, 32132, 432432, 43235, 754, 1, 34];
numericArray2.sort(function (a, b) { return a - b });

numericArray2.sort((a, b) => a - b);
console.log(numericArray2);
/* konzolon: Array, benne számok emelkedő sorrendben */




// 3.2.13 Arrow function, mint metódus

/* Arrow function fontos tulajdonsága, hogy "nem bind-olja a this-t".
Ha függvényt futtatunk, akkor a this értéke automatikusan beállításra kerül.
Arrow function esetén a this a szülő this értéke lesz. */

const user = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function () {
        // egyszerűbb megadási mód, de nem arrow function: fullname()
        console.log(this.firstName, this.lastName);
    }
};

user.fullName();
/* konzolon: John Doe */


const user2 = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: () => {
        console.log(this.firstName, this.lastName);
    }
};

user2.fullName();
/* konzolon: undefined undefined

Leegyszerűsítve: A this jellemzően a meghívott metódus pont(.) előtti részére 
értendő. Avagy ha egy metódust meghívunk egy objectre, akkor a this értéke az 
object lesz. AZONBAN - ha az objectben arrow functiont használunk a metódusnál, 
akkor az arrow function nem fogja kötni a this-t az object-hez vagyis a szülő 
(jelen esetben a globális window objektum) lesz a szülő értéke. 
Tanulság: metódusonál ne használjunk arrow function. 
Metóduson belül már más a helyzet. (lásd következő lecke) */


// 3.2.14 Arrow function használata metóduson belül

const user3 = {
    firstName: 'John',
    lastName: 'Doe',
    fullName() {
        setTimeout(function () {
            console.log(this.firstName, this.lastName);

        }, 3000) // 3000 ms
    }
};

user3.fullName();
/* konzolon: undefined undefined
Azért, mert a setTimeout-on belül meghívott függvény nem a user Object-re van 
meghívva, nem a user Object-nek egy metódusa, így ilyen esetben a this a globális 
window Object lesz. 
VISZONT - tudjuk, hogy az arrow function nem bind-olja a this-t */

const user4 = {
    firstName: 'John',
    lastName: 'Doe',
    fullName() {
        setTimeout(() => {
            console.log(this.firstName, this.lastName);

        }, 3000) // 3000 ms
    }
};

user4.fullName();
/* konzolon: John Doe
Ebben az esetben az arrow function-ön belüli this ugye a szülő this értékét 
veszi fel, ami itt a user4 Object lesz. 

Összefoglalás: arrow functiont ne használjuk Object method-ként, azonban ha 
a metóduson belül másik függvényként alkalmazzuk, akkor hasznos és érdemes. */



// 3.2.15 A HEAP és a STACK memóriaterületek

console.log("Global Code.");

function one() {
    console.log('Function "one" is running!');
    two();
}

function two() {
    console.log('Function "two" is running!');
    three();
}

function three() {
    console.log('Function "three" is running!');
}

one();

/*
HEAP - objektumok tárolása
STACK - egyszerű primitívek tárolása (pontosabban: futási környezeteket, avagy
    execution contexts-eket tárol. Illetve egy LIFO tároló: Last In First Out)

globál execution context-ből meghívja one-t, aminek van egy saját execution 
context-je, benne two, aminek szintén van egy saját execution context-je... stb

execution context - tartalmaz mindent ami ahhoz szükséges, hogy a kódunk futni 
tudjon.

ezen az execution content még tárol:
lexical environment - fizikálisan a kód hol található, benne két dolog:
1. environment record - minden egyes változó függvénydeklarációt és minden egyebet
amire szükség van az ex. contexten belül.
2. reference to an outer lexical environment - referencia külső ex. contextre

A Scope valójában a Lexical Environment-eken keresztül valósul meg. 

LIFO
lefutás sorrendje - global - one - two - three
törlés sorrendje - three - two - one - global */

// chromium alapú böngészőkben HEAP mérete: 
window.performance.memory

// chromium alapú böngészőkben STACK mérete:  
let i = 0;
function inc() {
    i += 1;
    inc();
}
inc();



























// KVÍZ jegyzetek

/*
Azt a függvényt, amelyet másik függvénynek adunk át paraméterként, 
egyezményesen callback function-nek hívjuk. Azt pedig, amelyik ezzel dolgozik, 
higher-order function-nek.   

Az arrow function egy újabb szintaxis function expression létrehozására, 
illetve rendelkezik néhány speciális tulajdonsággal.   

Az IIFE (Immediately Invoked Function Expression - Azonnal Meghívott 
Függvénykifejezés) segítségével olyan függvényeket tudunk írni, amelyek 
a definiálásakor rögtön le is futnak. 

---

Az arrow function nem köti a saját this-t, ezért ne használjuk 
objektum metódusaként.

Amennyiben csak egy darab paraméter van, azt nem kötelező zárójelbe tenni.  

Arrow function esetén, akárcsak hagyományos függvényeknél, bármilyen típusú 
adat lehet visszatérési érték.

Return utasítást nem kötelező használni, lehet implicit visszatérési értékünk. 

---

A Heap egy rendezetlen nagyméretű memóriaterület, ahol az objektumok tárolódnak. 

A Stack mérete sokkal korlátozottabb, a primitívek itt tárolódnak. 

A JavaScriptben a szemétgyűjtés automatikus. A Garbage Collector munkájába 
nem tudunk közvetlenül beleavatkozni. */