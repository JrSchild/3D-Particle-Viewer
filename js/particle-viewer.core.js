/**
 * 3D Particicle Viewer
 * Core functionality
 */
(function(){
	"use strict";
	
	var PV = window.PV = window.PV || {};
	
	/**
	 * Pre-define all variables
	 */
	// Animation object
	PV.animation = {};
	
	// Has the field been initialized?
	PV.initialized = false;
	
	/**
	 * Load a predefined JSON-animation into the Particle Viewer
	 * For now we'll just assume that the data coming in is completely valid and stable conform guidelines
	 */
	PV.load = function( animation ) {
		PV.animation = animation;
		return PV;
	};
	
	PV.init = function() {
		if( !PV.initialized ) {
			
			PV.initialized = true;
		}
		return PV;
	}
	
	PV.start = function() {
		return PV;
	};
	
	PV.pause = function() {
		return PV;
	};
	
	PV.restart = function() {
		return PV;
	};
	
})();