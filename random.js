
// function somefunction() {
//     randomotp = Math.floor((Math.random() * 100000) + 100000)
//     console.log(randomotp);
//     return randomotp
// }
// somefunction();
// console.log(randomotp);
// function tryfunction() {
//     sum = randomotp / 100000
//     console.log(sum);
// }
// tryfunction();

function getMyCallback(randomValue) {
    return function (otherParam) {
        otherParam = 5234;
        return randomValue * otherParam //or whatever it is you are doing.
    }

}

var myCallback = getMyCallBack(getRand())

console.log(myCallBack(1))
console.log(myCallBack(2))
