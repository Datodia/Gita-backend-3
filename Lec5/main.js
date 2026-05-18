// const nums = [1,2,3]

// const HTTPMethod = {
//     0: 'POST',
//     1: 'GET',
//     2: 'PUT',
//     3: 'PATCH',
//     4: 'DELETE'
// }

// Object.freeze(HTTPMethod)

// console.log(HTTPMethod)

// const Status = {'IN_PROGRESS'}

// const person = {
//     name: "Giorgi",
//     age: 24,
//     isSmoker: false,
//     grade: 0,
//     hobbies: ['Swim', 'run', 'watching tv'],
//     // hobbies: 'Swim, run, watching tv',
//     7: 'seven',
//     "full name": "Giorgi Giorgadze",
//     sayHello: () =>{
//         console.log('Hello')
//         // return 'hello'
//     },
//     password: "password123"
// }
// for(let i =0; i < 10; i++)
// for(let key in person){
//     console.log(person[key], "value")
// }

// const keys = Object.keys(person)
// keys.forEach((key) => {
//     console.log(`${key}: ${person[key]}`)
// })

// const values = Object.values(person)
// console.log(values, "values")

// const entries = Object.entries(person)
// for(let [key, value] of entries){
//     console.log(key, "Key")
//     console.log(value, "Value")
// }

// for of
// const fruits = ['Apple', 'Banan', 'Pear']
// for(let fruit of fruits){
//     console.log(fruit, "fruit")
// }

// if(person.hasOwnProperty('hobbies') && Array.isArray(person.hobbies)){
//     person.hobbies.push('Reading')
// }

// Object.freeze(person)

// person.name = "Nika"
// console.log(person)

// const {name, age, isSmoker} = person
// const {password, ...rest} = person
// console.log(rest, "rest")

// delete person.name
// delete person.age

// person.lastName = "giorgadze"
// person['position'] = 'Software developer'
// person.name = 'Nika'
// console.log(person)

// console.log(person["full name"])
// console.log(person.name)
// console.log(person.sayHello())

// const a = {
//     test: "Value",
//     b: {
//         c: {
//             d: {
//                 f: {
//                     g: 1
//                 }
//             },
//             g: [1,2,3]
//         }
//     }
// }

// const b = {
//     test: "Value",
//     b: {
//         c: {
//            d: {
//                 f: {
//                     g: 1
//                 }
//             },
//             g: [1,2,3]
//         }
//     }
// }

// == ===

// console.log(JSON.stringify(a) === JSON.stringify(b))
// console.log(a === b)
// OOP Object Oriented Programming
// const calculator = {
//     value: 0,
//     add: function(num){
//         // this
//         this.value += num
//         return this
//     },
//     sub: function(num){
//         this.value -= num
//         return this
//     },
//     mult: function(num){
//         this.value *= num
//         return this
//     },
//     div: function(num){
//         this.value /= num
//         return this
//     },
//     getValue: function(){
//         console.log(this.value)
//     }
// }
// // [1,2,3].map((n) => n * 2).filter(n => n > 2).sort((a, b)=> b - a).reduce()

// calculator.add(50).sub(20).mult(2).div(3).getValue()

// const users = [
//   { id: 1, name: "giorig", age: 24, isSmoker: true },
//   { id: 2, name: "nika", age: 44, isSmoker: false },
//   { id: 3, name: "mariami", age: 32, isSmoker: true },
//   { id: 4, name: "tekla", age: 21, isSmoker: false },
//   { id: 5, name: "daviti", age: 24, isSmoker: true },
// ];

// const groupedByAge = users.reduce((prev, cur) => {
//   const { name, age } = cur;
//   if (!prev[age]) {
//     prev[age] = [];
//   }
//   prev[age].push(name);

//   return prev;
// }, {});

// console.log(groupedByAge);
// {
//     24: ['giorig', 'daviti'],
//     44: ['nika'],
//     32: ['mariami']
// }

// const names = users.map(user => user.name)
// console.log(names, "names")

// [giorgi, nika, mariami]

// const filterByAge = users.filter(user => user.age > 25)
// const averageAge = users.reduce((tot, cur) => tot + cur.age, 0) / users.length
// console.log(filterByAge)
// console.log(averageAge, "averageAge")

// const products = [
//     {name: "iphone", price: 1500},
//     {name: "macbook", price: 3500},
//     {name: "lenovo", price: 2500},
//     {name: "microphone", price: 100},
//     {name: "headset", price: 500},
//     {name: "samsung", price: 1800},
// ]

// // filter more than 1000, calcaulate sum of them
// const sumOfProduct = products
//                         .filter(product => product.price > 1000)
//                         .reduce((tot, cur) => tot + cur.price, 0)
// console.log(sumOfProduct, "sum")


const students = [
  { name: "Ana", scores: [80, 90, 100] },
  { name: "Nika", scores: [70, 60, 75] },
  { name: "Luka", scores: [95, 85, 90] },
  { name: "Luka", scores: [90, 95, 100] },
];



const studentsWithAverage = students.map(student => ({...student, average: student.scores.reduce((tot, cur) => tot + cur) / student.scores.length})).sort((a,b) => b.average - a.average)
console.log(studentsWithAverage[0])

//find student with highest average score
// {name: 'ana', scores: [80, 90, 100]}

