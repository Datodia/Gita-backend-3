// console.log(1)

// // setTimeout(() => {
//     for(let i = 0; i < 2_000_000_000; i ++){}
// // }, 0)

// console.log(2)

// function foo(){
//     foo()
// }

// foo()

// 5,4,3,2,1

// function foo(n){
//     if(n === 0) return 
//     console.log(n)
//     foo(n - 1)
// }

// foo(5)

// function fact(n){
//     if(n === 1) return 1
//     return n * fact(n - 1)
// }

// console.log(fact(4))

// setTimeout(() => {
//     console.log(2)
// }, 3000)

// for(let i = 0; i < 4_000_000_000; i ++){}

// console.log(1)


// console.log(3)

// for(let i = 0; i < 4_000_000_000; i ++){}
// console.log(4)

// console.log(1)
// let count = 0;
// let interval
// interval = setInterval(() => {
//     count++
//     console.log(count)
//     if(count === 10){
//         clearInterval(interval)
//     }
// }, 1000)

// console.log(2)


// function getUserData(){
//     setTimeout(() => {
//         console.log('users')
//     }, 3000)
// }

// getUserData()

// .then().catch()   async/await
// let userPermition = 'VIEWER'
// const myPromise = new Promise((resolve, reject) => {
//     if(userPermition === 'ADMIN'){
//         resolve("UseR HAVE PERMITION")
//     }else{
//         reject('PERMITION DENIED')
//     }
// })

// const myPromise2 = Promise.resolve('Second resolved Promise')

// async function main(){
//     try{
//         const resolved1 = await myPromise
//         const resolved2 = await myPromise2
//         console.log(3)
//     }catch(e){
//         console.log(e, "error")
//     }
// }
// main()
// console.log(2)

// console.log(1)
// myPromise.then(res => {
//     console.log(res, "resoled value")
//     myPromise2.then(res => {
//         console.log(res)
//         console.log(2)
//     })
// }).catch(e => {
//     // Retry mechanism
//     console.log(e, "error")
// })

// console.log(2)



console.log(1)

Promise.resolve().then(() => {
    for(let i = 0; i < 2_000_000_000; i ++){}
})

console.log(2)