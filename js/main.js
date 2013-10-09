/*var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
*/

//var clickColor = new Array();
//var clickWidth = new Array();

var context;
var drawerVisible,context, curColor, paint, lineWidth;
var fgColor,bgColor, bgLineColor, bgLineSpacing, bgLineWidth, bgLineMode;
var width, height;

var note;
var drawerImage;

$(document).ready(function () {

	init();
	registerEventHandlers();
	// TODO: This needs to bring user to main screen 
	enumerateFiles();
});

function init() {
	context = canvas.getContext("2d");
	paint = false;
	drawerVisible = false;
	// TODO: Need to adjust the canvas size accordingly
	// TODO: Need to adjust when screen is resized
	width = window.innerWidth;
	height = window.innerHeight;

	note = new Note();
	//drawerImage.src="/";

	// Defaults - eventually pulled from saved preferences
	lineJoin = "round";
	lineWidth = 1;
	fgColor = "000000";

	// Background - eventually pulled from saved preferences
	bgColor = "FFFFFF";          // any hex value
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
    	note.bgLineMode = this.value;
    	render();
    });

    $("#fg-color").change(function() {
    	fgColor = "#"+this.value;
    });

    $("#bg-line-color").change(function() {
    	note.bgLineColor = "#"+this.value;
    	
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

function Note() {
	this.createDate = new Date();
	this.title = "New Note";
	this.id = this.createDate;
	this.lastSaveDate = "";

	this.bgColor = "FFFFFF";          // any hex value
	this.bgLineColor = "#EEE";      // any hex value
	this.bgLineSpacing = 10;      
	this.bgLineWidth = 1;              // 1-10
	this.bgLineMode = "both";          // horizontal, vertical, both

	this.clickWidth = new Array();
	this.clickX = new Array();
	this.clickY = new Array();
	this.clickDrag = new Array();
	this.clickColor = new Array();
	
	console.log(this.createDate);
}