// Contains general file I/O functions

function loadFile() {
	if(checkAPILevel()) {
		console.log("Loading file");

    var item = localStorage.getItem(1);

    if (!item) {
    	console.log("Couldn't load file");
    }
    else {
    // assume it is an object that has been stringified
    if (item[0] == "{") {
      noteLoad = JSON.parse(item);
      //console.log("load: " + noteLoad);
		restoreCanvas(noteLoad);
		updateNoteInfo();
		}
	}
	}

}

function saveFile() {
	if(checkAPILevel()) {
		console.log("Saving file");

	if (typeof note == "object") {
		note.lastSaveDate = new Date();
      	var noteSave = JSON.stringify(note);
      	//console.log("save; " + noteSave);
    }
    localStorage.setItem(1, noteSave);
    updateNoteInfo();
//  },
  }
}

function deleteFile() {
	if(checkAPILevel()) {
		console.log("Deleting file");
	}
}

function checkAPILevel() {
	return true;
}

function restoreCanvas(src) {
	// src will be put into note
	 note.clickX = src.clickX;
	 note.clickY = src.clickY;
	 note.clickDrag = src.clickDrag;
	 note.clickColor = src.clickColor;
	 note.clickWidth = src.clickWidth;

	 render();

}

function updateNoteInfo() {
	var first = note.createDate;
	var last = note.lastSaveDate;
	var title = note.title;

	var str = "<h4>" + title + " created: " + first + " last saved: " + last + "</h4>";
	//alert(str);
	$("#file-info").html(str);
}