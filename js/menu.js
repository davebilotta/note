function initMenu() {
	if (!savedNotesExist()) {
		// Show "create new"
		showCreateNew();   // show "Create new"
		hideCanvas();      // sets canvas to hidden

	}
	else {
		// Present user with list of saved Notes (plus "Create New" option)
		
	}

}


function showCanvas() {
	var canvas = document.getElementById("canvas");
	if (canvas.style.visibility = "hidden") {
		var canvasCont = document.getElementById("canvas-container");
		canvas.style.display = "block";
		canvas.style.visibility = "visible";
	}
}

function hideCanvas() {
	// Hides canvas and its container

	var canvas = document.getElementById("canvas");
	if (canvas.style.visibility = "visible") {
		var canvasCont = document.getElementById("canvas-container");
		canvas.style.display = "none";
		canvas.style.visibility = "hidden";
	}
}

function showCreateNew() {
	var createNewNote = document.getElementById("createNewNote");
	createNewNote.style.visibility = "visible";
}

function hideCreateNew() {
	var createNewNote = document.getElementById("createNewNote");
	createNewNote.style.visibility = "hidden";

}