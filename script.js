let operator
let operand1 = ''
let operand2 = ''

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
                equal()
                break;
            case 'clear':
                clear()
                break;
            case 'delete':
                deleteOne()
                break;
            case 'sign':
                sign()
                break;
            default:
                break;
        }
    }
})

function operate(operand1, operand2, operator) {
    operand1 = Number(operand1)
    operand2 = Number(operand2)

    switch (operator) {
        case '+':
            return String(operand1 + operand2)
        case '-':
            return String(operand1 - operand2)
        case '*':
            return String(operand1 * operand2)
        case '/':
            return String(Math.round((operand1 / operand2 + Number.EPSILON) * 100) / 100)
        default:
            break;
    }
}

function equal() {
    if (operand1 && operand2 && operator) {
        operand1 = operate(operand1, operand2, operator)
        operand2 = ''
        screen.textContent = operand1
    }
    else if (operand1 && !operator) {
        // When the user type in with too many 0 in the beginning, only show the
        // number form of the string (e.g: 00032 => 32)
        screen.textContent = Number(operand1)
    }
    else {
        screen.textContent = "ERROR"
    }
}

function clear() {
    operand1 = ''
    operand2 = ''
    operator = ''
    screen.textContent = ''
}

function deleteOne() {
    if (operand2) {
        operand2 = operand2.substring(0, operand2.length - 1)
        screen.textContent = operand2
        return
    }
    else if (!operand2 && operator) {
        operator = ''
        return
    }
    else if (operand1) {
        operand1 = operand1.substring(0, operand1.length - 1)
        screen.textContent = operand1
        return
    }
}

function sign() {
    if (operand2) {
        operand2 = -Number(operand2)
        screen.textContent = operand2
        return
    }
    else if (operand1) {
        operand1 = -Number(operand1)
        screen.textContent = operand1
        return
    }
}