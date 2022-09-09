// 3.3.2 - A forEach() metódus használata

/* eddig: procedurális programozási paradigmák (lépésenként írtuk
meg, hogy mit csináljon a programunk.) például: */

const numericArray = [412, 764, 9328, 431, 12, 4, 632];
for (let i = 0; i < numericArray.length; i++) {
    console.log(numericArray[i]);
}

/* funkcionális / deklaratív programozás - rekurziók (függvényhívások használata) 
1. lényegesen rövidebb kódokat tesz lehetővé
2. 2015 óta nagyon felkapták */

const numericArray2 = [412, 764, 9328, 431, 12, 4, 632];
for (let i = 0; i < numericArray.length; i++) {
    console.log(numericArray[i]);
}

/* Minden tömbnek van forEach metódusa. A forEach egy függvény, ami meghív egy 
függvényt a tömbünk minden egyes elemére. Pl.: megadható egy callback function 
paraméternek (el is várja), a callback pedig egyesével megkapja a tömb elemeit. */

numericArray.forEach(function (item) {
    console.log(item);
});
/* konzolon: számok a tömbön belüli sorrendben */

//Alternatív leírás arrow function-nel 

numericArray.forEach(item => console.log(item));
/* konzolon: számok a tömbön belüli sorrendben */


// 3.3.3 - A map() metódus használata

/* A map metódussal valamilyen műveletet végezhetünk a tömb elemeken.
FONTOS - a map visszatérési értéke egy új tömb. 
A mapnek lehet másik paramétere is: */

const numericArray3 = [11, 22, 33, 44, 55];
const exponentArray = numericArray.map(item => item ** 2);
console.log(exponentArray);
/* konzolon: egy tömb, benne a hatványozott számokkal */

console.log(numericArray3.map((item, index) => item * index));
/* konzolon: 0, 22, 66, 132, 220
(11*0, 22*1, 33*2, 44*3, 55*6.) */


// 3.3.4 - A filter() metódus használata

/* Bizonyos feltételnek megfelelő elemek kiszűrésére, tömbből. */

numericArray3 = [11, 22, 33, 44, 55];
const evenArray = numericArray3.filter(item => item % 2 === 0);
/* konzolon: egy tömb, benne 22, 44 */


// 3.3.5 - A reduce() metódus használata

/* Tömb értékeinek leredukálása, hogy pontosan egy érték legyen a kimenetel. 
2 paraméter: previousValue, currentValue */

numericArray3 = [11, 22, 33, 44, 55];
const sumOfArray = numericArray3.reduce((previousValue, currentValue) =>
    previousValue + currentValue);
/* konzolon: 165 */












// 3.3.6 - A funkcionális programozás alapjai

/* A price-list ID-jű listán belül azon elemek, amelyek rendelkeznek data-price
attribútummal. */
const dataPrice0 = document.querySelectorAll('#price-list li[data-price]')
/* Eredmény: NodeList(5) 

FONTOS: A NodeList NEM tömb. Szóval ebből tömböt kell csinálnunk. */

const dataPrice = Array.from(document.querySelectorAll(
    '#price-list li[data-price]'));
/* Eredmény: (5) [li, li, li, li, li] */
/* Szűrés (filter) azon elemekre, amelyek szövegükben (textContent) tartalmazzák
a 'Monitor' kifejezést. */
const monitors = dataPrice.filter(item => item.textContent.includes('Monitor'));


/* dataPrice értékeinek megfelelő formátumra alakítása. (Első pont karakterek
kitörlése, tizedesvesszők ponttá alakítása, string parseFloat-tá alakítása */
const monitorsWithCorrectPrice = monitors.map(item => parseFloat(
    item.dataset.price.replace('.', '').replace(',', '.')));
/* Eredmény: 3 elemű tömb, benne a helyes formátumú árakkal */


const sumOfMonitorsPrice = monitorsWithCorrectPrice.reduce((
    previousPrice, currentPrice) => previousPrice + currentPrice);
/* Eredmény: 401911.17 */


// Áttagolás - method chaining (pontosvesszők és tömbök törlése)
const sumOfMonitorPrice2 = Array
    .from(document.querySelectorAll('#price-list li[data-price]'))
    .filter(item => item.textContent.includes('Monitor'))
    .map(item => parseFloat(item.dataset.price.replace('.', '').replace(',', '.')))
    .reduce((previousPrice, currentPrice) => previousPrice + currentPrice);
/* Eredmény: 401911.17 */


// 3.3.7 - A flat() metódus használata

/* Többdimenziós tömbök "kilapítására" */

const matrix = [11, 22, 33, [44, 55, [66, 77]]];
console.log(matrix.flat());
/* konzolon: 11,22,33,44,55, [66,77] */

