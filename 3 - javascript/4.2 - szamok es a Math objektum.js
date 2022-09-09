// 4.2.2 A Number.isFinite() metódus

console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(-Infinity));
/* konzolon: false, false */

console.log(Number.isFinite(NaN));
/* konzolon: false */

console.log(Number.isFinite(0));
/* konzolon: true */

// 4.2.3 A Number.isNaN() és a globális isNan() metódus

/* eddig a globális isNan() metódust használtuk. */

console.log('--- Global isNan()---');
console.log(isNaN(true));       // false*
console.log(isNaN(12));         // false
console.log(isNaN('hello'));    // true
console.log(isNaN(NaN));        // true
console.log(isNaN('NaN'));      // true**

/* Globális isNaN() a háttérben mindig típuskonverziót végez.
* Boolean-t először számmá konvertálja, isNan() számként látja.
** Megpróbálja átkonvertálni számmá. Stringből NaN számérték lesz. */


console.log('--- Number.isNan()---');
console.log(Number.isNaN(true));       // false
console.log(Number.isNaN(12));         // false
console.log(Number.isNaN('hello'));    // false
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN('NaN'));      // false

/* Kizárólag annál lesz igaz, ahol === NaN 
Számtípusú, aminek az értéke NaN. Minden más esetben false. */


// 4.2.4 Bináris és oktális literál

const dec = 31;
const hexa = 0x1F;      // elején 0x
const bin = 0b11111;    // elején 0b
const octa = 0o37;      // elején 0o

console.log(dec, hexa, bin, octa)
/* konzolon: 31, 31, 31, 31 */


// 4.2.5 Mik a safe integer-ök?

/* A JavaScript egy szabványt használ a számok leírására és ábrázolására.
Minden szám 64 biten tárolódik a memóriában. */

console.log(Number.MAX_VALUE);
/* konzolon: 1.7976931348623157e+308 
DE! Előfordulhat, hogy két különböző szám ugyanúgy tárolódik, mind a 64 bit
megegyezik, holott két teljesen különböző számot szeretnénk tárolni. */

console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);   //-9007199254740991

/* Az a maximális érték, ahol biztos nem fordul elő, hogy két szám a memóriában 
bitre pontosan ugyanúgy van letárolva. Ez a szabvány miatt van így. */

console.log(Number.isSafeInteger(42));                  // true
console.log(Number.isSafeInteger(9007199254740991));    // true
console.log(Number.isSafeInteger(9007199254740992));    // false

/* Így ellenőrizhető, hogy megadott számmal biztos nem lesznek számolási
problémáink. */








// 4.2.6 Math.sign() metódus

/* A szám pozitív vagy negatív előjelű? */

console.log(Math.sign(10));         // 1
console.log(Math.sign(+0));         // 0
console.log(Math.sign(0));          // 0
console.log(Math.sign(-0));         // -0
console.log(Math.sign(-1000));      // -1
console.log(Math.sign(NaN));        // NaN
console.log(Math.sign(Infinity));   // 1
console.log(Math.sign(-Infinity));   // -1


// 4.2.7 A Math.trunc() metódus

/* Megadott számnak levágja a törtrészét, előjellel együtt és számot ad vissza */

console.log(Math.trunc(30.17));     // 30
console.log(Math.trunc(-30.17));    // -30
console.log(Math.trunc(0.17));      // 0
console.log(Math.trunc(-0.17));     // -0
console.log(Math.sign(Math.trunc(-0.17)));     // -0


// 4.2.8 A BigInt típus

/* A hetedik típus. Tetszőlegesen nagyméretű számokkal dolgozhatunk */

const max = Number.MAX_VALUE;
console.log(max ** 2);              // Infinity

const bigIntNumber = BigInt(max)
console.log(typeof bigIntNumber);   // bigint

console.log(bigIntNumber ** 2);
/* konzolon: Uncaught TypeError: Cannot mix BigInt and other types, 
use explicit conversions. */

console.log(bigIntNumber ** 2n);
/* konzolon: Egy iszonyatosan hosszú számsor, a végén n.
Ez az n jelenti azt, hogy egy bigInt típusú változóról van szó. */

console.log(bigIntNumber ** 20n);
/* konzolon: Egy mégiszonyatosabban hosszabb számsor, a végén n. */


/* KVÍZ

1.
A globális isNaN() loose equality-t használ, a Number.isNaN() pedig 
strict equality-t, tehát a típust is vizsgálja, nem csak az értéket.

2. 
A BigInt típusnak nincs lekorlátozva a mérete. Amíg van elég memória, 
bármekkora értéket felvehet.

3.
Mindegyik helyes megoldás volt. Alaphelyzetben 10-es számrendszerbeli számokkal 
dolgozunk, azonban a 0b, 0o, 0x előtagokkal megadott számok automatikusan a 
bináris, oktális és hexadecimális számrendszerbe fognak tartozni.
*/