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
var bgColor, bgLineColor, bgLineSpacing, bgLineWidth, bgLineMode;
var width, height;

$(document).ready(function () {

	init();
	registerEventHandlers();

});

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
	bgLineSpacing = 10;      
	bgLineWidth = 1;              // 1-10
	bgLineMode = "both";          // horizontal, vertical, both
} 

function registerEventHandlers() {
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
	
	// Foreground
	$("#brush-size-slider").slider({
      //orientation: "vertical",
      value: 1,
      min: 1,
      max: 25,
      step: 1,
      slide: function( event, ui ) {
      	lineWidth = ui.value;
      }
    });

    // Background
    $("#grid").change(function() {
    	bgLineMode = this.value;
    });

  $("#line-spacing-slider").slider({
      //orientation: "vertical",
      value: 1,
      min: 1,
      max: 4,
      step: 1,
      slide: function(event, ui) {
      	toggleSpacing(ui.value);
		},
    });
}