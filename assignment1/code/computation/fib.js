const fib = function fib(number){
    number = Math.abs(number);
    if(number <= 2){
        return 1;
    } else {
        return fib(number - 1) + fib(number  - 2);
    }
}

console.log("Fibonacci of 25 is "+fib(25));
console.log("Fibonacci of -17 is "+fib(-17));