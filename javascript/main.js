/* CURRENTLY IN: javascript/main.js */
(function() { // protect the lemmingz!

	var myFireId = 'popping-fire-3973';

// establish a connection
	var myFirebaseRef = new Firebase("https://"+myFireId+".firebaseio.com/");
	// eventually will hold current user
	var currentUser = null;

	/**
	 *	@initRegistration
	 *	@desc - handle the submit button click evt for registration + login
	 */
	function initRegistration() {
		var submitBtn = $('.js-submit');

		submitBtn.on('click', validateInputs);
	}
	initRegistration();

	/**
	 *	@validateInputs
	 *	@desc - validate email and password
	 */
	function validateInputs( e ) {
		e.preventDefault();


		var email = $('#inputEmail3').val();
		var password = $('#inputPassword3').val();

		if ( !!email && !!password ) {
			if ( $('.registration').length !== 0 ) {
				registerUser( email, password);
			}
			else if ( $('.login').length !== 0 ) {
				loginUser( email, password );	
			}
		}
	}

	/**
	 *	@registerUser
	 *	@desc - call firebase registerUser command
	 *	@param email {string} - user email address
	 *	@param pw {string} - user pw
	 */
	function registerUser( email, pw ) {
		 var userData = {
		 	email: email
		 	, password: pw
		 };

		myFirebaseRef.createUser(userData, onUserCreated);

		function onUserCreated( error, userData ) {
			if ( error ) {
				console.log( error );
				alert(error.message);
				$('#inputEmail3').val('');
				$('#inputPassword3').val('');
			}

			else {
				console.log( userData );
				alert('success!');

				window.location.href = 'index.html';
			}
		}
	}


	/**
	 *	@loginUser
	 *	@desc - call firebase authWithPassword command
	 *	@param email {string} - user email address
	 *	@param pw {string} - user pw
	 */
	function loginUser( email, pw ) {
		 var userData = {
		 	email: email
		 	, password: pw
		 };

		myFirebaseRef.authWithPassword(userData, onUserAuthenticated);

		function onUserAuthenticated( error, userData ) {
			if ( error ) {
				console.log( error );
				alert(error.message);
				$('#inputEmail3').val('');
				$('#inputPassword3').val('');
			}

			else {
				console.log( userData );
				alert('success!');

				window.location.href = 'moviesearch.html';
			}
		}
	}

	/**
	 *	@checkAuthState
	 *	@desc - check if user is logged in
	 */
	function checkAuthState() {
		myFirebaseRef.onAuth(authDataCallback);

		function authDataCallback( authData ) {
			if ( authData ) {
				// this means we are logged in!
				console.log( authData );
				currentUser = authData;
				getUserFavs();
			}
			else {
				// otherwise we are not
				window.location.href = 'index.html';
			}
		}
	}

	if ( $('.search').length !== 0 ) {
		checkAuthState();
	}

	$('.jumbotron').on('click', '.js-add', onButtonClick);
	console.log( $('.js-add') );
	function onButtonClick() {
		var me = $( this )
			, title = me.prev().html();

		saveToUser( title );
	}


	/**
	 *	@saveToUser
	 *	@desc - save to firebase
	 *	@param title {string} - the title to save
	 */
	function saveToUser( title ) {
		var user = myFirebaseRef
			.child('users')
			.child(currentUser.uid);

		user.once('value', function( snapshot ) {
			var data = snapshot.val();
			for( var savedtitle in data ) {
				var current = data[ savedtitle ];
				if ( current.title === title ) {
					return;
				}
			}

			user.push({title: title}, function(err) {
					if ( err ) {
						alert( err.message );
					}
					alert( 'success!' );
				});
		});
	}

	/**
	 *	@getUserFavs
	 *	@desc - read from firebase
	 */
	function getUserFavs() {
		var user = myFirebaseRef
			.child('users')
			.child(currentUser.uid);

		user.once('value', function( snapshot ) {
			var data = snapshot.val();
			for( var savedtitle in data ) {
				var current = data[ savedtitle ];

				OMDBAPI.options.t = current.title;
				$.get(
					OMDBAPI.__URL_BASE__
					, OMDBAPI.options
					, OMDBAPI.onDataPulled
				);
			}
		});

	}
})();
