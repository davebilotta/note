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


