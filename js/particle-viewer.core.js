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
	
	// The start time of the animation and the current frame.
	PV.time = undefined;
	PV.frame = 0;
	
	// Amount miliseconds for each frame
	PV.spf = 500;
	
	// distance between coordinates
	PV.coordDist = 25;
	
	/**
	 * Load a predefined JSON-animation into the Particle Viewer
	 * For now we'll just assume that the data coming in is completely valid and stable conform guidelines
	 */
	PV.load = function( animation ) {
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
				PV.animation.particles[i].molecule = PV.createMolecule( PV.animation.animation[0][i] );
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
		var time = new Date().getTime() - PV.time;
		var frame = Math.floor( time / PV.spf );
		var timeInFrame = time - (frame * PV.spf);
		var progressInFrame = timeInFrame / PV.spf;
		
		var i = 0;
		
		// calculate new position for each molecule and replace it.
		if( PV.animation.animation[frame] ) {
			var a = PV.animation.animation;
			var pos = PV.calcPos( a[frame][i], a[frame + 1][i], progressInFrame );
			
			PV.animation.particles[i].molecule.position.x = pos[0];
			PV.animation.particles[i].molecule.position.y = pos[1];
			PV.animation.particles[i].molecule.position.z = pos[2];
		}
		
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
	
	PV.calcPos = function( pos1, pos2, progress ) {
		var posX = ( pos1[0] + progress * ( pos2[0] - pos1[0] ) ) * PV.coordDist;
		var posY = ( pos1[1] + progress * ( pos2[1] - pos1[1] ) ) * PV.coordDist;
		var posZ = ( pos1[2] + progress * ( pos2[2] - pos1[2] ) ) * PV.coordDist;
				
		return [posX, posY, posZ];
	};
	
})();