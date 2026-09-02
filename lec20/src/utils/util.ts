

export const sum = (a: number, b: number) => {
    return a + b
}


export const reverseStr = (str) => {
    return str.split('').reverse().join('')
}


export const addItemToTheEnd = (arr: number[], item) => {
    if(typeof arr === 'object' && Array.isArray(arr)){
        arr.push(item)
    }
    return arr
}



export const compileAndroidCode = () =>{
  throw new Error('you are using the wrong JDK!');
}