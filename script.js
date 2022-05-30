
const display = document.querySelector(".calculator-input")
const keys = document.querySelector(".calculator-keys")

let displayValue = "0"
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplayValue()

function updateDisplayValue() {
    display.value = displayValue
}

keys.addEventListener("click", function (e) {

    // aşağıda ki butonların dışında başka yere tıklarsa
    if (!e.target.matches("button"))
        return;

    // tek tek silmek için
    if (e.target.classList.contains("single-remove")) {

    }

    // operatör butonu
    if (e.target.classList.contains("operator")) {
        handleOperator(e.target.value);
        updateDisplayValue();
        return;
    }

    // nokta butonu
    if (e.target.classList.contains("decimal")) {
        inputDecimal();
        updateDisplayValue();
        return;
    }

    // AC butonu
    if (e.target.classList.contains("clear")) {
        inputClear();
        updateDisplayValue();
        return;
    }

    // sayı butonları
    inputNumber(e.target.value);
    updateDisplayValue();

})

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false
    } else {
        displayValue = displayValue === "0" ? num : displayValue + num
    }
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += "."
    }
}

function inputClear() {
    if (displayValue != "") {
        displayValue = "0"
    }
}

function handleOperator(oprtr) {

    const value = parseFloat(displayValue)

    if (operator && waitingForSecondValue) {
        operator = oprtr
        return; // sayı ve operator girildikten sonra eşittir dedikten sonra yeni operator = olacak.
    }


    if (firstValue === null) {
        firstValue = value
    } else if (operator) {
        const result = calculate(firstValue, operator, value)

        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result // sonuç firstValue'ye aktarılır ki, yeni bir sayı tekrar girilecekse girilen yeni sayı ile önceki sayılar arasında işlem yapılabilsin.
        // örneğin ilk önce 20 sonra + dediniz 10 değeri girdiniz sonuç 30 oldu. Bu 30 sayısını firstValue eklersiniz ki sonradan - ve 10 derlerse yeni sonucun 20 olduğunu gösterebilesiniz.
    }
    waitingForSecondValue = true
    operator = oprtr
}

function calculate(first, operator, second) {

    switch (operator) {
        case "+":
            return first + second
        case "-":
            return first - second
        case "*":
            return first * second
        case "/":
            return first / second
    }
    return second
}