// Megadható, hogy "hány dimenziót lapítson ki". 'Infinity' - akárhány dimenzió
console.log(matrix.flat(2));


// 3.3.8 - A flatMap() metódus használata

const numericArray4 = [11, 22, 33, 44, 55];
const exponentialFatArray = numericArray4
    .map(item => [item, item ** 2, item ** 3])
    // eredmény: többdimenziós tömb a számított értékekkel
    .flat();
// eredmény: egydimenziós tömb a számított értékekkel


// Ugyanez egyszerűbben:

const exponentialFatArray2 = numericArray4
    .flatMap(item => [item, item ** 2, item ** 3]);
// eredmény: egydimenziós tömb a számított értékekkel


// 3.3.9 - Új metódusok: find(), findIndex(), some(), every()

const users = [
    {
        firstName: 'Kiss',
        lastName: 'József',
        age: 18
    },
    {
        firstName: 'Horváth',
        lastName: 'Péter',
        age: 34
    },
    {
        firstName: 'Kováts',
        lastName: 'Ilona',
        age: 24
    },
    {
        firstName: 'Nagy',
        lastName: 'Antal',
        age: 66
    }
];

const findResult = users.find(user => user.age > 18);
/* eredmény: Object, benne age: 34, firstName: "Horváth", lastName: "Péter"
A find az első, a feltételnek megfelelő objektumot fogja visszaadni */


const findIndexResult = users.findIndex(user => user.age > 18);
/* eredmény: 1
Annak az első elemnek az indexét adja vissza, amelyre teljesül a feltétel */


const someResult = users.some(user => user.age > 18);
/* eredmény: true
Boolean-t ad vissza. Megnézi, hogy van-e legalább 1 olyan elem, 
amelyre igaz a feltétel. */


const everyResult = users.every(user => user.age > 18);
/* eeredmény: false
Boolean-t ad vissza. Igaz-e a feltétel a tömb összes elemére. */


// 3.3.10 - Típusos tömbök

/* JavaScript egy dinamikusan típusos nyelv, tehát nem a változó, 
hanem a tárolt érték az, ami valójában típussal rendelkezik. 

Lehetséges olyan tömbök létrehozása, amelyek csak 1 típusú adatokat tárolnak. 

Int8Array - Integer - 8 bites egész számokat tartalmazó tömb, előjelesen 
Uint8Array - Unsign - 8 bites, előjel nélküli, egész számokat tartalmazó tömb
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array - 32 bites, lebegőpontos számokat tartalmazó tömb
Float64Array */

const signedIntEightArray = new Int8Array(3);
/* Megadhatjuk paraméterként, hogy hány elemű tömb legyen, 
vagy magát a tömböt is, elemekkel.*/

signedIntEightArray[0] = 12;
console.log(signedIntEightArray);   /* konzolon: Int8Array(3), benne 12,0,0 */

/* 8biten -128 és +127 között tudjuk a számokat ábrázolni
-128 = 10000000
+127 = 01111111 
Első bit az előjel, maradék 7 biten maga a szám.*/

signedIntEightArray[1] = 128;       /*eredmény: -128 
Tartományon kívül eső érték esetén -128-tól kezd el újra számolni. Újra és újra. */

signedIntEightArray[2] = -130;      /* eredmény: 126
Ugyanúgy rotálódás, csak másik irányba. */


const signedIntEightArray = new Uint8ClampedArray(3);
unsignedClampedIntEightArray[0] = 12;
unsignedClampedIntEightArray[1] = -130;
unsignedClampedIntEightArray[2] = 270;
console.log(signedIntEightArray);
/* eredmény: Uint8ClampedArray(3) [12, 0, 255]
Előjel néléküli esetén a tartomány 0-255 közötti. 
Ha a megadott szám kifut a tartományból, annak automatikusan a a legnagyobb vagy 
legkisebb értéket adja (attól függően, hogy hol futott ki.) */


/* KVÍZ

1.
Üres tömböt fogok visszakapni, mert feltételvizsgálatnál mind a 0, a null, 
az undefined és az üres string is false-t ad vissza.

2. 
A fenti metódusok az eredeti tömböt nem módosítják, azaz nem mutálják, 
ellenben a push(), pop(), shift(), unshift() metódusok például igen. 
Érdemes mindig olyan megoldásokra törekednünk, amelyek az eredeti tömböt nem 
módosítják.

3.
A reduce jelen esetben nem csinál mást, mint hogy összeadja a tömbben lévő 
objektumok v tulajdonságainak az értékét. A kezdőértéket 0-ra állítjuk, és 
az accumulator-ban ehhez folyamatosan hozzáadjuk a soron lévő objektum v 
tulajdonságának értékét.
*/