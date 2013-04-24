/**
 * 3D Particicle Viewer
 * Defines different functions for elements to write on the screen like lightning and camera's
 */
(function(){
	"use strict";
	
	var PV = window.PV = window.PV || {};
	
	/**
	 * 
	 */
	PV.addCamera = function() {
		PV.THREE.camera = new THREE.PerspectiveCamera(
			70,
			container.offsetWidth / container.offsetHeight,
			0.1,
			10000
		);
		
		PV.THREE.camera.position.z = 250;
		PV.THREE.camera.position.y = -400;
		PV.THREE.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

		PV.THREE.controls =  new TrackballControls( PV.THREE.camera );

		PV.THREE.controls.rotateSpeed = 1.0;
		PV.THREE.controls.zoomSpeed = 1.2;
		PV.THREE.controls.panSpeed = 0.8;

		PV.THREE.controls.noZoom = false;
		PV.THREE.controls.noPan = false;

		PV.THREE.controls.staticMoving = true;
		PV.THREE.controls.dynamicDampingFactor = 0.3;

		PV.THREE.controls.keys = [ 65, 83, 68 ];
		return PV;
	};
	
	/**
	 * 
	 */
	PV.addLights = function() {
		var pointLight = new THREE.PointLight(0xFFFFFF);
		
		pointLight.position.x = 10;
		pointLight.position.y = -50;
		pointLight.position.z = 130;
		
		PV.THREE.scene.add(pointLight);
		return PV;
	};
	
	/**
	 * x, y, z are the coordinates on the molecule-field, not the whole canvas
	 */
	PV.addMolecule = function( pos ) {
		var sphere = PV.createMolecule( pos );
		
		PV.THREE.scene.add(sphere);
		return PV;
	};
	
	PV.createMolecule = function( pos ) {
		var pos = pos || [],
			x = pos[0] * 10 || 0,
			y = pos[1] * 10 || 0,
			z = pos[2] * 10 || 0;
		
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});
		
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry( /*radius*/ 10, /*segments*/ 16, /*rings*/ 16 ),
		sphereMaterial);
		
		sphere.position.x = x;
		sphere.position.y = y;
		sphere.position.z = z;
		return sphere;
	};
	
	/**
	 * 
	 */
	PV.drawContainerbox = function() {
		var plane = new THREE.Mesh(
			new THREE.PlaneGeometry(
				PV.animation.properties.width * PV.coordDist,
				PV.animation.properties.depth * PV.coordDist,
				PV.animation.properties.width,
				PV.animation.properties.depth
			), new THREE.MeshBasicMaterial({
				color: 0x555555,
				wireframe: true
			})
		);
		PV.THREE.scene.add( plane );
		return PV;
	};
	
})();