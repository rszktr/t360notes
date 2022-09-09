// 4.4.2 - Date objektum létrehozása

const dateNow = new Date() // Date object létrehozásánál mindig kötelező a 'new'

console.log(Date);
/* konzolon: az aktuális idő date string-ben
pl.: Fri Nov 15 2019 15:16:25 GMT+0100 (közép-európai téli idő) */

const date1 = new Date('October 8, 2019 11:50:10');
console.log(date1);
/* konzolon: Tue Oct 08 2019 11:50:10 GMT+0200 (közép-európai nyári idő) */

const date2 = new Date('2019-10-08T11:50:10'); // FONTOS! Nagy T betű!!
console.log(date2);
/* konzolon: Tue Oct 08 2019 11:50:10 GMT+0200 (közép-európai nyári idő) */

const date3 = new Date(2019, 9, 8, 11, 50, 10, 555); // utolsó a ms
console.log(date3);
/* konzolon: Tue Oct 08 2019 11:50:10 GMT+0200 (közép-európai nyári idő) 
FONTOS! Hónap esetén 0-val kezdődik, szóval 9 = 10. hónap = október

Kiíratásnál ms nem látszódik, de attól még megadható. 

A 'new' szó kiírása azért fontos, mert akkor Date object készül, amelyre
metódusok hívhatóak. */

console.log(dateNow.toJSON());
/* konzolon: aktuális idő JSON string formátumban 
pl.: 2019-11-15T14:20:48.246Z
ms értéket is kiírja. Z a közép-európai téli időt takarja. */

const dateString = Date();
console.log(dateString);
// console.log(dateString.toJSON());
/* konzolon: 
Fri Nov 15 2019 15:16:25 GMT+0100 (közép-európai téli idő) 
Uncaught TypyeError: dateString.toJSON is not a function */

console.log(typeof dateString);
/* konzolon: string
A dateString a 'new' kulcsszó nélkül nem objektum, hanem egyszerű string, 
aminek nincs toJSON metódusa, így azt nem is lehet meghívni.*/


// 4.4.3 - Date metódusok

console.log(dateNow.toDateString());
/* konzolon: Az aktuális dátum string formátumban pl.: Fri Nov 15 2019
Csak a dátumot adja vissza, az időt nem. */

console.log(dateNow.toLocaleDateString('hu'));
/* konzolon: Az aktuális dátum magyar írásmódnak megfelelő kiírása
pl.: 'hu' paraméter esetén 2019. 11. 15.
     'it' paraméter esetén 15/11/2019 */

console.log(dateNow.toTimeString());
/* konzolon: Az aktuális idő string formátumban 
pl.: 12:42:24 GMT+0100 (közép-európai téli idő) */

console.log(dateNow.toLocaleTimeString('hu'));
/* konzolon: 'hu' paraméter esetén 12:42:24 
             'en' paraméter esetén 12:42:24 PM */

console.log(dateNow.toJSON());
/* konzolon: Aktuális idő JSON string formátumban
pl.: 2019-11-15T11:42:24.592Z */

console.log(Date.now());    // ! nagy D betűvel
/* konzolon: 1970.01.01 óta eltelt idő ms-ban. pl.: 1573818281067*/

console.log(Date.now() / 1000 / 60 / 60 / 24 / 365);
/* konzolon: 49.90545183916793 
(Vagyis ennyi év telt el 1970.01.01 óta) */

console.log(Date.now() / 1000 / 60 / 60 / 24);
/* konzolon: 18215.49008702546
(Vagyis ennyi nap telt el 1970.01.01 óta) */



// 4.4.4 - A get... metódusok

/* Pl.: Aktuális idő: 2019.11.15. Péntek 12:53 */

console.log('year: ', dateNow.getFullYear());               // 2019
console.log('month: ', dateNow.getMonth());                 // 10 (!)
console.log('day of the week: ', dateNow.getDay());         // 5
console.log('day of the month: ', dateNow.getDate());       // 15
console.log('hours: ', dateNow.getHours());                 // 12
console.log('minutes: ', dateNow.getMinutes());             // 53
console.log('seconds: ', dateNow.getSeconds());             // 31
console.log('miliseconds: ', dateNow.getMilliseconds());    // 724


// 4.4.5 - A getUTC... metódusok

console.log('UTC year: ', dateNow.getUTCFullYear());               // 2019
console.log('UTC month: ', dateNow.getUTCMonth());                 // 10 (!)
console.log('UTC day of the week: ', dateNow.getUTCDay());         // 5
console.log('UTC day of the month: ', dateNow.getUTCDate());       // 15
console.log('UTC hours: ', dateNow.getUTCHours());                 // 11
console.log('UTC minutes: ', dateNow.getUTCMinutes());             // 53
console.log('UTC seconds: ', dateNow.getUTCSeconds());             // 31
console.log('UTC miliseconds: ', dateNow.getUTCMilliseconds());    // 724

/* Hasznos, mert így globálisan egyezményes időt kapunk*/


// 4.4.6 - A set... metódusok

const myDate = new Date();
myDate.setFullYear(2024);
myDate.setMonth(10);
myDate.setDate(10);
myDate.setHours(10);
myDate.setMinutes(10);
myDate.setSeconds(10);
myDate.setMilliseconds(10);
console.log(myDate);
/* konzolon: Sun Nov 10 2024 10:10:10 GMT+0100 (közép-európai téli idő) 
Ezeknek is van UTC megfelelője. Használatát lásd előző leckében. */


// 4.4.7 - Példafeladat

/* Szituáció: A felhasználó túl sokat próbálkozott jelszómegadással, 
így a fiókra időzár kerül, a felhasználót egy pár órára felfüggesztik. */

function isSuspended(suspendTimeInHours, whenSuspended) {
    if (!whenSuspended) {
        return false;
    }
    const now = new Date();
    const elapsedTimeInHours = (
        now.getTime() - whenSuspended.getTime()) / 1000 / 60 / 60;
    return !(elapsedTimeInHours > suspendTimeInHours);
}

/* pl.: Aktuális idő: 2022-08-17 22:22*/

console.log(isSuspended(12));                                   // false
console.log(isSuspended(12, new Date('2022-08-17T17:17:17')));  // true
console.log(isSuspended(12, new Date('2022-08-16T17:17:17')));  // false

/* KVÍZ

1. 
Mivel a hónapok 0-tól kezdődően számozódnak (mint a tömbindexek), az 1 a 
február hónapot jelöli.
A második egyes a nap száma, az 1-től számozódik.

2.
Az .UTC() metódus az 1970. január 1-je óta eltelt időt adja vissza
ezredmásodpercben.

3.
Trükkös volt. A január 1-et módosítjuk. A napszámot 32-re állítottam. Ugyan
januárban nincs 32. nap, azonban ez nem probléma, mert ilyen esetben 
automatikusan ugrik a következő dátumra. Tehát januárban 31 nap van, 
plusz egy az február 1. */