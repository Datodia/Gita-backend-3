

// // const myPromise1 = new Promise((resolve, reject) => {
// //     const isSuccess = false

// //     if(isSuccess){
// //         resolve('RESOLVED SUCCESSFULLY')
// //     }else{
// //         reject('REJECTED')
// //     }
// // })
// // // then.catch.   async await
// // myPromise1
// //     .then((resolve) => console.log(resolve))
// //     .catch(error => console.log(error))



// function delay(ms, resolveValue){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(resolveValue)
//         }, ms)
//     })
// }

// function rejectDelay(ms, resolveValue){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(resolveValue)
//         }, ms)
//     })
// }

// // delay(3000, 2).then(res => {
// //     console.log(res)
// //     delay(5000, 3).then((res2) => {
// //         console.log(res2)
// //         delay(3000, 4).then((res3) => {
// //             console.log(res3)
// //         })
// //     })
// // })

// // const [resolve1, resolve2...] = await Promise.all([promise1, promise2, promise3....])

// async function main(){
//     console.time()
//     console.log(1)
//     // const [resp1, resp2, resp3] = await Promise.all([delay(3000, 2), delay(5000, 3), delay(5000, 4)])
//     // const resolve = await Promise.race([rejectDelay(3000, 2), delay(5000, 3), delay(5000, 4)])
//     // const resolve = await Promise.any([rejectDelay(3000, 2), delay(5000, 3), delay(5000, 4)])
//     // const results = await Promise.allSettled([rejectDelay(3000, 2), delay(5000, 3), delay(5000, 4)])
//     // const successPromises = results.filter(result => result.status === 'fulfilled')
//     // console.log(successPromises, "success")
//     // console.log(resp1)
//     // console.log(resp2)
//     // console.log(resp3)
//     // console.log(resolve)
//     console.log(5)
//     console.timeEnd()
// }

// main()






// fetch('https://dummyjson.com/users')
//     .then(res => res.json())
//     .then(data => console.log(data))

// async function main() {
//     try{

//         const resp = await fetch('https://dummyjson.com/usersss')
//         console.log(resp, "response")
//         let data
//         if(resp.status === 200){
//             data = await resp.json()
//         }else{
//             data = await resp.text()
//         }
//         console.log(data, "datra")
//     }catch(e){
//         console.log(e)
//     }

//     // console.log(data, "data")
// }
// main()


// BAD EXAMPLE SYNC
// async function main(){
//     console.time()
//     const resp = await fetch('https://dummyjson.com/users')
//     const resp2 = await fetch('https://dummyjson.com/users')
//     const resp3 = await fetch('https://dummyjson.com/users')

//     const data1 = await resp.json()
//     const data2= await resp2.json()
//     const data3 = await resp3.json()
//     console.timeEnd()
// }
// main()

// GOOD EXAMPLE Async
// async function main(){
//     console.time()
//     const [resp, resp2, resp3] = await Promise.all([
//         fetch('https://dummyjson.com/users'),
//         fetch('https://dummyjson.com/users'),
//         fetch('https://dummyjson.com/users')
//     ])

//     const [data1, data2, data3] = await Promise.all([
//         resp.json(),
//         resp2.json(),
//         resp3.json()
//     ])
//     console.timeEnd()
// }
// main()


// წამოიღეთ ინფორმაცია ამ ურლდან https://dummyjson.com/products
// დააჯამეთ ყველა პროდუქტის ფასი და დალოგეთ ის.

// async function main(){

//         const resp = await fetch('https://dummyjson.co1m/products')
//         const data = await resp.json()
        
//         const products = data.products
//         const totalPrice = products.reduce((tot, cur) => tot + cur.price, 0)
        
//         console.log(totalPrice, "totalPrice")
   

//     console.log('2asdasdas')
// }

// main()
// console.log(1)

// წამოიღეთ ინფორმაცია https://dummyjson.com/users და https://jsonplaceholder.typicode.com/users
// გააკეთეთ ახალი მასივი სადაც იქნება ორივე რესურისდან მიღებული იუზერის ინფორმაცია შემდეგი
// ფროფერთიებით  {fullname, email, phone}


const users = []
async function main(){
    const [resp1, resp2] = await Promise.all([
        fetch('https://dummyjson.com/users'), 
        fetch('https://jsonplaceholder.typicode.com/users')
    ])

    const [data1, data2] = await Promise.all([resp1.json(), resp2.json()])
    data1.users.forEach(user => {
        users.push({
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone
        })
    })

    data2.forEach(user => {
        users.push({
            fullName: user.name,
            email: user.email,
            phone: user.phone
        })
    })
    console.log(users,"users")
    console.log(users.length, "lenth")
}
main()