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
		case 1: bgLineSpacing = "tiny";
		     break;
		case 2: bgLineSpacing = "small";
			break;
		case 3: bgLineSpacing = "medium";
			break;
		case 4: bgLineSpacing = "large";
			break;
		default: bgLineSpacing = "small";
			break;
		}
		console.log("new line spacing is " + bgLineSpacing);
		render();
}