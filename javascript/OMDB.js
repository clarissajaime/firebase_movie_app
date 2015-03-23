/* CURRENTLY IN: javascript/main.js */
// a guide to protecting the lemmings
(function() { // protect the copyrights!
    
   var goButton = $('.js-go')
   	   , titleField = $('.js-search-title')
   	   , __URL_BASE__ = 'http://www.omdbapi.com/'
   	   , options = {
   	   		plot: 'full'
   	   		, r: 'json'
   	   		, tomatoes: 'true'
   	   		, type: 'movie'
   	   };

   goButton.on('click', startSearch);

   /**
	*	@startSearch
	*	@desc - reads the input field val and makes search
    */
   function startSearch() {
   		// first get the value of field
	    var searchValue = getVal( titleField );

	    // then, make the input field empty
	    setVal( titleField, "" );

		// set the options.t to equal to the title
	    options.s = searchValue;

	    // run your search
	    $.get( __URL_BASE__, options, onSearchComplete );
	    
	}

   /**
	*	@getVal
	*	@desc - returns the value of an element
	*	@param element {object} - jquery object 
    */
	function getVal( element ) {
		return element.val();
	}

   /**
	*	@setVal
	*	@desc - updates the value of an element
	*	@param element {object} - jquery object
	*	@param valueToSet {string} - the value to update to 
    */
	function setVal( element, valueToSet ) {
		element.val( valueToSet );
	}

   /**
    *	@onSearchComplete
    *	@desc - returns all search results, we will have to API call each
    *	@param data {string} - data as JSON string
    */
    function onSearchComplete( data ) {
    	// convert json string into javascript object
    	data = JSON.parse( data );

    	delete options.s;

    	for( var i = 0; i < data.Search.length; i++ ) {
    		options.t = data.Search[ i ].Title;
    		// console.log( options )
    		// run your search
	    	$.get( __URL_BASE__, options, onDataPulled );
    	}
    }

   /**
	*	@onDataPulled
	*	@desc - returns API response
	*	@param data {string} - data as JSON string
    */
    function onDataPulled( data ) {
    	// convert json string into javascript object
    	data = JSON.parse( data );

		console.log( data );

		// write the code to handle underscore template stuff below
		var htmlcompiled = _.template($('#data_template').html());

		var poster = data.Poster;
		if ( poster === "N/A" ) {
			poster = 'http://placekitten.com/g/200/300';
		} 
		var htmlOutput = htmlcompiled({
			title: data.Title
			, poster: poster
			, plot: data.Plot
			, year: data.Year
			, actors: data.Actors
			, writers: data.Writer
		});

		$('.jumbotron').prepend(htmlOutput);
	}


})();
