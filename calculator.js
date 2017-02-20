var operation = null; 
var cachedTotal = null; 
var isNewNumber = true; 

// Resets the status window by replacing the current number with 0.
// Also clears the cached total and operation
function clearStatus() {
	var status = document.getElementById("status");
	status.value = "0";
	operation = null;
	cachedTotal = null;
	isNewNumber = true; 
}	

// Appends digit to the status window if a number is currently entered.
// Replaces the number in the status window if no number is entered
function append(digit) {
	var status = document.getElementById("status");
	
	if (isNewNumber) {
		status.value = digit.toString();
	}
	if (!isNewNumber || status.value == "0" ) {
		status.value += digit.toString();
	}

	isNewNumber = false; 
}

// Sets the arithmetic operation 
function setOperation(newOperation) {
	//An operation has been entered - next digit keyed is new number
	isNewNumber = true; 

	//Cache the number entered before the operation char
	var status = document.getElementById("status");
	if (cachedTotal == null) {
		cachedTotal = status.value; 
	}
	else {
		cachedTotal = solve(cachedTotal, status.value);
	}

	if (operation != null) {
		status.value = solve(cachedTotal, status.value); 
	}

	cachedTotal = status.value; 
	operation = newOperation;
}

function calculate() {
	var status = document.getElementById("status");
	status.value = solve(cachedTotal, status.value);
	cachedTotal = status.value; 
	secondNumber = null;
	operation = null; 
}

// Solves the current equation based on entered inputs
function solve(num1, num2)
{
	if (num1 == null || operation == null)
	{
		return 0;
	}
	if (num2 == null)
	{
		return num1; 
	}
 
	var operand1 = parseInt(num1);
	var operand2 = parseInt(num2);

	switch (operation) {
		case "+":
			return operand1 + operand2;
		case "-":
			return operand1 - operand2;
		case "*":
			return operand1 * operand2;
		case "/":
			return operand1 / operand2;
	}
}