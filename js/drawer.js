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
	drawerVisible = false;
	$("#drawer").slideUp("fast");
}

function toggleSpacing(val) {
	switch (val) {
		case 1: bgLineSpacing = 10;
		     break;
		case 2: bgLineSpacing = 20;
			break;
		case 3: bgLineSpacing = 30;
			break;
		case 4: bgLineSpacing = 40;
			break;
		default: bgLineSpacing = 20;
			break;
		}
		render();
}