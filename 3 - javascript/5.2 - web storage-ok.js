// 5.2.2. - Cookies azaz sütik

/*
limitek régen:
összesen 300, domain-enként 20 db
max 4K méretűek
rfc2109 szabvány-t

most: http://browsercookielimits.squawky.net 

Régebben: Tárolásra csak sütik áltak rendelkezésre. Más nem volt.
Ma már több lehetőség.

token - megadott user egyértelmű azonosítására szolgál. Minden szerver felé
intézett kérésnél ezt küldi, hogy tudja, melyik userről van szó.

érvényességi idő: alapértelmezetten session - böngésző bezárásáig. */

document.cookie = 'username=John Doe; expires=Sun, 01 Jan 2023 12:00:00 UTC; path=/';

// Süti törlése (érték törlése, idő kezdeti állapotra állítva)
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';


// 5.2.3 - Saját sütikezelő objektum gyártása, a setCookie() metódus megírása
// 5.2.4 - ... a getCookie() metódus megírása
// 5.2.5 - ... a checkCookie() és deleteCookie() metódus megírása

const cookieHandler = {
  setCookie(name, value, expirationDays = 365, path = '/') {
    const now = new Date();
    now.setTime(now.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = now.toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=${path}`
  },
  getCookie(name) {
    const keyValuePairs = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith(`${name}=`))
    return keyValuePairs ? keyValuePairs.split('=')[1] : '';
  },
  checkCookie(name) {
    const exists = cookieHandler.getCookie(name);
    return exists ? ture : false;
  },
  deleteCookie(name) {
    document.cookie = `${name}=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
};

cookieHandler.setCookie('username', 'Gáll Gergely');
/* Egy süti jön létre, melynél a username értéke Gáll Gergely és 1 év múlva
jár le */

cookieHandler.setCookie('job', 'mentor');
console.log(document.cookie);   // konzolon: süti tartalma egy stringként.
console.log(cookieHandler.getCookie('job'));    // mentor 
console.log(cookieHandler.checkCookie('job'));  // true

cookieHandler.deleteCookie('job')


// 5.2.6 - A localStorage és a sessionStorage

/*  
A sütikkel ellentétben ezek mérete összesen 5-10 MB lehet. 
Ezek is a kliens gépén tárolódnak.
Egyszerű kulcs-érték párok tárolására alkalmas.
Minden adatot STRING-ként tárol. (Mármint szám és objektum is adható neki, de
lekérdezésnél stringet fog visszaadni.)
Mikor? Ha nagyméretű vagy nem túl érzékeny adatokat szeretnénk tárolni.


session és localStorage szinte teljesen egyezik. 1 különbség: 
sessionStorage - a böngésző bezárásáig tárolja az adatokat
localStorage - addig tárol, míg ki nem törlik 

Egyéb lehetőségek: CacheAPI, IndexDb (ezekkel most nem foglalkozunk)
*/

localStorage.setItem('username', 'John Doe');

/* objektum tárolásának javasolt módja: */
localStorage.setItem('username', JSON.stringify({
  name: 'John Doe'
}));

console.log(localStorage.getItem('username'))
console.log(typeof localStorage.getItem('username'))
/* konzolon: {"name":"John Doe"}, string */

console.log(JSON.parse(localStorage.getItem('username')))
console.log(typeof JSON.parse(localStorage.getItem('username')))
/* konzolon: {name: 'John Doe'}, object */

console.log(localStorage.key(0))      // username
/* A tárolt elemek indexeltek és így is elérhetőek */

localStorage.removeItem('username');  // A megadott kulcsú elem törlődik
localStorage.clear                    // Mindent töröl

/* KVÍZ

1. A cookie és a localStorage megőrzi a benne tárolt adatokat, amíg mi vagy a
user ki nem törli őket. Ezzel szemben a sessionStorage, ahogyan a neve is mondja,
csak az adott sessionre, azaz munkamenetre őrzi meg a tartalmat.

2. RFC-szabvány által meghatározott a sütik maximális mérete (4KB)

3. A jelszavakat mindig sózzuk, titkosítjuk! */