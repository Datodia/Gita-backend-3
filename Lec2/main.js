// var, let, const

let userName = "Nika";
userName[0] = "L";

// console.log(userName)

const names = ["nika", "dato", "giorgi"];
names[0] = "lika";

// console.log(names)

let userAge = 22;
let userAge2 = userAge;

userAge2 = 25;
// console.log(userAge, "userAge")
// console.log(userAge2, "userAge2")

let user = {
  age: 22,
};
let user2 = user;
user2.age = 25;

// console.log(user.age, "user.age")
// console.log(user2.age, "user2.age")

const str = "h1e1l1l1o";
const str2 = "world";

// console.log(str.indexOf('R'))
// console.log(str.includes('h11o'))
// console.log(str.startsWith('h1'))
// console.log(str.endsWith('1o'))
// console.log(str.replaceAll('1', ''))
// console.log(str.charAt(1)) // [1]
// console.log(str.slice(2))
// console.log(str.toUpperCase())
// console.log(str.concat(str2)) // str + str2
// console.log(str.trim().length)
// const fullStr = str + " " + str2 // Bad Example
// const fullStr = `${str} ${str2} asdas jhasdbajhsd` // Better example
// console.log(fullStr)
// const resp = str.split()
// console.log(resp)

const a = 10;

if (a > 20) {
  console.log("metia 20ze");
} else {
  console.log("naklebia 20ze");
}

// a > 20 ? console.log('a metia 20ze') : console.log('naklebia 20ze')

let str3 = "Javascript";

for (let i = 1; i <= 100; i++) {
    if(i % 15 === 0){
        console.log('FizzBuzz')
    }else if(i % 3 === 0){
        console.log('Fizz')
    }else if(i % 5 === 0) {
        console.log('Buzz')
    }else{
        console.log(i);
    }
}

function Getcount(word, letter) {
    let mtvleli = 0;
    for (let i=0; i<=word.length; i++) {
        if (word[i] === letter.toLowerCase()) {
            mtvleli++;
        }
    }
    return mtvleli;
}
console.log(Getcount("javascript","A"))

// function getStrin(sentence, char){

// }

// getStrin('asdasdadsasd', 'a') //=> 4


//დაწერთ ფუნცქია რომელიც მიირებს 1 პარამეტრს(წინაადედბას) და იპოვეთ ყველაზე გრძელი
// სიტყვა ამ წინადადებაში

function getLongestWord(sentence){
    const words = sentence.split(' ')

    // Option 2
    const sortedArr = words.sort((a, b) => { return b.length - a.length})
    return sortedArr[0]

    // Option 1
    // let longestWord = words[0]

    // for(let i = 0; i < words.length; i++){
    //     if(words[i].length > longestWord.length){
    //         longestWord = words[i]
    //     }
    // }

    // return longestWord
}

const res = getLongestWord('Hello world test teestststst asdasd asdasd asdasd') //=> teestststst
console.log(res, "response")