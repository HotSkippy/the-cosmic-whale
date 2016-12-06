var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");


init();

function init(){
	//mode buttons event listeners
	setUpModeButtons();
 	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
		 //add listeners to squaresS
		 squares[i].addEventListener("click", function(){
		 	//grab color of clicked square
				var clickedColor = this.style.background;
				//compare clicked color to picked color
		 	if(clickedColor === pickedColor){
		 		messageDisplay.textContent = "Correct!";
		 		resetButton.textContent = "Play Again?"
		 		changeColors(pickedColor);
		 		h1.style.background = pickedColor;
		 	}else{
		 		this.style.background = "#232323";
		 		messageDisplay.textContent = "Try Again";
		 	}
		});
	}
}

function reset(){
	//reset button text
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
	    squares[i].style.display = "block";
	 	squares[i].style.background = colors[i];
		}else{
		squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
	//change each color to match given color
	 squares[i].style.background = color;
	}
 }

 function pickColor(){
 	var random = Math.floor(Math.random() * colors.length);
 	return colors[random];
 }

function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
	  //get random color and push into arr
	  arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256)
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256)
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256)
	return "rgb("+r+", "+g+", "+b+")";
}