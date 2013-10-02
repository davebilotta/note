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