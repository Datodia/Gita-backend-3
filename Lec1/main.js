
// var, let, const

var userName = 'Nika'
userName = "Giorgi"

// console.log(userAge)
let userAge = 22
userAge = 25

const c = 10
const d = 15

console.log(c === d)

const userLastName = "beridze"

const a = 10
const b = 21

console.log(sum(a, b), "result")

console.log(c < d && (a < b || b < c))

if(b < a){  
    console.log("B metia a-ze", userAge)
}else if(a > 8){
    console.log('a metia b-ze')
}else{
    console.log('mesame piroba')
}



for(let i = 0; i <= 100; i++){
    if(i % 2 === 0 && i !== 0){
        console.log(i)
    }
}

// let count = 0
// while(count < 10){
//     console.log(count)
//     count++
// }


function sayHello(userName = 'Nika'){
    console.log("Hello ", userName)
    // Read data from DB
    // render data to client
    // do something
}

sayHello('Davit')
sayHello('Giorgi')
sayHello()

function sum(a, b){
    return a + b
}

const result = sum(10, 20)
const result1 = sum(20, 30)
console.log(result)
console.log(result1)

// Function keyword
function test(){
    console.log("test", this)
}
test()

// Arrow function
const test1 = () => {
    console.log('test1', this)
}
test1()

// Anonymous function
const test2 = function(){
    console.log('test2')
}


function q(){
    w()
    console.log(1)
}

function w(){
    e()
    console.log(2)
}

function e(){
    console.log(3)
}
q()

function doSomething(){
    doSomething()
}

doSomething()

