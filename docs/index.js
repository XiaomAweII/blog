
let target = {
    a :1
}

let b =  {...target}


console.log(b);

let a = [1,2,3];

let c = [...a];

console.log(c);

let t2 = {
    a1:1,
    b1:2,
    c1:3
}


const {a1,b1,c1} = t2
console.log(a1);


Object.defineProperty(t2,"d",{
    writable:true,
    enumerable:true,
    configurable:true,
    value:"hello"
})


console.log(t2);