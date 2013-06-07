(function() {
	var data;

	var Generator = window.Generator = function( animation ) {
		data = animation;
		return Generator;
	};

    function r( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    function randomPos(prev, p) {
        return [
            prev[0]+r(prev[0] <= 0 ? 0 : -1, prev[0] >= p.width ? 0 : 1),
            prev[1]+r(prev[1] <= 0 ? 0 : -1, prev[1] >= p.height ? 0 : 1),
            prev[2]+r(prev[2] <= 0 ? 0 : -1, prev[2] >= p.depth ? 0 : 1)
        ];
    }
	
    /**
     * Generate molecules on random places in random direction.
     * @param x: the amount of molecules to render.
     * @param t: the time for it to continue.
     */
    Generator.randomMolecules = function( x, t ) {
        var pa = data.particles = [],
            a = data.animation = [],
            p = data.properties;
        
        // loop through all particles
        while( x-- ) {
            pa.push({ "type": "Protein" });
            
            // for each time-frame create coordinates
            for( var i = 0; i < t; i++ ) {
                a[i] = a[i] || {};
                
                if( i == 0 ) {
                    // set start coords
                    a[i][x] = [r(0, p.width), r(0, p.height), r(0, p.depth)];
                } else {
                    // use previous frame and add either -1, 0 or 1 to each coord.
                    a[i][x] = randomPos(a[i-1][x], p);
                }
            }
        }
        return Generator;
    };
    
    Generator.randomCollisions = function( collidingMolecules ) {
        var pa = data.particles,
            a = data.animation,
            p = data.properties;
        
    	var normalMolecules = pa.length;
        for( var i = 0; i < collidingMolecules; i++ ) {
        	var mergeFrameStart = r(Math.floor(a.length / 6), Math.ceil(a.length / 6 * 2));
        	var mergeFrameEnd = r(Math.floor(a.length / 6 * 4), Math.ceil(a.length / 6 * 5));
        
        	// add molecules to the molecule list. Both for the molecule that will be merged in, and the newly created merged molecule.
        	var thisI = i + normalMolecules;
        	var mergedI = normalMolecules + collidingMolecules + i;
        	data.particles[thisI] = { "type": "Protein" };
        	data.particles[mergedI] = { "type": "ProteinMerged" };
        	
        	// insert this item at a random place in the time (at first half) and generate its path backwards to the beginning
        	a[mergeFrameStart][thisI] = a[mergeFrameStart][i];
        	for( var x = mergeFrameStart-1; x >= 0; x-- ) {
                // use previous frame and add either -1, 0 or 1 to each coord.
                a[x][thisI] = randomPos(a[x+1][thisI], p);
        	}
        	
        	// everything up until merging works now.
    		a[mergeFrameStart][mergedI] = a[mergeFrameStart][i];
        	for( var x = mergeFrameStart+1; x < mergeFrameEnd; x++ ) {
        		// set location of new merged particle
        		a[x][mergedI] = a[x][i];
        		
	        	// remove other 2 particles.
	        	a[x][thisI] = undefined;
	        	a[x][i] = undefined;
        	}
        	a[mergeFrameEnd-1][thisI] = a[mergeFrameEnd-1][mergedI];
        	a[mergeFrameEnd-1][i] = a[mergeFrameEnd-1][mergedI];
        	
        	// also split them up again.
        	for( var x = mergeFrameEnd; x < a.length; x++ ) {
                // use previous frame and add either -1, 0 or 1 to each coord.
                a[x][thisI] = randomPos(a[x-1][thisI], p);
        	}
        }
        return Generator;
    }
    
    Generator.print = function( json ) {
	    console.log( json ? JSON.stringify(data) : data );
	    return Generator;
    }

})();