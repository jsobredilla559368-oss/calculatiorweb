let display = document.getElementById('display');
const themeToggler = document.getElementById('theme-toggler');
const body = document.body;
const icons = themeToggler.querySelectorAll('i');


/* Calc logic */

function appendNumber(number) {
    if (display.value === 'Error') display.value = '';
    display.value += number;
}


function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (display.value === '') return;

    // Allow % to be appended after a number or closing parenthesis
    if (operator === '%') {
        if (lastChar === '') return;
        display.value += operator;
    } else {
        if (['+', '-', '*', '/', '%'].includes(lastChar)) return;
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        display.value = display.value.toString().slice(0, -1);
    }
}

function calculate() {
    try {
        if (display.value === '') return;


        let expression = display.value;
        expression = expression.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');

        let result = eval(expression);
        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }

    } catch (error) {
        display.value = "Error";
    }
}

themeToggler.addEventListener('click', () => {
    body.classList.toggle('dark');
})

// Toggle active icon state
icons.forEach(icon => {
    icon.classList.toggle('active');
});



