// 5.5.2 - A try...catch blokkok használata

console.log(bubu);
console.log('start')
/* konzolon: Uncaught ReferenceError: bubu is not defined (Error Object)
Nem fog a következő sorra lépni és kiírni, hogy 'start', a kód elakad. */

try {
  console.log(bubu);
} catch (error) {
  console.error(error);
};
console.log('start')
/* konzolon: Uncaught ReferenceError: bubu is not defined (Error Object)
alatta: start 

Error Object. 2 fontos property
1 - message   'bubu is not defined'
2 - name      ReferenceError - dokumentációkban tanulmányozhatóak

3 - stack     eddigiek + megmutatja, hogy hol a hiba, milyen függvény után.
              Nem a szabvány része, de nagyon hasznos */


// 5.5.3 - Példaprogram a try...catch használatára

const jsonData = `
{
"firstName": "John",
"lastName": "Doe",
"age": 30,
}
`;

try {
  const user = JSON.parse(jsonData);
  console.log(user);
}
catch (error) {
  console.error(error)
}
/* konzolon: SyntaxError: Unexpected token } in JSON at position 146 
A hiba a 30 után otthagyott vessző karakter. */

try {
  const user = JSON.parse(jsonData);
  console.log(user);
}
catch (error) {
  const user = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 30
  }
}
/* Error esetén nem csak logolni lehet, hanem műveletet is végrehajthatunk,
ami itt például a default érték megadása */


// 5.5.4 - A throw utasítás és a különböző hibaobjektumok

/* JavaScriptben 1 try-hoz mindig csak 1 catch tartozhat, de a catch-en belül 
lehetnek vizsgálatok, illetve egy fájlon belül több try...catch is lehet */

try {
  const user = JSON.parse(jsonData);
  console.log(user);
}
catch (error) {
  if (error instanceof ReferenceError) {
    console.error('Referencia hiba');
  }
  else if (error instanceof SyntaxError) {
    console.error('Szintaktikai hiba');
  }
  else {
    console.error(error.message);
  }
};
/* konzolon: Szintaktikai hiba */

const jsonData2 = `
{
"firstName": "John",
"lastName": "Doe"
}
`;

try {
  const user = JSON.parse(jsonData2);
  if (!user.firstName || !user.lastName || !user.age) {
    throw new ReferenceError('Missing property');
  }
}
catch (error) {
  if (error instanceof ReferenceError) {
    console.error('Custom Error:', error.message);
  }
  else if (error instanceof SyntaxError) {
    console.error('Szintaktikai hiba');
  }
  else {
    console.error(error.message);
  }
};
/* konzolon: Custom Error:  Missing property 
Kódírásnál legfelül a legvalószínűbb hibalehetőség, legvégén a legritkább.*/


// 5.5.5 - A finally blokk használata

/* finally-ban lévő rész MINDIG lefut. Ha van hiba, ha nincs. */

try {
  const user = JSON.parse(jsonData2);
  if (!user.firstName || !user.lastName || !user.age) {
    throw new ReferenceError('Missing property');
  }
}
catch (error) {
  if (error instanceof ReferenceError) {
    console.error('Custom Error:', error.message);
  }
  else if (error instanceof SyntaxError) {
    console.error('Szintaktikai hiba');
  }
  else {
    console.error(error.message);
  }
} finally {
  console.log('Parse ready')
};
/* konzolon egymás alatt: Custom Error: Missing property, Parse ready */

/* pl. fetchnél mindig érdemes try...catch-et használni
De ne vigyük túlzásba se. Erőforrásigényesek. */


// 5.5.6 - Kivételkezelés aszinkron függvények esetében

const parse = (data) => JSON.parse(data);

try {
  setTimeout(() => {
    const user = parse(jsonData);
    console.log(user)
  })
}
catch (error) {
  console.error('My catch block:', error);
}
/* konzolon: Uncaught SyntaxError... stb
DE ez nem a catchben megadott egyedi üzenet! 
Megoldás: hibakezelés a setTimeout-on (callback-en) belül. */


setTimeout(() => {
  try {
    const user = parse(jsonData);
    console.log(user);
  } catch (error) {
    console.error('My catch block: ', error);
  }
})
/* konzolon: My catch block: SyntaxError...stb */

/* KVÍZ

1. A JavaScriptben nem támogatott a multiple catch ág. Ha több kivételt 
szeretnénk lekezelni, azt egy catch blokkon belül kell megtennünk.

2. ReferenceError, mert nem létezik a powFunction nevű függvény.

3. Mindig. A finally mindig lefut, akár volt hiba, akár nem. */
