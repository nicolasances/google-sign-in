var auth2;
var googleUser;
var signedIn;

function startApp() {

	gapi.load('auth2', initSignin);
	
}

function initSignin() {
	
	gapi.auth2.init({
		client_id: '204645657098-k3oplehjagqjjljnjs2a5u8227hik0o2.apps.googleusercontent.com'
	}).then(function() {
		
		auth2 = gapi.auth2.getAuthInstance();
		
		refresh();
		
		attachSignin(document.querySelector('#signin'));
	});
}

function refresh() {
	
	signedIn = auth2.isSignedIn.get();
	
	console.log(signedIn);
	
	if (!signedIn) {
		document.querySelector('#home').style.display = 'none';
		document.querySelector('#login').style.display = 'block';
	}
	else {
		googleUser = auth2.currentUser.get();
		
		document.querySelector('#login').style.display = 'none';
		document.querySelector('#home').style.display = 'block';
		
		document.querySelector('#name').innerHTML = googleUser.getBasicProfile().getName();
	}
}

function attachSignin(element) {
	
	auth2.attachClickHandler(element, {}, function(user) {
		refresh();
	});
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

