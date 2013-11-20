// Contains functions for the navigation drawer

function toggleDrawer() {
	if (drawerVisible) hideDrawer();
	else showDrawer();

}

function showDrawer() {
	drawerVisible = true;
	$("#drawer").slideDown("fast");
}

function hideDrawer() {
	saveDefaults();
	drawerVisible = false;
	$("#drawer").slideUp("fast");
}

function toggleSpacing(val) {
	switch (val) {
		case 1: note.bgLineSpacing = 10;
		     break;
		case 2: note.bgLineSpacing = 20;
			break;
		case 3: note.bgLineSpacing = 30;
			break;
		case 4: note.bgLineSpacing = 40;
			break;
		default: note.bgLineSpacing = 20;
			break;
		}
		render();
}

function initDrawer() {
	// Colors
	var colors = ["red","blue","white","black","yellow","rgb(227,227,227)"];
	for (var i = 1; i < 7; i++) {
		$("#bgcolor" + i).css("background-color",colors[i-1]);
		$("#fgcolor" + i).css("background-color",colors[i-1]);
	}
}

// Event handlers
// Background
$('.bgcolor').click(function() {
//	console.log($(this));
	//console.log($(this).css("background-color"));
	var val = $(this).css("background-color");

	note.bgLineColor = val;
	render();
});

$("#grid").change(function() {
	note.bgLineMode = this.value;
	render();
});

$('#line-spacing-slider').change(function() {
	toggleSpacing(parseInt($(this).val()));
});
	
// Foreground
$("#brush-size-slider").change(function() {
    lineWidth = parseInt($(this).val());
});

/* $("#fg-color").change(function() {
	fgColor = "#"+this.value;
	render();
});
*/

$('.fgcolor').click(function() {
	var val = $(this).css("background-color");

	fgColor = val;
//	render();
});

