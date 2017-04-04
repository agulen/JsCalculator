var operation = null; 
var cachedTotal = 0; 
var isNewNumber = true; 

// Resets the status window by replacing the current number with 0.
// Also clears the cached total and operation
function clearStatus() {
	var status = document.getElementById("status");
	status.value = "0";
	cachedTotal = 0;
	isNewNumber = true;
	operation = null; 
}	

// OnClick listener for the number buttons.
// Appends digit to the status window if a number is currently entered.
// Replaces the number in the status window if no number is entered
function append(digit) {
	var status = document.getElementById("status");
	
	if (isNewNumber) {
		status.value = digit.toString();
	}
	else {
		//Don't allow multiple deicmal points to be entered
		if (digit == "." && status.value.includes(".")) {
			return;
		}
		status.value += digit.toString();
	}

	isNewNumber = false; 
}

// Sets the arithmetic operation 
function setOperation(newOperation) {
	//If an operation has been entered, but a number hasn't yet, don't take any action
	if (isNewNumber) {
		return;
	}

	//An operation has been entered - next digit keyed is new number
	isNewNumber = true; 

	var status = document.getElementById("status");
	if (cachedTotal == 0) {
		cachedTotal = status.value; 
	}
	else {
		cachedTotal = solve(cachedTotal, status.value);
	}

	if (operation != null) {
		status.value = cachedTotal;
	}

	cachedTotal = status.value; 
	operation = newOperation;
}

// OnClick listener for the '=' button
// Calculates the total based on cachedTotal and currently entered number
function calculate() {
	var status = document.getElementById("status");
	status.value = solve(cachedTotal, status.value);
	cachedTotal = status.value;
	operation = null; 
}

// Solves the current equation based on entered inputs
function solve(cachedTotal, currentNumber)
{
	if (currentNumber == null || operation == null)
	{
		return cachedTotal; 
	}
 
	var operand1 = parseFloat(cachedTotal);
	var operand2 = parseFloat(currentNumber);

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

// Handles keyboard input for character input
document.onkeypress = function(event) {
    var charCode = event.keyCode || event.which;

    if (charCode == 8 || charCode == 46)
    {
    	alert('delet!');
    }

    var charStr = String.fromCharCode(charCode);
    
    switch (charStr)
    {
    	case '1':
    	case '2':
    	case '3':
    	case '4':
    	case '5':
    	case '6':
    	case '7':
    	case '8':
    	case '9':
    	case '0':
    	case '.':
    		append(charStr);
    		break;
    	case '+':
    	case '-':
    	case '*':
    	case '/':
    		setOperation(charStr);
    		break;
    	case '=':
    	case '\r':
    		calculate();
    	default:
    		break;
    }
};

//Handled keyboard input for backspace/delete key
document.onkeyup = function(event) {
	var key = event.keyCode || event.charCode;

	if (key == 8 || key == 46)
	{
		clearStatus();
	}
};




