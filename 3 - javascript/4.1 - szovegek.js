// 4.1.2 - A template literal

const firstName = 'John';
const lastName = 'Doe';
const age = 30;
const sayMyName = 'My name is ' + firstName + ' ' + lastName +
    ', and I\'m ' + age + ' years old.';
/* konzolon: 'My name is John Doe, and I'm 30 years old.'
... nem a legelegánsabb... */

const sayMyName2 = `My name is ${firstName} ${lastName}, and I'm ${age} years old.`;
console.log(sayMyName2);
/* konzolon: 'My name is John Doe, and I'm 30 years old.'
/* backtick avagy ferde aposztróf = Alt Gr + 7 */


// 4.1.3 Template literal használata tömbökkel

const people = [
    {
        firstName: 'John',
        lastName: 'Doe'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe'
    }
];

const template = `<div>
${people.map(person => `<p>${person.firstName} ${person.lastName}</p>`).join('')}
</div>`;

console.log(template)
/* konzolon: 
<div>
<p>John Doe</p><p>Jane Doe</p>
</div>

Így többsoros / multiline stringek létrehozása is lehetséges. */

document.body.innerHTML = template;
/* template tartalmának body tagbe helyezése */


// 4.1.4 Új metódusok: startsWith(), endsWith(), includes(), repeat(), 
//       padStart(), padEnd(), trimStart(), trimEnd()

console.log('hello'.startsWith('he'));    /* konzolon: true
Booleant ad vissza. A keresőkifejezéssel kezdődik-e a vizsgált elem? */

console.log('hello'.endsWith('lo'));      /* konzolon: true
Booleant ad vissza. A keresőkifejezéssel végződik-e a vizsgált elem? */

console.log('hello'.includes('lo'));      /* konzolon: true
Booleant ad vissza. Az adott karakterek megtalálhatóak-e a stringben? */

console.log('hello'.repeat(5));           /* konzolon: hellohellohellohellohello
Adott stringet ismétli meg, ahányszor kérjük. */

console.log('3456'.padStart(10, '*'));    /* konzolon: ******3456
Feltölti a megadott karakterrel a string előtti részt, egészen addig,
míg a string a megadott hosszúságú nem lesz.
Értsd: itt 4-es hosszúságú a string, 10-et adtunk meg paraméterként,
így 6 csillagot helyez el előtte */

console.log('3456'.padEnd(10, '*'));      /* konzolon: 3456******
Feltölti a megadott karakterrel a string utáni részt, egészen addig,
míg a string a megadott hosszúságú nem lesz. */

console.log('     trim     '.trimStart());          /* konzolon: 'trim     '
A hagyományos .trim() metódussal szemben nem az elejéről és a végéről,
hanem csak az elejéről vágja ki a felesleges szóközöket. */

console.log('     trim     '.trimEnd());            /* konzolon: '     trim'
Csak a végéről vágja ki a felesleges szóközöket. */




// 4.1.5 Többsoros szövegek template literal használatával

const multilineOld = 'first line \n' +
    'second line \n' +
    'third line \n';

console.log(multilineOld);
/* Ez a régi megoldás. \n a sortörés karaktere. */

const multilineNew = `first line
second line
third line`;

console.log(multilineNew);
/* (konzolon látható eredmény az itteni példán nehezen szemléltethető,
mert a leckében HTML fájlban dolgoznak, ami más tördelésű. 
A lényeg: a kódban lévő 4 space-s tab tördelések space-ei a string részei lesznek,
ami nemkívánatos végkimenetel) */

function translate(data) {
    return data.split('\n')
}
/* Tömböt ad vissza, melynek egy eleme a string egy sora 
Az '\n'-féle sortörést ugyan nem használtuk, de a sortörést magát
a JavaScript felismeri, és így tudunk rá hivatkozni */

function translate2(data) {
    return data.split('\n').map(line => line.trimStart())
}
/* Tömb elemeinek elejéről levágja a felesleges space-eket.
De ettől még továbbra is egy tömb. */

function translate3(data) {
    return data.split('\n').map(line => line.trimStart()).join(`\n`);
}
/* Egy stringet kapunk, tömb elemei sortörésekkel. */

/* Alternatív kiírás: */
const translate4 = data =>
    data.split('\n').map(line => line.trimStart()).join(`\n`);


// 4.1.6 A spread operátor

/* Egy tömböt vagy egy stringet elemeire tudunk bontani */

