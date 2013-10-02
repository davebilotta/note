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

function toggleSpacing() {
	switch (bgLineSpacing) {
		case "tiny": bgLineSpacing = "small";
		     break;
		case "small": bgLineSpacing = "medium";
			break;
		case "medium": bgLineSpacing = "large";
			break;
		case "large": bgLineSpacing = "tiny";
			break;
		default: bgLineSpacing = "medium";
			break;
		}
		console.log("new line spacing is " + bgLineSpacing);
		render();
}