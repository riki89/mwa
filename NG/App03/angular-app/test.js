setTimeout(()=> {console.log("TimeOut")});
setImmediate( () => console.log("Immediate"));
process.nextTick(() =>{console.log("Next tick queue")});
