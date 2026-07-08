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
function doSomething() {
    console.log('did something');
}
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
function drawButton(variant) {
    const options = {
        'MD': "16px",
        "SM": "12px",
        'LG': "20px"
    };
    return options[variant];
}
drawButton('LG');
function getUserInfo(student) {
    return student.name;
}
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
function getFirstItem(arr) {
    return arr[0];
}
getFirstItem([1, 2, 3]); // => 1
getFirstItem(['test', 'test12', 'test3']); // => test
getFirstItem([false, true, false]); // => test
getFirstItem([{ a: 'b' }]); // => test
//# sourceMappingURL=index.js.map