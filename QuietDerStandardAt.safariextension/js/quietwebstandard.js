/*
 * file: quietwebstandard.js
 * date: 20101211
 * version: 1.0
 * autohr: Alex Leutgöb
 * description: Toggles visbility of comments from derstandard.at
 */
 
// Check if parent frame is top-level frame (so no iframe)
if (window.top == window) {

	// String values
	var showComments = 'Zeige Kommentare';
	var hideComments = 'Verstecke Kommentare';

	// TODO: Default settings value useful?
	var defVis = 'hidden';
	
	// Show comments iff not on first page
	if (getParameter('seite') != "") {
		defVis = 'visible';
	}

	// Get comment div
 	var commentDiv = getElementsByClass('communityCanvas')[0];
 	
 	if (typeof(commentDiv) != 'undefined') {
	 	// Hide comment div if needed
	 	if (defVis == 'hidden') {
	 		commentDiv.setAttribute('style', 'display:none !important;');
	 	}
	 	
	 	// Add element to toggle comment div
	 	var divElement = document.createElement('div');
	 	divElement.setAttribute('id', 'tglCmnts');
	 	
	 	var pElement = document.createElement('p');
	 	pElement.setAttribute('style', 'margin: 1.5em 8px 1em; padding-left: 219px; font-size: 13px;');

	 	var linkElement = document.createElement('a');
	 	if (defVis == 'hidden') {
	 		linkElement.textContent = showComments;
	 	}
	 	else {
	 		linkElement.textContent = hideComments;
	 	}
	 	linkElement.setAttribute('href', '#articleTools');
	 	linkElement.onclick = function() {
	 		if (commentDiv.getAttribute('style') != '') {
				commentDiv.setAttribute('style', '');
				linkElement.textContent = hideComments;
			}
			else {
				commentDiv.setAttribute('style', 'display:none !important;');
				linkElement.textContent = showComments;
			}
	 	}
	 	
	 	pElement.appendChild(linkElement);
	 	divElement.appendChild(pElement);
	 	commentDiv.parentNode.insertBefore(divElement, commentDiv);
	}
} 
 
// Helper method finding elements by class name
// See: http://www.anyexample.com/webdev/javascript/javascript_getelementsbyclass_function.xml
function getElementsByClass(searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
}

// Helper method extracting specific get parameter from url
// See: http://www.netlobo.com/url_query_string_javascript.html
function getParameter(key) {
  key = key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
  var regexS = '[\\?&]' + key + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return '';
  else
    return results[1];
}
