// 5.4.2 - RegExp objektum létrehozása, minták készítése

const pattern0 = new RegExp();
const pattern = /ab/;

const text = 'abraka dabra'
console.log(pattern.exec(text))
console.log(text.match(pattern))
/* konzolon: ['ab', index: 0, input: 'abraka dabra', groups: undefined]
.exec() egy tömböt ad vissza, amely azt is tartalmazza, hogy hányadik
karakternél kezdődik az első találat (indexként). (.match() itt ugyanez.)

Ha nincs találat: null */


// 5.4.3 - Flagek használata

const pattern2 = /ab/igm;

/* 3 kapcsoló:
i - ignore case - kis és nagybetű különbözőség mellőzése
g - global - nem áll meg 1 találatnál (de nem adja meg, hogy hol találhatóak)
m - multiline - többsoros szövegben is tud keresni */


// 5.4.4 - Adott mintával való kezdés, adott mintára való végződés vizsgálata

const pattern3 = /^ab/;      // egyezés a string legelején
const pattern4 = /ab$/;      // egyezés a string legvégén, a végét vizsgálja


// 5.4.5 - Csoportosítás

const pattern5 = /[abc]/     // van-e a stringben 'a', 'b'vagy 'c' karakter?
/* az első találatot és indexét adja vissza */

const pattern6 = /[abc]/g
/* konzolon: (7) ['a','b','a','a','a','b','a'] */

const pattern7 = /[^abc]/    // első találat és indexe (értelemszerűen 0)
const pattern8 = /[abc$]/    // első találat és indexe (értelemszerűen az utolsó)

const pattern9 = /^(ab|bc)$/ // a teljes string === 'ab' vagy 'bc'

const pattern10 = /^(ab|bc)/ // a string úgy kezdődik, hogy 'ab' vagy 'bc'


// 5.4.6 - A pont mint speciális karakter

const pattern11 = /^.a/;
/* kezdődjön bármilyen karakterrel és a 2. betű 'a' legyen.
Megjegyzés: Ha az 'a' előtt nincs semmi, akkor null lesz. */


// 5.4.7 - A pluszjel mint speciális karakter

const pattern12 = /.a+/
/* Az előtte lévő karakter legalább egyszer vagy többször szerepeljen */


// 5.4.8 - A csillag mint speciális karakter

const pattern13 = /.a*/
console.log('baaaaaaaaaaaaa'.match(pattern13))
/* k: ['baaaaaaaaaaaaa', index: 0, input: 'baaaaaaaaaaaaa', groups: undefined]
Az előtte lévő karakter EGYSZER SE vagy többször szerepeljen */


// 5.4.9 - A kérdőjel mint speciális karakter

const pattern14 = /ba?/
console.log('baaaaaaaaaaaaa'.match(pattern14))
/* k: ['ba', index: 0, input: 'baaaaaaaaaaaaa', groups: undefined]
Az előtte lévő karakter EGYSZER SE vagy legalább egyszer szerepeljen. 
Az adott karaktert max 1x adja vissza a végeredményben. */


// 5.4.10 - Számosság megadása

const pattern15 = /ba[2,5][^a]/
/*Az előtte lévő karakter min. 2x max 5x szerepeljen.
[^a] - NE 'a' karakter legyen */


// 5.4.11 - Metakarakterek

const pattern16 = /[a-z]/
/* A string tartalmaz legalább 1 kisbetűs karaktert az angol abc-ből. */

const pattern17 = /^[a-z]+$/
/* A string legalább 1 karakter hosszúságú és csak az angol abc kisbetűs 
elemeiből áll és semmi másból. 
FONTOS! A szóköz nem számít bele az angol abc-be. */

const pattern18 = /^[a-zA-Z]+$/         // Lehetnek nagybetűk is.
const pattern19 = /^[a-zA-Z0-9]+$/      // Lehetnek számjegyek is.
const pattern20 = /^[a-zA-Z0-9_]+$/     // Lehet alsóvonás is

const pattern21 = /^\w+$/               // Az eddigiek mind csak rövidebben
const pattern22 = /^\W+$/               // Az előző tagadása.

const pattern23 = /^\d+$/               // Csak számjegyeket tartalmaz.
const pattern24 = /^\D+$/               // Nem tartalmaz számjegyeket.

const pattern25 = /^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ0-9]+$/
// Lehetnek magyar abc ékezetes betűi is.


// 5.4.12 - Validációs példaprogram készítése

const Validator = {
  patterns: {
    taj: /^(\d{3} ){2}\d{3}$/,
    id: /^\d{6}[A-Z]{2}$/,
    name: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/
  },
  validate(text, type) {
    return text.match(this.patterns[type]) ? true : false;
  }
};

console.log(Validator.validate('123 456 789', 'taj'));  // true
console.log(Validator.validate('123456AA', 'id'));      // true
console.log(Validator.validate('Gipsz', 'name'));       // true

/* KVÍZ

1. Kettő darab nagybetűvel kezdődő szó van a mondatban, ezekre fog illeszkedni 
a kifejezés.
[A-Z] : legyen egy angol nagybetű
\w    : utána az alábbiak közül: a-z, A-Z, 0-9
+     : egy vagy több az előző karakterből
/g    : globálisan keresünk 

2. A leckék során már egyszer előkerült ez a példa. A TAJ számot validáltuk.
^(\d{3} ) : kezdődjön a string három darab számmal, amely után egy szóköz jön
{2}       : az előbbiből legyen 2
\d{3}$    : majd a végén legyen még 3 darab számjegy egymás után

3. Az i az ignorCase kapcsoló. Nem fog különbséget tenni a kis- és nagybetűk 
között. A g flaggel globális keresést, az m-mel többsoros keresést tudjuk
bekapcsolni. */