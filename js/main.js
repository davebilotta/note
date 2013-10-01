var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var clickColor = new Array();

var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

var drawerVisible,context, curColor, paint, lineWidth;


//ctx = canvas.getContext("2d");
$(document).ready(function () {

	init();

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
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

});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  /* context.strokeStyle = "#df4b26"; */
  context.lineJoin = lineJoin;
  context.lineWidth = lineWidth;
			
  for(var i=0; i < clickX.length; i++)
  {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

function toggleDrawer() {
	if (drawerVisible) hideDrawer();
	else showDrawer();

}

function showDrawer() {
	drawerVisible = true;

	$("#drawer").slideDown("fast");
}

function hideDrawer() {
	drawerVisible = false;

	$("#drawer").slideUp("fast");
}

function init() {
	context = canvas.getContext("2d");
	paint = false;
	drawerVisible = false;

	// Defaults
	lineJoin = "round";
	lineWidth = 2;
	curColor = colorBrown;

}