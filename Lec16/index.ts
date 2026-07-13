
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
// function doSomething(){
//     console.log('did something')
// }


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

// type BtnVariant = 'SM' | 'MD' | 'LG'

// function drawButton(variant: BtnVariant){
//     const options = {
//         'MD': "16px",
//         "SM": "12px",
//         'LG': "20px"
//     }
//     return options[variant]
// }

// drawButton('LG')

// function getUserInfo(student:IStudent){
//     return student.name
// }

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

// function getFirstItem<T>(arr: T[]): T | undefined{
//     return arr[0]
// }

// getFirstItem<number>([1,2,3]) // => 1
// getFirstItem<string>(['test', 'test12', 'test3']) // => test
// getFirstItem<boolean>([false, true, false]) // => test
// getFirstItem<{a: string}>([{a: 'b'}]) // => test



type TupleCoordinates = [number, number]
const coordinates: TupleCoordinates = [41.123123, 42.123123]


type UseStateTupe = [number, Function]
function useState(initVal?: any): UseStateTupe{
    let val = initVal
    function setState(num: any){
        val = num
    }

    return [val, setState]

}

const [count, setCount] = useState(0)



function getUserInfo(str: string): [string, number] | null{
    if(!str && !str.length) return null
    const [name, age] = str.split(', ')

    return [name as string, Number(age)]
}

// getUserInfo('giorgi, 25') //=> [name, userAge]
// getUserInfo('marika, 26') //=> [name, userAge]


const Role1 = {
    VIEWER: 'viwer',
    EDITOR: 'editor',
    ADMIN: 'admin'
}

// Role1['VIEWER'] = 'admin'

enum Role {
    VIEWER = 'viwer',
    EDITOR = 'editor',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super admin',
}

enum StatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

enum Reason {
    'IN_PROGRESS' = ''
}

// res.status(StatusCode.BAD_REQUEST).json()

// Role['ADMIN'] = 'VIWER'


// if(req.header.role === 'admin')
// if(req.header.role === Role.)
// console.log(Role1.VIEWER, "viewer")



function getSomething(val: string | number | string[]){
    if(typeof val === 'string'){
        val.includes('')
    }

    if(typeof val === 'number'){
        val.toFixed()
    }

    if(typeof val === 'object' && Array.isArray(val)){
        val
    }
}






type User1 = {
    _id: string,
    name: string,
    age: number,
    isSmoker: boolean,
    phoneNumber?: number,
    email?: string,
    address: string
}

// Utility types
type University = Pick<User1, 'name' | 'address' | 'email' | 'phoneNumber'>
type Director = Omit<User1, 'address' | 'email'>
//CRUD => Create, Update, Delete, Read
type UpdateUser1 = Partial<Omit<User1, '_id'>>
type ReqUser1 = Required<User1>

type BtnVariant = 'sm' | 'md' | 'lg'

const btnObj: Record<BtnVariant, string> = {
    'sm': "24px",
    'md': '30px',
    'lg': '36px',
    // 'xs': '20px'
}

const university1: University = {
    phoneNumber: 123123123,
    address: 'asd',
    email: 'asdas',
    name: 'asdasd'
}

type Person = {
    gender: 'F' | 'M'
}

type Student = User1 & {
    grade: number
}

type Lector = Student & Person & {
    groups: string[]
}



// function doSomething(param: unknown){
//     if(typeof param === 'string'){
//         return param.slice(0, 10)
//     }

//     if(typeof param === 'number'){
//         return
//     }
// }

// doSomething(10)


type NeverType = number & string // '10'



function getRole(role: Role){
    switch(role){
        case Role.ADMIN:
            return 'ADMiN'
        case Role.EDITOR:
            return 'EDITOR'
        case Role.VIEWER:
            return 'Viewer'
        default:
            // let unreachable: never = role
    }
}