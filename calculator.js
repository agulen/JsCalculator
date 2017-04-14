//Holds the current calculator operation (add, subtract, multiply, divide, equals)
var operation = null; 

//Maintains cached total for when user chains operations together
var cachedTotal = 0; 

//Boolean set to true for when the number entered should replace the current number in the calculator
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
function append(char) {
	var status = document.getElementById("status");
	
	if (isNewNumber) {
		status.value = char.toString();
	}
	else {
		//Don't allow multiple deicmal points to be entered
		if (char == "." && status.value.includes(".")) {
			return;
		}
		status.value += char.toString();
	}

	isNewNumber = false; 
}

// Sets the arithmetic operation 
function setOperation(newOperation) {

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
	isNewNumber = true; 
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

    if (charCode == 8)
    {
    	alert(charCode);
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

//Handle keyboard input for backspace/delete key
document.onkeyup = function(event) {
	var key = event.keyCode || event.charCode;

	if (key == 8 || key == 46)
	{
		clearStatus();
	}
};




