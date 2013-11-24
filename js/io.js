// Contains general file I/O functions

function loadFile() {
	
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
		restoreNote(noteLoad);
		updateNoteInfo();
		}
	}
}

function saveFile() {
	console.log("Saving file");

	if (typeof note == "object") {
		note.lastSaveDate = new Date();
      	var noteSave = JSON.stringify(note);
      	//console.log("save; " + noteSave);
    }
    //localStorage.setItem(1, noteSave);
    localStorage.setItem(note.id, noteSave);
    updateNoteInfo();
}

function deleteFile() {
	console.log("Deleting file");
	
}

function savedNotesExist() {
	
	//for(var i in localStorage) {
    //	console.log(localStorage[i]);
	//}
	var cnt = 0;

	for (var i in localStorage) {
		savedNotes[cnt] = i;
		cnt++;
	}
	
	console.log("There are " + cnt + " saved notes");

	if (cnt > 0) {
		return true;
	}
	else {
		return false;
	}
}

function checkAPILevel() {
	return true;
}

function restoreNote(src) {
	// src will be put into note
	note.clickX = src.clickX;
	note.clickY = src.clickY;
	note.clickDrag = src.clickDrag;
	note.clickColor = src.clickColor;
	note.clickWidth = src.clickWidth;

	note.bgColor = src.bgColor;
	note.bgLineColor = src.bgLineColor;
	note.bgLineSpacing = src.bgLineSpacing;
	note.bgLineWidth = src.bgLineWidth;
	note.bgLineMode = src.bgLineMode;

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

function newNote() {
	hideCreateNew();
	showCanvas();
}

function saveDefaults() {
	// Save defaults for next time.
	// Called when the drawer is closed
	// TODO: Only save if anything has actually changed
}

function loadDefaults() {

}

// Event handlers
$("#save").click(function() {
	saveFile();
});

$("#load").click(function() {
	loadFile();
});

$("#delete").click(function() {
	deleteFile();
});