
// Two type of array methods
// 1) mutation of original array
// 2) create copy of modified array
// 3) dont mutation and dont return copy

// const nums = [12, 4, 15, 63, 21, 78]
//nums[i]

// const filteredArr = nums.filter((num, i) => {
//     if(num > 20){
//         return num
//     }
// })
// const filteredArr = nums.filter((num) => num % 3 === 0)

// console.log(filteredArr, "filterdArr")
// console.log(nums, "nums")

// const fruits = ['Apple', 'Banana', 'Pear', 'Watermelon']

// const largeFruits = fruits.filter((fruit) => {
//     if(fruit.length >= 6){
//         return fruit
//     }
// })
// const largeFruits = fruits.filter((fruit) => fruit.length >= 6)
// console.log(largeFruits, "largeFruits")


// const nums = [1,2,3,4,5]

// const squareNums = nums.map((num) => {
//     if(num > 3){
//         return num + 3
//     }else if(num % 2 === 0){
//         return num * num
//     }else{
//         return num 
//     }
// })

// const squareNums = nums.map(num => num > 3 ? num : num % 2 === 0 ? num * num : num)
// console.log(squareNums, "squareNums")

// .toUpperCase()
// const names = ['nika', 'giorgi', 'luka']
// const capitalNames = names.map(name => name[0].toUpperCase() + name.slice(1))
// const capitalNames = names.map(name => name.slice(0, name.length - 1) + name[name.length - 1].toUpperCase() )
// console.log(capitalNames)


// const person = {
//     name: "giorgi",
//     age: 21,
//     isSmoker: false,
//     sayHello: () => {
//         console.log('Hello')
//     }
// }

// const nums = [12, 4, 15, 63, 21, 78]
// const colors = ['red', 'yellow', 'red', 'green', 'yellow', 'red', 'green', 'black']
// {
//     red: 2,
//     yellow: 1,
//     green: 2,
//     black: 1
// }

// const groupedByColor = colors.reduce((prev, curr)=>{
//     if(!prev[curr]){
//         prev[curr] = 1
//     }else{
//         prev[curr] += 1
//     }

//     return prev
// }, {})
// console.log(groupedByColor, "grouped")
//reduce => sum, grouped

// const totalSum = nums.reduce((tot, curr) => {
//     return tot * curr
// }, 1)
// console.log(totalSum, "total")

// Some/everry => Boolean

// const isAllEvenNums = nums.every((num) => num % 2 == 0)
// const isSomeOfThemEvenNums = nums.some((num) => num % 2 == 0)
// console.log(isAllEvenNums, "isALlEven")
// console.log(isSomeOfThemEvenNums, "isSomeOfThemEvenNums")

// const firstOddNum = nums.find((num) => num % 33 === 0)
// const firstOddNum = nums.findIndex((num) => num % 33 === 0)
// console.log(firstOddNum)
// const doubleNums = []
// let firstOddNum = nums[0]

// nums.forEach((num, i) => {
//     if(num %2 === 0){
//         doubleNums.push(num * num)
//     }
   
// })
// console.log(doubleNums,"double")
// console.log(firstOddNum, "odnum")



// const nums = [12, 12, 12, 113, 115, 4, 15, 63, 21, 78]

// const sum = nums
//                 .map(num => num + 2)
//                 .filter(num => num % 2 === 0)
//                 .sort((a, b) => a - b)
//                 // .reduce((tot, cur)=> tot + cur, 0)

// console.log(sum)
// const sortedArr = nums.sort() // Do not recomended
// const ascArr = nums.sort((a, b) => a - b)
// const descArr = nums.sort((a, b) => b - a)
// console.log(descArr)


// function sumArr(arr){
//     if(Array.isArray(arr)){
//         return arr.reduce((tot, cur) => tot + cur, 0)
//     }
// }

// console.log(sumArr([1,2,3]))

// const a = [1,1,2,3]
// const b = [4,5,6]
// const indexOf1 = a.indexOf(2)
// const indexOf1 = a.lastIndexOf(1)
// console.log(indexOf1, 'index')
// console.log(a.reverse())

// const c = a.concat(10,1231,312312,31,23,123,12,31,3,)
// // const c = [...a,  ...b]
// console.log(c)

// const a = [1, [2,3, [4,5, [1,2, [1, [1, [1, [1, [1]]]]]]]], [6], [7, 8, [9, 10]]]
// const b = [1,2,3, [4,5,6, [7]]]
// const flatedB = b.flat(Infinity)
// console.log(flatedB, "flatted")
// console.log(a, "a")


// const nums = [0, 2, -55, -12, 3, 41, 87]
// //calculate sum of positive ones
// const sum = nums.reduce((tot, cur )=> {
//     if(cur > 0){
//         return tot + cur
//     }
//     return tot
// }, 0)
// console.log(sum, "sum")

// const divideBy3 = nums.map(num => num * 2).filter(num => (num % 3 === 0 && num > 0))
// console.log(divideBy3, "divideBy3")


// write a funciton which takes string and reverse that string


// function reverseStr(str){
//     return str.split('').reverse().join('')
// }

// function reverseStr(str){
//     let result = ''
//     for(let i = str.length - 1; i >=0; i--){
//         result = result + str[i]
//     }
//     return result
// }

// console.log(reverseStr('hello'))


const transaction = [
  { amount: 10, currency: "USD" },
  { amount: 20, currency: "EUR" },
  { amount: 5, currency: "USD" },
  { amount: 100, currency: "GEL" },
  { amount: 500, currency: "USD" },
  { amount: 52, currency: "USD" },
  { amount: 50, currency: "EUR" }
]

// grouped by currency
// {
    // USD: {amount: 15},
    // EUR: {amount: 70}
//}


const groupedByCurrency = transaction.reduce((prev, {amount, currency}) => {
    if(!prev[currency]){
        prev[currency] = {total: amount}
    }else{
        prev[currency].total += amount
    }

    return prev
}, {})

console.log(groupedByCurrency, "currency")