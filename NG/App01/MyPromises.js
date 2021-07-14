//2 states: spending, fulfilled, rejected
const promise1 = new Promise((resolve, reject) => {
    let myNumber = Math.random();
    setTimeout(function(){
        if (myNumber > 0.5){
            resolve();
        } else {
            reject();
        }
    }, 3000);
});
//////////////////
console.log("App start");
const handleError = function(){
    console.log("Error in Promise 1");
}

const printResult = function(){
    console.log("Promise1 done");
}
promise1.then(printResult).catch(handleError);
console.log("App end");