function clearStatus() {
	var status = document.getElementById('status');
	status.value = "";
}	

function append(num) {
	var status = document.getElementById('status');
	status.value += num;
}

function solve(num)
{
	var status = document.getElementById('status');
	var total = calculate();
	status.value = total; 
}

function add(numA, numB) {
	return numA + numB;
}

function sub(numA, numB) {
	return numA - numB;
}

function mul(numA, numB) {
	return numA * numB;
}

function div(numA, numB) {
	return numA / numB; 
}

function calculate() {
	var equation = document.getElementById('status').value;
	var result = 0;  
	var currentNumber; 
	var operator = null; 
	
	for (var i = 0; i < equation.length; i++) {
		var equationPart = parseInt(equation[i]);
		var tensPower = 0;

		if (isNaN(equationPart))
		{
			if (operator != null)
			{
				//We saw an operator previously and have a number to calculate
				result = executeMath(result, currentNumber, operator);
				operator = null; 		
				tensPower = 0;
			}
			else
			{
				//We have an operator, get second number
				operator = equation[i];
				result = currentNumber;
				currentNumber = 0;	
			}
		}
		else
		{
			//We see a digit, build a number
			currentNumber = equationPart * Math.pow(10, tensPower);
			tensPower++;
		}
	}

	result = executeMath(result, currentNumber, operator);

	return result; 
}

function executeMath(result, currentNumber, operator) {
	switch (operator)
	{
		case "+":
			return add(result, currentNumber);
		case "-":
			return sub(result, currentNumber);
		case "*":
			return mul(result, currentNumber);
		case "/":
			return div(result, currentNumber);
		default:
			alert("Error! + " + operator + " is an illegal character!")
	}
}