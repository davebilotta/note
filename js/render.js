function render(){
  /* context.strokeStyle = "#df4b26"; */
  	clearCanvas();
	renderBackground();
 	renderForeground();
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
	
	// Render lines as well
	switch (bgLineMode) {
		case "horizontal": renderBgHorizontal();
			break;
		case "vertical": renderBgVertical();
			break;
		case "both": renderBgGrid();
			break;
		case "none": break;
		default: renderBgGrid();
			break;
	}
}

function renderBgHorizontal() {
	context.strokeStyle = bgLineColor;
  	context.lineWidth = bgLineWidth;
			
	for (var y = 0.5; y < height; y += bgLineSpacing) {
  		context.moveTo(0, y);
  		context.lineTo(width, y);
	}

	context.stroke();
}

function renderBgVertical() {
	context.strokeStyle = bgLineColor;
  	context.lineWidth = bgLineWidth;
			
	for (var x = 0.5; x < width; x += bgLineSpacing) {
  		context.moveTo(x,0);
  		context.lineTo(x,height);
	}

	context.stroke();
}

function renderBgGrid() {

	renderBgHorizontal();
	renderBgVertical();
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