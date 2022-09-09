const numbers = [10, 0x67F, 12.11, 0o67];
const int = numbers.map(number => Number(number, 10));
Number()

/*
 Ajánlott kiegészítők
Auto Close Tag
Auto Complete Tag
Auto Rename Tag
Code Runner
CodeSnap
Copy Relative Path
*/


// 22-08-19 - exam consultation

// 2. példa
const transformNumbers = (...prices) => {
    let arr = [prices].flat(Infinity);
    return arr.map(number => Math.round(number * 0.75))
}


// 3. példa
const people = [
    {
        name: 'Joe',
        age: 50,
    },
    {
        name: 'Jim',
        age: 51,
    },
    {
        name: 'Jack',
        age: 49,
    }
]

const findMinimumAge = (people = [{ age: 33 }]) => {
    let min = people[0];
    people.forEach(p => {
        if (min.age > p.age) {
            min = p;
        }
    })
    return min;
};

export {
    findMinimumAge,
}

// 4. példa

const yearDiff = (date = new Date()) => {
    const currentYear = new Date().getFullYear();
    return currentYear - date.getFullYear();
};

console.log(yearDiff(new Date(1994, 4, 17)))

// objektum deep copy
const user3 = JSON.parse(JSON.stringify(user));