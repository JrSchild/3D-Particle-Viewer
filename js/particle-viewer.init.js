$.getJSON("js/example-animations/short_collision.json", function(data) {
	Generator( data ).
		randomMolecules( 50, 20 ).
		randomCollisions( 40 ).
		print( true );
    
    // fire up the engine
    PV.load( data ).init( "#container" ).start();
}).fail(function(e) {
    console.log("There was an error in the json file. Please make sure the input is valid. Try passing it through: http://jsonlint.com/", e);
});