function findAncestor(el, search) {
	// Class Search is lowercase, tagName search is UPPERCASE
	while ((el = el.parentElement) && ( !el.classList.contains(search) && el.tagName != search ) );
	return el;
}

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if( 'withCredentials' in xhr ){
		xhr.open(method, url, true);
	} else if( typeof XDomainRequest != 'undefined' ){
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}

	return xhr;
}

// Dynamically Remove Form Consents
let dynamicDelete = document.querySelectorAll('.dynamic-delete');
for( i = 0, n = dynamicDelete.length; i < n; ++i ){
	dynamicDelete[i].onclick = function(){
		if( confirm( 'Click "OK" to remove this notice.' ) ){
			this.classList.add('deleting');

			let parent = findAncestor(this, 'trm-gdpr-ui'),
				formID = findAncestor(this, 'FORM').getAttribute('id'),
				url	= parent.getAttribute('site-url'),
				page   = parent.getAttribute('dynamic-delete-page'),
				nonce  = parent.getAttribute('nonce');
				index  = parent.getAttribute('dynamic-delete-index');

			let xhrURL = url + '?trm_gdpr_method=dynamic-delete&dynamic-page='+page+'&dynamic-index='+index+'&nonce='+nonce;

			if( formID != null )
				xhrURL = xhrURL + '&form_id=' + formID;

			let xhr = createCORSRequest('GET', xhrURL);

			if( !xhr ){
				throw new Error('CORS not supported');
			} else {
				xhr.onload = (function() {
					json = JSON.parse( xhr.response );
					this.classList.remove('deleting');

					if( json.status == 200 ){
						console.log( json.message );
						parent.remove();
					} else {
						throw new Error( 'Dynamic Delete Failed. ' + json.message );
					}
				}).bind(this);
				xhr.send();
			}
		}
	};
}

function deleteCookie(name){
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setCookie(name, value, path = '/', expiration = null){
	let expires = ( expiration != null ) ? ' expires=' + expiration + ';' : '';
	document.cookie = name + '=' + value + '; path=' + path + ';' + expires;
}

var getCookie = function(name){
	var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
	return !!pair ? pair[1] : null;
};

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}

// Remove Consent Bar
let consentBar      = document.querySelector('#trm-gdpr-consent-bar');
let consentVersions = document.querySelector('#trm-gdpr-versions');

let revised  = consentVersions.getAttribute('data-revised');
let versions = consentVersions.getAttribute('data-versions');

function closeTRMGDPRconsent(){
	let cookie   = [];
	cookie.name  = 'trm-gdpr-consent';
	cookie.value = '{"close":true,"versions":"'+ versions +'","revised":"'+ revised +'"}';

	/* If the cookie got stuck, we delete it.
	 * Since it's showing again, it means we need to
	 * regain consent anyways.
	 */
	deleteCookie( cookie.name );
	setCookie( cookie.name, urldecode( cookie.value ) );
	
	consentBar.remove();
}

// Auto-remove Consent Bar If Cookie
// Since we use Content Mask a lot, can't rely on PHP removal.
(function(){
	let consentCookie = getCookie( 'trm-gdpr-consent' );

	if( consentCookie != null ){
		let expectedValue = '{"close":true,"versions":"'+ versions +'","revised":"'+ revised +'"}';
		if( consentCookie == expectedValue ){
			consentBar.remove();
		}
	}
})();