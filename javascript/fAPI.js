var fAPI = (function(){
	var Utils = {};

	/**
	 * @name: __generateGID
	 * http://stackoverflow.com/a/2117523
	 */
	Utils.__generateGID = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}

	/**
	 * @name: __checkIfExists
	 */
	Utils.__checkIfExists = function( ref, child ) {
		var d = $.Deferred();

		ref.child( child ).once('value', function(snap) {
			if ( snap.val() === null ) {
				d.resolve( true );
			} else {
				d.resolve( false );
			}
		});

		return d.promise();
	}

	/**
	 * @name: __setFireBase
	 */
	Utils.__setFireBase = function( ref, obj ) {
		var d = $.Deferred();
		ref.set(obj, function(err) {
			if ( err === null ) {
				d.resolve( true );
			}
			else {
				d.reject( err );
			}
		});
		return d.promise();
	}

	/**
	 * @name: __pushFireBase
	 */
	Utils.__pushFireBase = function( ref, obj ) {
		var d = $.Deferred();
		ref.push(obj, function( err ) {
			if ( err === null ) {
				d.resolve( true );
			}
			else {
				d.reject( err );
			}
		});
		return d.promise();
	}

	/**
	 * @name: __getFireBase
	 */
	Utils.__getFireBase = function( ref ) {
		var d = $.Deferred();

		ref.once('value', function(snap) {
			d.resolve( snap.val() );
		});	

		return d.promise();
	}

	Utils.__removeFireBase = function( ref ) {
		var d = $.Deferred();

		ref.remove(function( err ) {
			if ( err === null ) {
				d.resolve( );
			}
		});	

		return d.promise();
	}

	Utils.__getAuth = function( ref ) {
		return ref.getAuth();
	}

	/*
	 * JavaScript Pretty Date
	 * Copyright (c) 2011 John Resig (ejohn.org)
	 * Licensed under the MIT and GPL licenses.
	 */

	// Takes an ISO time and returns a string representing how
	// long ago the date represents.
	Utils.__prettyDate = function(time){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
				
		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return;
				
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	}
	return Utils;
})();
