/* === Functions that require jQuery but have no place on this Earth, yet === */


//here we change the link of the Edit button in the Admin Bar
//to make sure it reflects the current page
function adminBarEditFix(id) {
	//get the admin ajax url and clean it
	var baseURL = ajaxurl.replace('admin-ajax.php','post.php');

	$('#wp-admin-bar-edit a').attr('href',baseURL + '?post='+ id +'&action=edit');
}

/* --- Load AddThis Async --- */
function loadAddThisScript() {
	if (window.addthis) {
		if (globalDebug) {console.log("AddThis Load Script");}
		// Listen for the ready event
		addthis.addEventListener('addthis.ready', addthisReady);
		addthis.init();
	}
}

/* --- AddThis On Ready - The API is fully loaded --- */
//only fire this the first time we load the AddThis API - even when using ajax
function addthisReady() {
	if (globalDebug) {console.log("AddThis Ready");}
	addThisInit();
}

/* --- AddThis Init --- */
function addThisInit() {
	if (window.addthis) {
		if (globalDebug) {console.log("AddThis Toolbox INIT");}

		addthis.toolbox('.addthis_toolbox');
	}
}