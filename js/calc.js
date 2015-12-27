
var input;
var total = 0;
var sub = "";
var str = "";
var count = 0;


// Ready
$( document ).ready( function(){
	
	// Button Listener
	$('.button-area').find('li').click(function (){
		// Save input
		input = $(this).text(); 
		
		try{
			switch( input ){
				case 'AC': // All Clear
					total = 0;
					sub = "";
					str = "";
					$('#bot').text(" ");// alt+255
					$('#top').text(" ");// alt+255
					break;

				case 'CE': // Clear last
					str = str.substring(0, str.length - 1);
					if(str.length > 1){
						$('#bot').text(str);
					} else {
						$('#bot').text(" ");
						$('#top').text(total);
					}
					break;
				
				case '=': // Equals
					sub += str;
					total = eval(sub);
					$('#top').text(total);
					$('#bot').text(" ");
					str = " ";
					break;
					
				case '÷': // Change divide
					// if there isn't already a '/'
					if(opChk(input)) {
						inputError(input);
					} else {
						sub += str + " / ";
					}// end else
					moveToTop('÷');
					break;

				case 'x': // Change multiply
					// if there isn't already a '*'
					if(opChk('*')) {
						inputError(input)
					} else {
						sub += str + " * ";
					}// end else
					moveToTop('x');
					break;

				case '%': // Get percentage of current sub-total
					str = " " + (eval(str) / 100) + " ";
					$('#bot').text(str);
					break;
					
				case '-':
					sub += str + " " + input  + " ";
					moveToTop('-');
					break;
					
				case '+':
					sub += str + " " + input  + " ";
					moveToTop('+');
					break;
					
				default: // Everything else
					str += input;
					$('#bot').text(str);
					break;
			}// end switch
			
			
		} catch( ex ) {
			alert(ex + "An error has occured.\nClearing all data");
			sub = "";
			str = "";
			total = 0;
		}// end try catch block
		
	});	// end click
});// end ready

// Alert errors
function inputError(entry){
	alert("Error: Expected a number but recieved \"" + entry + "\".");
}

// check for multiple math operators
function opChk(entry){
	var chk = sub.substr(sub.length - 2, 1); // extract last entry
	return (chk === '/' || chk === '*');
}

function moveToTop(op){
	
	var current = sub.substring(0, sub.length - 3);
	total = eval(current);
	
	str = " ";
	
	$('#bot').text(" ");
	$('#top').text(total + " " + op);
}