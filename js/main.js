var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var clickColor = new Array();
var clickWidth = new Array();

var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var drawerVisible,context, curColor, paint, lineWidth;
//var spacing;
var bgColor, bgLineColor, bgLineSpacing, bgLineWidth, bgLineMode;
var width, height;

$(document).ready(function () {

	init();

	$('#canvas').mousedown(function(e){
  		var mouseX = e.pageX - this.offsetLeft;
  		var mouseY = e.pageY - this.offsetTop;
		
  		paint = true;
  		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  		render();
	});

	$('#canvas').mousemove(function(e){
  		if (paint) {
    		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    		render();
  		}
  	});

	$('#canvas').mouseup(function(e){
  		paint = false;
	});

	$('#canvas').mouseleave(function(e){
  		paint = false;
	});

	$("#toggle").click(function() {
		toggleDrawer();
	});

	// ----- IO functions -----
	$("#save").click(function() {
		saveFile();
	});

	$("#open").click(function() {
		loadFile();
	});

	$("#delete").click(function() {
		deleteFile();
	});
	// ----- Background options -----
	$("#line-spacing").click(function() {
		//toggleSpacing();
	});
	// Sliders
	$("#brush-size-slider").slider({
      value: 1,
      min: 1,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
      	lineWidth = ui.value;
      }
    });
    //$("#slider-cont").val($( "#slider" ).slider( "value" ) );
  $("#line-spacing-slider").slider({
      value: 1,
      min: 1,
      max: 4,
      step: 1,
      slide: function(event, ui) {
      	toggleSpacing(ui.value);
		},
    });

});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickWidth.push(lineWidth);
}

function render(){
  /* context.strokeStyle = "#df4b26"; */
  	clearCanvas();
	renderBackground();
 	renderForeground();
}

function init() {
	context = canvas.getContext("2d");
	paint = false;
	drawerVisible = false;
	// TODO: Need to adjust the canvas size accordingly
	// TODO: Need to adjust when screen is resized
	width = window.innerWidth;
	height = window.innerHeight;

	// Defaults - eventually pulled from saved preferences
	lineJoin = "round";
	lineWidth = 1;
	curColor = colorBrown;

	// Background - eventually pulled from saved preferences
	bgColor = "#FFFFFF";          // any hex value
	bgLineColor = "#EEE";      // any hex value
	bgLineSpacing = "tiny";      // small, medium or large
	bgLineWidth = 1;              // 1-10
	bgLineMode = "both";          // horizontal, vertical, both
} 

//----------------------------------------
// General canvas
//----------------------------------------
function clearCanvas() {
	context.clearRect(0,0,width,height);
}

//----------------------------------------
// Render background
//----------------------------------------
function renderBackground() {
	
	// Always render background color
// TODO: Need to do this
	//bgColor = "#FFFFFF";     // any hex value
	
	var spacing = determineSpacing();

	// Render lines as well
	switch (bgLineMode) {
		case "horizontal": renderBgHorizontal(spacing);
			break;
		case "vertical": renderBgVertical(spacing);
			break;
		case "both": renderBgGrid(spacing);
			break;
		default: renderBgGrid(spacing);
			break;
	}
}

// This should probably be stored in a variable
function determineSpacing() {
	switch(bgLineSpacing) {
		case "tiny": spacing = 10;  //40;
		     break;
		case "small": spacing = 20; //35;
			break;
		case "medium": spacing = 35; //20;
			break;
		case "large": spacing = 40; //10;
			break;
		default: spacing = 20;
			break;
	}
	return spacing;
}

function renderBgHorizontal(spacing) {
	context.strokeStyle = bgLineColor;
  	context.lineWidth = bgLineWidth;
			
	for (var y = 0.5; y < height; y += spacing) {
  		context.moveTo(0, y);
  		context.lineTo(width, y);
	}

	context.stroke();
}

function renderBgVertical(spacing) {
	context.strokeStyle = bgLineColor;
  	context.lineWidth = bgLineWidth;
			
	for (var x = 0.5; x < width; x += spacing) {
  		context.moveTo(x,0);
  		context.lineTo(x,height);
	}

	context.stroke();
}

function renderBgGrid(spacing) {

	renderBgHorizontal(spacing);
	renderBgVertical(spacing);
}

//----------------------------------------
// Render foreground
//----------------------------------------
function renderForeground() {
 	context.lineJoin = lineJoin;
  	//context.lineWidth = lineWidth;
			
  	for(var i=0; i < clickX.length; i++)
  	{		
    	context.beginPath();
    	if (clickDrag[i] && i){
      		context.moveTo(clickX[i-1], clickY[i-1]);
    	}
    	else {
    		context.moveTo(clickX[i]-1, clickY[i]);
    	}
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickWidth[i];
    context.stroke();
  }
}