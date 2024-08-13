let operator
let operand1 = ''
let operand2 = ''

function operate(operand1, operand2, operator) {
    operand1 = Number(operand1)
    operand2 = Number(operand2)

    switch (operator) {
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
        case '*':
            return operand1 * operand2
        case '/':
            return Math.round((operand1 / operand2 + Number.EPSILON) * 100) / 100
        default:
            break;
    }
}

const container = document.querySelector('.container')
const screen = document.querySelector('.screen')
const operators = document.querySelectorAll('.operator')

container.addEventListener('click', (e) => {
    // When the user for the first time clicks a digit, assign what they click
    // until they click an operator to operand1, what typed after that is operand2 
    if (e.target.classList.contains('operator')) {
        if (operand1 && operand2 && operator) {
            operand1 = operate(operand1, operand2, operator)
            operand2 = ''
            screen.textContent = operand1
        }
        if (operand1) {
            operator = e.target.textContent
        }
    }
    else if (e.target.classList.contains('operand')) {
        if (operator) {
            operand2 += e.target.textContent
            screen.textContent = operand2
        }
        else {
            operand1 += e.target.textContent
            screen.textContent = operand1
        }
    }
    else {
        switch (e.target.id) {
            case 'equal':
                operand1 = operate(operand1, operand2, operator)
                operand2 = ''
                screen.textContent = operand1
                break;
            default:
                break;
        }
    }
})