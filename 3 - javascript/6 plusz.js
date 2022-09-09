/* xmlhttprequest eseményalapú
fetch API-nál promiseok */

/* setTimeout - késleltetett művelet a javascriptben. Az idő letelte után 
hajtja végre a függvényt amit megadtunk neki - callback függvényt*/

const searchInput = document.querySelector('#searchInput')
const outputSpan = document.querySelector('#output')

searchInput.addEventListener('keyup', (ev) => {
  const timeOut = setTimeout(() => {
    console.log(ev.target.value) // melyik billentyűt engedték fel
  }, 2000)
  console.log('Event:', ev)
})

/* setTimeout a memóriába kerül, fontos, hogy időnként töröljük!
setTimeout egy számot ad vissza.
A törlést a függvényen belül érdemes megadni, mert pl ha globálisan van, akkor
a setTimeout azelőtt törlődik, mielőtt még lefuthatna.  */

clearTimeout(timeOut)


// HTTP kérés küldése egy szerverre

const xhr = new XMLHttpRequest() // 1x lehet csak felhasználni (Promise is)

xhr.open('GET', 'https://nettuts.hu/jms/joe/customers')

xhr.onload = (ev) => {
  const customers = JSON.parse(ev.target.response)
  console.log(customers);
}

xhr.send()

/* A válasz egy esemény, amelynek célja maga az XMLHttpRequest */ 