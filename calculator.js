var operation = null; 
var firstNumber = null; 
var secondNumber = null;
var creatingNumber = null; 

// Clears the status window by replacing the current number with 0.
// Also clears any cached operations 
function clearStatus() {
	var status = document.getElementById("status");
	status.value = "0";
	operation = null;
	firstNumber = null;
	secondNumber = null; 
}	

// Appends num to the status window if a number is currently entered
// Replaces the number in the status window if no number is entered
function append(digit) {
	var status = document.getElementById("status");
	var currentNum = status.value;

	if (creatingNumber) {
		status.value = currentNum + digit.toString();
	}
	if (currentNum == "0" || !creatingNumber) {
		status.value = digit.toString();
	}

	creatingNumber = true; 
	printLog();
}

// Sets the arithmetic operation 
function setOperation(newOperation) {
	var status = document.getElementById("status");
	creatingNumber = false; 

	if (firstNumber == null) {
		firstNumber = status.value; 
	}

	if (firstNumber != null && secondNumber != null) {
		firstNumber = solve();
		secondNumber = null;  
	}

	if (operation != null) {
		secondNumber = status.value;
		status.value = solve(); 
	}

	firstNumber = status.value; 
	operation = newOperation;

	printLog();
}

function calculate() {
	var status = document.getElementById("status");
	status.value = solve();
	firstNumber = status.value; 
	secondNumber = null;
	operation = null; 
}

// Solves the current equation based on entered inputs
function solve()
{
	if ((firstNumber == null && secondNumber == null) || operation == null)
	{
		return 0;
	}

	var status = document.getElementById("status");
	var secondNumber = status.value; 
	var total = 0;

	var operand1 = parseInt(firstNumber);
	var operand2 = parseInt(secondNumber);

	switch (operation) {
		case "+":
			total = operand1 + operand2;
			break;
		case "-":
			total = operand1 - operand2;
			break;
		case "*":
			total = operand1 * operand2;
			break;
		case "/":
			total = operand1 / operand2;
			break;
	} 

	return total;
}

function printLog()
{
	console.log("first num: " + firstNumber);
	console.log("second num: " + secondNumber);
	console.log("operation: " + operation);
}