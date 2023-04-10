// Description: This is the main script file for the calculator app
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

// DOM elements , select elements from the DOM with criterias
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

// event listeners

// listen to all number buttons, when pressed down add the number to the screen
window.addEventListener('keydown', handleKeyboardInput)

equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

// add 'click' event listeners to all number buttons
// when clicked, call the appendNumber function with the number as argument
// the number is the button's text content which is 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

// functions

// check if screen = 0 or shouldResetScreen =true , if so, reset screen
// then add the number to the screen
function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
  }

// reset screen to 0
function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
  }

// clear all variables and reset screen
function clear() {
    //reset screen
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
  }

//ensure the state of calculator screen before append decimal point
function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
  }

//remove the last number from the screen
    // convert the screen's text content to a string
    // slice the string from the beginning to the end -1
    // set the screen's text content to the new string
    // (0,-1) does not include the last character
function deleteNumber() {
        currentOperationScreen.textContent = currentOperationScreen.textContent
          .toString()
          .slice(0, -1)
}

// evaluate the operation
// convert the screen's text content to a number
// if there is a current operation, evaluate it
// set the screen's text content to the result

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
  }

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
  }

// round to 4 decimal places
function roundResult(number) {
    return Math.round(number * 10000) / 10000
  }

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }

function add(a, b) {
    return a + b
  }
  
  function substract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '−':
        return substract(a, b)
      case '×':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }