const { ar } = require("zod/locales")

console.log('hello world 123')

const userName = 'Giogi'
const fruit = 'Apple, banana, Grape'

// const fruits = ['apple', 'banana', 'grape', 1, true, undefined, [1,2,3], () => {}, {a: 'b'}, [[[1]]]]
// console.log(fruits.length)
// console.log(typeof fruits)
// console.log(typeof fruit)   
// console.log(fruits.length)
// fruits = ['test']
// fruits[0] = 'pear'
// console.log(fruits.indexOf('test'))
// pop(), push(), shift(), unshift()
// fruits.push('Watermelon') 
// fruits.push('Watermelon')
// fruits.push('Watermelon')
// fruits.pop()
// fruits.pop()
// fruits.pop()
// fruits.unshift('Test')
// fruits.unshift('Test1')
// const removedItem = fruits.shift()
// console.log(fruits, removedItem)

// Two type of array methods
// 1) mutation of original array
// 2) create copy of modified array
// const nums = [1,2,3]
// const nums2 = [4,5,6]
// console.log(nums.concat(nums2))
// for + arr
// for(let i = 0; i < nums.length; i++){
    // es ar unda gaushvat
    // nums.push(1)
// }
// console.log(nums)

// const slicedArr = nums.slice(0, 3)
// console.log(nums, "nums")
// console.log(slicedArr, "slicedArr")
// const joinedArr = nums.join('A')
// console.log(typeof joinedArr)
// const deletedItem = nums.splice(6, 2, 100, 101, 102, 103)
// console.log(nums, "nums")
// console.log(deletedItem, "deletedItem")

// let nums = [20, 44, 15, 61, 45, 78, 90, 11, 21]
// console.log(nums, 'nums')
// console.log(...nums, '...nums')
// const max = Math.max(...nums)
// let max = nums[0]
// for(let i = 1; i < nums.length; i++ ){
//     if(nums[i] > max){
//         max = nums[i]
//     }
// }
// const max = nums.sort((a, b)=> b-a)
// console.log(max[0])


// const arr = [1, '2', false, 3, {}, [1,2], 'test', 4, [1,2,[3,4,[5,6], [7,8]]]]
// const numsArr = []
// for(let i = 0; i < arr.length; i++){
//     if(typeof arr[i] === 'number'){
//         numsArr.push(arr[i])
//     }
// }

// console.log(numsArr, "numsArr")

// && || !
//დაწერეთ კოდი რომელიც გაფილტრავს მასივს მხოლოდ უნიკალურ ელემენტებზე
// const nums = [21, 12, 21, 44, 34, 12, 65, 89, 9, 44]
// console.log(Array.from(new Set(nums)))
// const uniqueNums = []
// for(let i = 0; i < nums.length; i++){
//     if(!uniqueNums.includes(nums[i])){
//         uniqueNums.push(nums[i])
//     }
// }

// console.log(uniqueNums, "uniques")


// const nums = [1,3, 5, 2, 112, 22, 42, 35, 89]
// const evens = []
// const odds = []

// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
// //Count positive, sum negative
// // [10, -65]
// const result = [0, 0]
// for(let i = 0; i < nums.length; i++){
//     if(nums[i] > 0){
//         result[0] += 1  
//     }else{
//         result[1] += nums[i]
//     }
// }
// console.log(result, "result")


// remove duplicate elements 
// // from an array and find the sum of this array.
// const nums = [12, 21, 12, 43, 55, 68, 92, 55, 2]
// let sumOfUniqueNums = 0
// const uniques = []
// for(let i = 0; i < nums.length; i++){
//     if(!uniques.includes(nums[i])){
//         uniques.push(nums[i])
//         sumOfUniqueNums += nums[i]
//     }
// }
// console.log(sumOfUniqueNums,"sum")