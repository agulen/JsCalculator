//Holds the current calculator operation (add, subtract, multiply, divide, equals)
var operation = null; 

//Maintains cached total for when user chains operations together
var cachedTotal = 0; 

//Boolean set to true for when the number entered should replace the current number in the calculator
var isNewNumber = true; 

//HTML element ID for button that was pressed
var buttonPressedId = null;

//Character to print to screen when button is pressed
var buttonCharacter = null;

//Did user press a keyboard character that we care about?
var validKey = false;

//Mapping for button press event char code to button ID
var charCodeToButtonId = 
{
	48 : 'Zero',
	49 : 'One',
	50 : 'Two',
	51 : 'Three',
	52 : 'Four',
	53 : 'Five',
	54 : 'Six',
	55 : 'Seven',
	56 : 'Eight',
	57 : 'Nine',
	46 : 'Decimal',
	43 : 'Plus',
	45 : 'Minus',
	42 : 'Times',
	47 : 'Divide',
	99 : 'Clear', 
	61 : 'Equals', //Equals key
	13 : 'Equals' //Enter key
}

// Resets the status window by replacing the current number with 0.
// Also clears the cached total and operation
function clearStatus() {
	var status = document.getElementById('status');
	status.value = "0";

	var clearButton = document.getElementById('buttonClear');
	clearButton.blur();

	cachedTotal = 0;
	isNewNumber = true;
	operation = null;
}	

// OnClick listener for the number buttons.
// Appends digit to the status window if a number is currently entered.
// Replaces the number in the status window if no number is entered
function append(char) {
	var status = document.getElementById('status');
	
	if (isNewNumber) {
		status.value = char.toString();
	}
	else {
		//Don't allow multiple deicmal points to be entered
		if (char == "." && status.value.includes('.')) {
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

	var status = document.getElementById('status');
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
	var status = document.getElementById('status');
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

// Handle keyboard input for character input
document.onkeypress = function(event) {
    var charCode = event.keyCode || event.which;
    buttonCharacter = String.fromCharCode(charCode);
    
    buttonPressedId = 'button'.concat(charCodeToButtonId[charCode]);
    
	if (executeButtonAction(buttonPressedId)) {
	    var button = document.getElementById(buttonPressedId);
	    button.classList.add('pressedButton');
	    validKey = true;
	}
};
document.onkeyup = function(event) {
	var charCode = event.keyCode || event.which;

	if (charCode == 8) {
		clearStatus();
	}

	if (validKey) {   
	    var button = document.getElementById(buttonPressedId);
		button.classList.remove('pressedButton');
	}
};

//Executes an action depending on the button pressed
function executeButtonAction(buttonPressedId)
{
	switch (buttonPressedId) {
    	case 'buttonZero':
    	case 'buttonOne':
    	case 'buttonTwo':
    	case 'buttonThree':
    	case 'buttonFour':
    	case 'buttonFive':
    	case 'buttonSix':
    	case 'buttonSeven':
    	case 'buttonEight':
    	case 'buttonNine':
    	case 'buttonDecimal':
    		append(buttonCharacter);
    		break;
    	case 'buttonPlus':
    		setOperation(buttonCharacter);
    		break;
    	case 'buttonMinus':
    		setOperation(buttonCharacter);
    		break;
    	case 'buttonTimes':
    		setOperation(buttonCharacter);
    		break;
    	case 'buttonDivide':
    		setOperation(buttonCharacter);
    		break;
    	case 'buttonEquals':
    		calculate();
    		break;
    	case 'buttonClear':
    		clearStatus();
    		break;
    	default:
    		return false;
    }

    return true;
}