class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {

        // Prevent period from appearing multiple times
        if (number === '.' && this.currentOperand.includes('.')) return;

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // If the currentOperand in blank, ignore the operation
        if (this.currentOperand === '') return;

        // If the previousOperand is not blank, go and run the calculation
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
    }

    compute() {
        let computation; // hold the calculated value

        // Convert both perands to floats so we can work our Maths
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // If either one ends up being an invalid number, abort mission
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            
            case '−':
                computation = prev - current;
                break;

            case '÷':
                computation = prev / current;
                break;

            case '×':
                computation = prev * current;
                break;

            case '%':
                computation = (prev / 100) * current;
                break;

            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined;
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        // return Intl.NumberFormat().format(number);

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);

        // If one of the operators hs been clicked
        if (this.operation != null) {
            // display the result along with the active operator in the previousOperand Element
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else { // basically, we've clicked equals instead of an operator
            // dislay just the reslt in the previousOperand Element so it is large, since this is the fina answer
            this.previousOperandText.innerText = this.getDisplayNumber(this.currentOperand);
            // Empty out the currentOperand since we're not currenly providing any new operand
            this.currentOperandText.innerText = '';
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
})
