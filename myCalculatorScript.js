/*
-------------
Variables
-------------
*/

let previousNumber = '';
let currentNumber = '';
let operatorBtn = '';
let result = 0;
let clicks = 0;

/*
-------------
DOM Selectors
-------------
*/

const bottomScreenValue = document.querySelector(".bottom-screen");
const topScreenValue = document.querySelector(".top-screen");
const decimal = document.getElementById('btn-dot');
const numberButton = document.querySelectorAll('.btn');
const operatorButton = document.querySelectorAll('.btn-operator');
const resetContent = document.querySelector('.reset-btn');
const equal = document.querySelector('.btn-operator-equal');
const deletebtn = document.querySelector('.delete-btn');



window.addEventListener('keydown', handleKeyPress);


/*
-------------
Default Display
-------------
*/

topScreenValue.textContent = '';
bottomScreenValue.textContent = '0';

/*
---------------
Event Listeners
---------------
*/

resetContent.addEventListener('click', resetScreen);
equal.addEventListener('click', () =>{
    if (previousNumber != '' && currentNumber != '') {
        compute();
    }
});
deletebtn.addEventListener('click', removeLastChar);
decimal.addEventListener('click', addDecimal);
numberButton.forEach((button) =>{
    button.addEventListener('click', (e) => {
        numberHandler(e.target.textContent);
    })
});

operatorButton.forEach((button) =>{
    button.addEventListener('click', (e) => {
        operatorHandler(e.target.textContent);
    })
});



/*
----------
FUNCTIONS
----------
*/


//Handle number button
 function numberHandler(number){
    currentNumber += number;
    bottomScreenValue.textContent = currentNumber;
 }

 //Handle operator button
 function operatorHandler(operator){
    if (previousNumber === '') {
        previousNumber = currentNumber;
        operatorCheck(operator);
    }else if(currentNumber === ''){
        operatorCheck(operator);
    }
    else{
        compute();
        operatorBtn = operator;
        topScreenValue.textContent = previousNumber + ` ${operatorBtn} `;
        bottomScreenValue.textContent = '';
    }
 }

function operatorCheck(op){
    operatorBtn = op;
    topScreenValue.textContent = previousNumber + ` ${operatorBtn} `;
    bottomScreenValue.textContent = '';
    currentNumber = '';
}

//Remove last char from current number entered
function removeLastChar() {
    if (currentNumber != '') {
        currentNumber = currentNumber.slice(0,-1);
        bottomScreenValue.textContent = currentNumber;
    }
}

 
 // Compute operations
 function compute(){
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    previousNumber = operate(operatorBtn, previousNumber, currentNumber);

    topScreenValue.textContent = previousNumber;
    bottomScreenValue.textContent = '';
    currentNumber = '';
 }


// Reset screen / variables
function resetScreen(){
    topScreenValue.textContent = '';
    bottomScreenValue.textContent = '0';
    currentNumber = '';
    previousNumber = '';
    operatorBtn = '';

}

//add decimal
function addDecimal(){
    //check if current number has decimal already
    //if not add it in
        if (!currentNumber.includes('.')) {
            currentNumber += '.';
            bottomScreenValue.textContent = currentNumber;
        }
  
    }

// handle key press

function handleKeyPress(e){
    e.preventDefault();
    if (e.key>=0 && e.key <=9) {
        numberHandler(e.key);
    }
    if (e.key === "Enter" || e.key ==="=" && currentNumber != '' && previousNumber != '') {
        compute();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        operatorHandler(e.key);
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key ==="Backspace") {
        removeLastChar();
    }

}


// math operations used in compute() function
function operate(operation, x, y){
    switch (operation) {
        case '+':
            return calculate(addition, x, y);
        case '-':
            return calculate(substraction, x, y);   
        case '*':
            return calculate(mutiplication, x, y);     
        case '/':
            if (currentNumber === 0) {
                previousNumber = "Error";
                return previousNumber;
            }
            return calculate(division, x, y);
        default:
            break;
    }
}

function calculate(operation, x, y){
    return operation(x, y);
}
//add function
function addition(x, y){
    return x + y;    
}
//minus function
function substraction(x, y){
    return x - y;
}
//divide function
function division(x, y){
    return x / y;
}
//mutiply function
function mutiplication(x, y){
    return x * y;
}







