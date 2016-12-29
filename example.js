
var c = undefined;

foo();
console.log(c);
function foo(){
     c = 'test'
    console.log('Im First!');
}

process.exit(0);