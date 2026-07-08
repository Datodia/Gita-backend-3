
const userName = "giorgi"
const userAge = 22
const isSmoker = false

// console.log(isSmoker + userAge) 
// console.log(userName.push('gela'))
// console.log(userName)
// console.log(userAge)
// console.log(isSmoker)

function sum({a, b, isPositive, isNegative}: {a: number, b: number, isPositive?: boolean, isNegative?: boolean}){
    const resp = a + b
    return isPositive ? Math.abs(resp) : resp
}

console.log(sum({a: 20, b: 40, isNegative: true}))
console.log(sum({a: 10, b: -40, isPositive: true}))

// void functions
function doSomething(){
    console.log('did something')
}


const numbers: any[] = [1,2,3, false, 'string']
const strings: string[] = ['a', 'b', 'c']

function log(msg: any){
    console.log(msg)
}

log("asd")

interface Address {
    home: string,
    work: string
}

interface IStudent {
    name: string,
    age: number,
    isSmoker: boolean,
    address: Address
}

interface IUser extends IStudent {
    hobbies: string[]
}

const student: IStudent = {
    name: "giorgi",
    age: 22,
    isSmoker: false,
    address: {
        home: "test",
        work: "test2"
    }
}

type BtnVariant = 'SM' | 'MD' | 'LG'

function drawButton(variant: BtnVariant){
    const options = {
        'MD': "16px",
        "SM": "12px",
        'LG': "20px"
    }
    return options[variant]
}

drawButton('LG')

function getUserInfo(student:IStudent){
    return student.name
}

// getUserInfo({})


function getErrorMessage(err: unknown): string | null{
    if(!err) return null
    if(typeof err === 'string'){
        return err
    }

    if(typeof err === 'object' && 'message' in err && typeof err.message === 'string' ){
        return err.message
    }

    if(typeof err === 'object' && Array.isArray(err) && err.every(el => typeof el === 'string')){
        return err.map(el => el).join(', ')
    }

    return null
}

getErrorMessage({error: 'erro happend'})





class User {
    protected name
    private age
    readonly isSmoker
    constructor(name: string, age: number, isSmoker: boolean){
        this.name = name
        this.age = age
        this.isSmoker = isSmoker
    }

    static getRandomInfo(){
        console.log('random info')
    }

    sayHello(){
        console.log('hello world')
    }

    logUserInfo(){
        console.log(`My name is ${this.name} and im ${this.age} y.o.` )
    }
}

User.getRandomInfo()

class User2 extends User{
    constructor(name: string, age: number, isSmoker: boolean){
        super(name, age, isSmoker)
    }

    logUser2info(){
        this.name = 'kaxa'
        console.log(this.name)
    }
}

const user1 = new User('giorgi', 22, false)
console.log(user1.isSmoker)
const user3 = new User2('nika', 22, false)

user3.logUser2info()

// user1.logUserInfo()



function getUserData(): Promise<{name: string}>{
    return new Promise(res => {
        setTimeout(() => {
            res({name: "user 1"})
        }, 1000)
    })
}

async function main(){
    const response = await getUserData()
    response.name
}

function getFirstItem<T>(arr: T[]): T | undefined{
    return arr[0]
}

getFirstItem<number>([1,2,3]) // => 1
getFirstItem<string>(['test', 'test12', 'test3']) // => test
getFirstItem<boolean>([false, true, false]) // => test
getFirstItem<{a: string}>([{a: 'b'}]) // => test