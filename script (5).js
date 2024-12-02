const display = document.getElementById("display");
let currentInput = "0";
let previousInput = "";
let operator = "";
let isEvaluated = false;

function updateDisplay(value) {
  display.innerText = value;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  isEvaluated = false;
  updateDisplay(currentInput);
}

function handleNumber(num) {
  if (isEvaluated) {
    currentInput = num;
    isEvaluated = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (isEvaluated) {
    isEvaluated = false;
  }
  if (operator && previousInput && currentInput) {
    evaluate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "0";
}

function handleDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}

function evaluate() {
  if (!operator || !previousInput || !currentInput) return;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  let result = 0;
  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  isEvaluated = true;
  updateDisplay(currentInput);
}

document.querySelectorAll(".number").forEach((button) =>
  button.addEventListener("click", () => handleNumber(button.innerText))
);

document.querySelectorAll(".operator").forEach((button) =>
  button.addEventListener("click", () => handleOperator(button.innerText))
);

document.getElementById("decimal").addEventListener("click", handleDecimal);
document.getElementById("equals").addEventListener("click", evaluate);
document.getElementById("clear").addEventListener("click", clearAll);

// Initialize display
updateDisplay(currentInput);