const message = 'message';
const characterArray = [...message];
console.log(characterArray);
/* konzolon: Array (7), tömb elemei a betűk, külön-külön
'...' = maga a spread iterator */

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];
console.log([...arr1, ...arr2]);
/* konzolon: [1,2,3,4,5,6,7,8,9,10] 
Az új tömbön belül mindkét esetben meghívta a régi tömböt, elemeikre bontva. */

const copyArr1 = [...arr1];
console.log(copyArr1);
/* konzolon: [1,2,3,4,5]
Másolat egy tömbről. Hogy deep vagy shallow vagy reference vagy mi azt én már 
nem értem... Mivel ha csak tömböt adok meg akkor csak az egyik változik, míg
ha a tömböt egy objektumon belül adom meg, akkor mind az eredeti, mind a 
másolat objektumon belüli tömb módosul... */















const user = {
    firstName: 'John',
    lastName: 'Doe'
};

const copyUser = { ...user };
/* Spread operátorral objektumok másolása is lehetséges. */

user.firstName = 'Jane';

console.log(user);
console.log(copyUser);
/* konzolon: 
{firstName: 'Jane', lastName: 'Doe'}
{firstName: 'John', lastName: 'Doe'} 
Adott objektumhoz egyszerűen megadott stringjeinek módosítása nem változtatja 
meg az eredeti stringet és vica versa. De ha egy tömböt adunk meg, akkor az egy
módosítás esetén mindkét helyen változik. */


// 4.1.7 A rest paraméter

/* Ha nem tudjuk pontosan, hogy hány argumentummal fogunk dolgozni. 
Megvalósítható arguments object segítségével - tárolja az összes argumentumot, 
amit függvényhíváskor átadhatunk - nem a legelegánsabb. Tömbnek tűnhet, de
valójában továbbra is objektum, tömb metódusokat nem használhatunk rajta. */

function restParameter(x, y, ...z) {
    console.log(x, y, z);
}

restParameter(1, 2, 3);
/* konzolon: 1 2 Array(1), benne 3
z = az első kettő utáni összes paramétert tömbként tárolja */

restParameter(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
/* konzolon: 1 2 (9) [3,4,5,6,7,8,9,10,11] */











































// 4.1.8 Tagged template literal

const user2 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};

tag`My name is ${user2.firstName} ${user.lastName}, and I'm ${user.age} years old.`;
/* Ez itt a template literal */

const tag = (texts, ...values) => console.log(texts, values);
/* konzolon Array(4) Array(3)
0: "My name is "
1: " "
2: ", and I'm"
3: " years old."

0: "John"
1: "Doe"
2: 30 

Az első tömbben a template literal szöveges elemei, a második tömbben pedig a
template literal hivatkozott értékei. */

const tag2 = (texts, values) => console.log(texts, values);
/* spread nélkül csak az első hivatkozott értéket adja vissza */

const tag3 = (texts, value1, value2) => console.log(texts, value1, value2);
/* Két paraméterrel az első két hivatkozott értéket adja vissza */

tag4`My name is ${user2.firstName} ${user2.lastName}, and I'm 
${user2.age} years old.`;

const tag4 = (texts, ...values) =>
    texts.map(
        (text, index) =>
            `${text}${values[index] ? `<strong> ${values[index]
                .toString().toLocaleUpperCase()}</strong>` : ''}`
    ).join('');
/* konzolon: "My name is <strong> JOHN</strong> <strong> DOE</strong>, 
and I'm <strong> 30</strong> years old." 
Hibalehetőség: Szám típusú adat esetén a toLocaleUpperCase kiakad. Előtte ezért
stringgé alakítjuk. */

const template2 = tag4`My name is ${user2.firstName} ${user2.lastName}, and I'm 
${user2.age} years old.`;
document.body.innerHTML = template2;
/* A stringet beszúrja a body elembe. */


/* KVÍZ

1. 
Jelen esetben rest paramétert használtunk. Az a értéke 1 lesz, míg a b értéke 
az összes többi paraméter tömbösítve, tehát: [2, 3, 4, 5].

2.
Két objektumot fűztünk össze. A kimeneten egy olyan új objektum lesz, 
amely mind a kettő tulajdonságait tartalmazza.

3.
A firstNumber és a secondNumber a paraméterek nevei, csak függvényen belül 
használhatom őket.A függvényen kívül nem léteznek, tehát itt ReferenceError-t kapunk. 
*/