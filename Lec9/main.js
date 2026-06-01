
// function person(name, age){
//     return {name, age}
// }

class User {
    constructor(name, age){
        this.name = name
        this.age = age
    }

    lastName = null

    sayHello(){
        console.log('Hello world')
    }
}

// const user1 = new User('Giogi', 22)
// user1.lastName = 'asdasd'
// user1.#lastName = 'giorgadze'
// user1.sayHello()
// console.log(user1)

// const user2 = new User('nika', 25)
// console.log(user2)
// user2.sayHello()


class Calculator {
    #value = null
    constructor(value = 0){
        this.#value = value
    }

    get number(){
        return this.#value
    }

    set number(num){
        this.#value = num
    }

    add(num){
        if(typeof num !== 'number'){
            return 
        }
        this.#value += num
        return this
    }

    sub(num){
        this.#value -= num
        return this
    }

    mult(num){
        this.#value *= num
        return this
    }

    div(num){
        this.#value /= num
        return this
    }

    getResult(){
        console.log(this.#value)
    }
}

const calc1 = new Calculator(0)
calc1.number = 20
console.log(calc1.number)
// calc1.add(5).mult(5).sub(3).getResult()

// const calc2 = new Calculator(10)
// calc2.add(10)
// calc2.getResult()


class Animal {
    constructor(name){
        this.name = name
    }

    rame = 'rame'

    #spicy = 'rame'
    breed = 'rame'
    _nickName = 'rame'

    alive(){
        console.log('im alive')
    }

    alive2(){

    }

    alive3(){

    }
}

// const dog1 = new Dog('jeka')
class Dog extends Animal {
    constructor(name, age){
        super(name)
        this.age = age
    }

    getBreed(){
        this.breed
    }

    getNickName(){
        this._nickName
    }

    bark(){
        console.log('Im Barking')
    }

}

const dog1 = new Dog('Jeka', 4)
// dog1.alive()

class Fish extends Animal {
    constructor(name, color){
        super(name)
        this.color = color
    }

    swim(){
        console.log('im swimming')
    }

}


class Hawk extends Animal{
    constructor(name, speed){
        super(name)
        this.speed = speed
    }

    fly(){
        console.log('im flying')
    }

    alive3(){
        console.log('especially hawk alive3')
    }
}

const hawk = new Hawk('rame', 200)
// hawk.alive3()


class CoffeMachine {
    makeCoffe(){
        this.#boidWater()
        this.#addCoffeeBeans()
        console.log('Coffee is ready')
    }

    #boidWater(){
        console.log('Boiled watter')
    }

    #addCoffeeBeans(){
        console.log('Added coffee beans')
    }
}

const cof1 = new CoffeMachine
// cof1.makeCoffe()


// შექმენით მართუთხედის კლასი, რომელიც მიირებს სიგრძეს და სიგაენს პარამეტრად,
// და ექნება შემდეგი მეთოდები getArea(), getPerimeter(), isSquare() => boolean


class Reactangle {
    #width
    #height

    constructor(width, height){
        this.#width = width
        this.#height = height
    }

    getArea(){
        return this.#width * this.#height
    }

    getPerimeter(){
        return 2 * (this.#width + this.#height)
    }

    isSquare(){
        return this.#width === this.#height
    }
}

// const rect1 = new Reactangle(20, 40)
// console.log(rect1.getArea())
// console.log(rect1.getPerimeter())
// console.log(rect1.isSquare())

// const rect2 = new Reactangle(20, 20)
// console.log(rect2.isSquare())

// class Circle{
//     #radius

//     constructor(radius){
//         this.#radius = radius
//     }

//     getArea(){
//         return Math.floor(this.#radius * this.#radius * Math.PI)
//     }

//     getLength(){
//         return Math.floor(2 * this.#radius * Math.PI)
//     }
// }

// const circl1 = new Circle(8)
// console.log(circl1.getArea())
// console.log(circl1.getLength())


// გააკეთეთ BankAccount კლასი, რომელსაც ექნება შემდეგი მეთოდები
// deposit(amount) ბანანსი გაიზრდება იუზერის
// withdraw(amount) უნდა შეამოწმოთ თუ ბალანსი ნაკლებია გასატან თანხაზე დალოგეთ ერორი
// თუ არადა გამოაკელით ბალანსს თანხა
// transfermonyToSomeone(personId, amount) აქაც ვალიდაცია არ დაგავიწყეთ
// getTransactionHistory() => [
    // {time: '2026-06-01T20:24:30.000Z', type: 'DEPOSIT', amount: '', totalBalance: 0 },
    // {time: '2026-06-01T20:24:30.000Z', type: 'WITHDRAW', amount: '', totalBalance: 0 },
    // {time: '2026-06-01T20:24:30.000Z', type: 'DEPOSIT', amount: '', totalBalance: 0 },
    // ]
    // getBalance() დაგიბრუნებთ ამჟამინდელ ბალანსს
    
    // const giosBank = new BankAccount()
    // giosBank.depost(500)
    // giosBank.withdraw(700)
    // giosBank.getTransactionhistory()
    
    // new Date().toISOString()


class BankAccount{
    #balance = 0
    #transactions = []

    #addTranasactionHistory(type, amount){
        this.#transactions.push({
            time: new Date().toISOString(),
            type: type,
            amount: amount,
            totalBalance: this.#balance
        })
    }
    
    deposit(number){
        this.#balance += number
        this.#addTranasactionHistory('DEPOSIT', number)
        console.log('Deposit money successfully')
    }

    withdraw(number){
        if(number > this.#balance){
            console.log('Invalid withdraw number')
            return
        }

        this.#balance -= number
        this.#addTranasactionHistory('WITHDRAW', number)
        console.log('withdraw money successfully')
    }

    transferMoneyToSomeone(personId, number){
        if(number > this.#balance){
            console.log('Invalid transfer money')
            return
        }

        this.#balance -= number
        this.#addTranasactionHistory('TRANSFERMONEY', number)
        console.log('trannsfered money successfully')
    }

    getTransactionsHistory(){
        return this.#transactions
    }

    getBalance(){
        return this.#balance
    }
}

const giorgisBank = new BankAccount()
giorgisBank.deposit(400)
giorgisBank.withdraw(200)
giorgisBank.transferMoneyToSomeone('0101233123', 200)
giorgisBank.transferMoneyToSomeone('0101233123', 200)
giorgisBank.deposit(500)
console.log(giorgisBank.getTransactionsHistory())
console.log(giorgisBank.getBalance())


class ShoppingCart{
    addCart(){}

    deleteCart(){}

    totalSum(){}

    updateCartItem(){}
}