/**
 * 3D Particicle Viewer
 * Core functionality
 */
(function( undefined ){
	"use strict";
	
	var PV = window.PV = window.PV || {};
	var stats;
	
	/**
	 * Pre-define all variables
	 */
	// All Three Js variables to store
	PV.THREE = {};
	
	// Animation object
	PV.animation = {};
	
	// Has the field been initialized?
	PV.initialized = false;
	
	// The container to append the canvas element to
	PV.container = undefined;
	
	// The start time of the animation.
	PV.time = undefined;
	
	// Amount miliseconds for each frame
	PV.spf = 500;
	
	// distance between coordinates
	PV.coordDist = 25;
	
	// Current frame, to check if a new frame is entered
	PV.currentFrame = 0;
	
	/**
	 * Load a predefined JSON-animation into the Particle Viewer
	 * For now we'll just assume that the data coming in is completely valid and stable conform guidelines
	 */
	PV.load = function( animation ) {
		PV.fillEmptyMolecules( animation );
		PV.animation = animation;
		return PV;
	};
	
	PV.init = function( selector ) {
		if( !PV.initialized ) {
			PV.container = document.querySelector( selector );
			
			// set up the FPS-stats
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			PV.container.appendChild( stats.domElement );
			
			PV.THREE.renderer = new THREE.WebGLRenderer();
			PV.THREE.scene = new THREE.Scene();
			
			// start the renderer
			PV.THREE.renderer.setSize( container.offsetWidth, container.offsetHeight );
			
			// attach the render-supplied DOM element
			PV.container.appendChild( PV.THREE.renderer.domElement );
			
			// run through all molecules in the settings and create objects for them.
			// Place them on the startplace.
			for ( var i in PV.animation.particles ) {
				PV.animation.particles[i].molecule = PV.Molecules[PV.animation.particles[i].type]();
				PV.THREE.scene.add( PV.animation.particles[i].molecule );
			}
	
			PV.addCamera()
				.addLights()
				.drawContainerbox()
				.draw();
			PV.initialized = true;
		}
		return PV;
	};
	
	/**
	 * Loop through the particles and redraw them on the screen.
	 */
	PV.draw = function() {
		PV.THREE.renderer.render( PV.THREE.scene, PV.THREE.camera );
		return PV;
	};
	
	PV.animate = function() {
		var animation       = PV.animation.animation,
			time            = new Date().getTime() - PV.time,
			frame           = Math.floor( time / PV.spf ),
			progressInFrame = ( time - ( frame * PV.spf ) ) / PV.spf;
		
		
		// calculate new position for each molecule and replace it.
		if( animation[frame+1] ) {
			for( var i in animation[frame] ) {
				
				var mol = PV.animation.particles[i].molecule.position,
					pos = PV.calcPos( animation[frame][i], animation[frame + 1][i], progressInFrame );
				
				mol.x = pos[0];
				mol.y = pos[1];
				mol.z = pos[2];
			}
		} else {
			// restart the animation
			PV.time = (new Date()).getTime();
		}
		
		PV.THREE.controls.update();
		PV.draw();
		stats.update();
		
		requestAnimationFrame( PV.animate );
	};
	
	PV.start = function() {
		PV.time = (new Date()).getTime();
		PV.animate();
		return PV;
	};
	
	PV.pause = function() {
		return PV;
	};
	
	PV.restart = function() {
		return PV;
	};
	
	/**
	 * Calculates the new position based on the progress between position 1 and 2.
	 */
	PV.calcPos = function( pos1, pos2, progress ) {
		var div = PV.animation.properties.width / 2;
		function f( p1, p2 ) {
			return ( ( p1 + progress * ( p2 - p1 ) ) - div ) * PV.coordDist;
		}
				
		return [
			f(pos1[0], pos2[0]),
			f(pos1[1], pos2[1]),
			f(pos1[2], pos2[2])
		];
	};
	
	/**
	 * Fill the frames in the animation with empty arrays if the molecule is not there.
	 * this will remove it from the screen.
	 */
	PV.fillEmptyMolecules = function( data ) {
    	var indexes = {};
    	// fill the list of indexes
    	for( var i in data.particles ) {
        	indexes[i] = "";
    	}
    	
		for( var i in data.animation ) {
			var _this = data.animation[i];
			for( var x in indexes ) {
				if( _this[x] === undefined )
					_this[x] = [];
			}
		}
		return data;
    };
	
})();