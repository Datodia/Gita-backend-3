"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userName = "giorgi";
const userAge = 22;
const isSmoker = false;
// console.log(isSmoker + userAge) 
// console.log(userName.push('gela'))
// console.log(userName)
// console.log(userAge)
// console.log(isSmoker)
function sum({ a, b, isPositive, isNegative }) {
    const resp = a + b;
    return isPositive ? Math.abs(resp) : resp;
}
console.log(sum({ a: 20, b: 40, isNegative: true }));
console.log(sum({ a: 10, b: -40, isPositive: true }));
// void functions
// function doSomething(){
//     console.log('did something')
// }
const numbers = [1, 2, 3, false, 'string'];
const strings = ['a', 'b', 'c'];
function log(msg) {
    console.log(msg);
}
log("asd");
const student = {
    name: "giorgi",
    age: 22,
    isSmoker: false,
    address: {
        home: "test",
        work: "test2"
    }
};
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
function getErrorMessage(err) {
    if (!err)
        return null;
    if (typeof err === 'string') {
        return err;
    }
    if (typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
        return err.message;
    }
    if (typeof err === 'object' && Array.isArray(err) && err.every(el => typeof el === 'string')) {
        return err.map(el => el).join(', ');
    }
    return null;
}
getErrorMessage({ error: 'erro happend' });
class User {
    name;
    age;
    isSmoker;
    constructor(name, age, isSmoker) {
        this.name = name;
        this.age = age;
        this.isSmoker = isSmoker;
    }
    static getRandomInfo() {
        console.log('random info');
    }
    sayHello() {
        console.log('hello world');
    }
    logUserInfo() {
        console.log(`My name is ${this.name} and im ${this.age} y.o.`);
    }
}
User.getRandomInfo();
class User2 extends User {
    constructor(name, age, isSmoker) {
        super(name, age, isSmoker);
    }
    logUser2info() {
        this.name = 'kaxa';
        console.log(this.name);
    }
}
const user1 = new User('giorgi', 22, false);
console.log(user1.isSmoker);
const user3 = new User2('nika', 22, false);
user3.logUser2info();
// user1.logUserInfo()
function getUserData() {
    return new Promise(res => {
        setTimeout(() => {
            res({ name: "user 1" });
        }, 1000);
    });
}
async function main() {
    const response = await getUserData();
    response.name;
}
const coordinates = [41.123123, 42.123123];
function useState(initVal) {
    let val = initVal;
    function setState(num) {
        val = num;
    }
    return [val, setState];
}
const [count, setCount] = useState(0);
function getUserInfo(str) {
    if (!str && !str.length)
        return null;
    const [name, age] = str.split(', ');
    return [name, Number(age)];
}
// getUserInfo('giorgi, 25') //=> [name, userAge]
// getUserInfo('marika, 26') //=> [name, userAge]
const Role1 = {
    VIEWER: 'viwer',
    EDITOR: 'editor',
    ADMIN: 'admin'
};
// Role1['VIEWER'] = 'admin'
var Role;
(function (Role) {
    Role["VIEWER"] = "viwer";
    Role["EDITOR"] = "editor";
    Role["ADMIN"] = "admin";
    Role["SUPER_ADMIN"] = "super admin";
})(Role || (Role = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCode || (StatusCode = {}));
var Reason;
(function (Reason) {
    Reason["IN_PROGRESS"] = "";
})(Reason || (Reason = {}));
// res.status(StatusCode.BAD_REQUEST).json()
// Role['ADMIN'] = 'VIWER'
// if(req.header.role === 'admin')
// if(req.header.role === Role.)
// console.log(Role1.VIEWER, "viewer")
function getSomething(val) {
    if (typeof val === 'string') {
        val.includes('');
    }
    if (typeof val === 'number') {
        val.toFixed();
    }
    if (typeof val === 'object' && Array.isArray(val)) {
        val;
    }
}
const btnObj = {
    'sm': "24px",
    'md': '30px',
    'lg': '36px',
    // 'xs': '20px'
};
const university1 = {
    phoneNumber: 123123123,
    address: 'asd',
    email: 'asdas',
    name: 'asdasd'
};
function getRole(role) {
    switch (role) {
        case Role.ADMIN:
            return 'ADMiN';
        case Role.EDITOR:
            return 'EDITOR';
        case Role.VIEWER:
            return 'Viewer';
        default:
        // let unreachable: never = role
    }
}
//# sourceMappingURL=index.js.map