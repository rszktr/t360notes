// 4.3.2 - Tömbök átstrukturálása

const arr = ['one', 'two', 'three', 'four'];
const [a, b, c] = arr;
console.log(a, b, c); // one, two, three

/* Tömb első 3 eleme új változókban letárolva, mert csak 3 változót (a,b,c) 
adtunk meg és sorban halad. Undefined értékű elem esetén a változóban is
undefined érték lesz */

// 4.3.3 - Adatok felcserélése

let d = 'D értéke';
let e = 'E értéke';

[d, e] = [e, d];
console.log(d, e); // E értéke D értéke


function advancedBubbleSort(arr) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i += 1) {
            if (arr[i] > arr[i + 1]) {

                // régi megoldás
                // const temp = arr[i];
                // arr[i] = arr[i + 1];
                // arr[i + 1] = temp;

                // új megoldás
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

console.log(advancedBubbleSort([234, 762, 68, 9, 3, 2]));
/* konzolon [2, 3, 9, 68, 234, 762] */


// 4.3.4 - Objektumok átstrukturálása

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
}

const { firstName, lastName } = person;

console.log(firstName, lastName);   // konzolon: John Doe
console.log(a, lastName) = person   // konzolon: undefined Doe

/* Objektum értékeit új változókhoz rendeltük. 
Változók neve pontosan egyezik az objektum kulcsainak nevével */


// 4.3.5 - Objektumok átstrukturálása új változónév hozzárendelésével

const { firstName: f, lastName: l } = person;
console.log(f, l);      // konzolon: John Doe














// 4.3.6 - Objektumok átstrukturálása alapértelmezett értékkel

const styles = {
    background: 'white',
    color: 'red',
    display: 'block',
    visibility: 'hidden',
};

const {
    background,
    color = blue,
    display,
    border = '1px solid black' // default érték megadása egyenlőségjellel
} = styles;

console.log(background, color, display, border);
/* konzolon: white red block 1px solid black 
Default érték, vagyis csak akkor jelenik meg, ha az eredeti objektumban 
nincs ilyen kulcs vagy nincs hozzá érték */


// 4.3.7 - Objektumok átstrukturálása új változónév hozzárendelésével
//         és alapértelmezett értékkel

const {
    background: bg,
    color: cl = blue,
    display: dp,
    border: bo = '1px solid black'
} = styles;

console.log(bg, cl, dp, bo);
/* konzolon: white red block 1px solid black 
Előbb kettőspont után adjuk meg a változó nevét, majd egyenlőségjellel 
a default értéket. */


/* KVÍZ

1. 
Az 'a' értéke a tömb első elemének az értékét veszi fel, majd két elemet 
kihagyunk, a 'd' a negyedik elem, azaz a 3. indexű elem értékét kapja meg, 
amely 'four' 

2.
A pet objektum nem rendelkezik kor tulajdonsággal, így a megadottt default
value, azaz 10 lesz az értéke

3. 
A destructuring után a referencia elveszik. A 'name' egy egyszerű primitív 
lesz. Ha azt módosítjuk, az objektum tulajdonsága nem fog módosulni.
*/