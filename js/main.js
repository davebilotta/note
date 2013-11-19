var context;
var drawerVisible,context, curColor, paint, lineWidth;
var fgColor,bgColor, bgLineColor, bgLineSpacing, bgLineWidth, bgLineMode;
var width, height;

var note;
var drawerImage;
var savedNotes = new Array();

$(document).ready(function () {
	// TODO: checkAPILevel first
	initMenu();
	initCanvas();
	registerEventHandlers();
	
	render();
});

function initCanvas() {
	context = canvas.getContext("2d");
	paint = false;
	drawerVisible = false;

	onWindowResize();

	note = new Note();

	// Defaults - eventually pulled from saved preferences
	//TODO: loadDefaults();
	lineJoin = "round";
	lineWidth = 1;
	fgColor = "000000";

	// Background - eventually pulled from saved preferences
	bgColor = "FFFFFF";           // any hex value
	bgLineColor = "#EEE";         // any hex value
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

	$('#newNote').click(function() {
		newNote();
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

	$("#load").click(function() {
		loadFile();
	});

	$("#delete").click(function() {
		deleteFile();
	});
	
	// Foreground
    $("#brush-size-slider").change(function() {
    	lineWidth = parseInt($(this).val());
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

	$('#line-spacing-slider').change(function() {
  		toggleSpacing(parseInt($(this).val()));
	});
}

function Note() {
	this.createDate = new Date();
	this.title = "New Note";
	this.id = this.createDate;
	this.lastSaveDate = "";
 
	this.bgColor = "FFFFFF";           // any hex value
	this.bgLineColor = "#EEE";         // any hex value
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

function onWindowResize() {

	width = window.innerWidth;
	height = window.innerHeight;

	var w = parseInt(width * .98);
	var h = parseInt(height * .98);

	$("#canvas").attr("width",w);
	$("#canvas").attr("height",h);
}