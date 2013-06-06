/**
 * 3D Particicle Viewer
 * Molecules
 */
(function( undefined ){
	"use strict";
	
	var PV = window.PV = window.PV || {};
	
	PV.Molecules = {};
	
	PV.Molecules.Protein = function() {
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
	}
	
	PV.Molecules.ProteinMerged = function() {
		var pos = pos || [],
			x = pos[0] * 10 || 0,
			y = pos[1] * 10 || 0,
			z = pos[2] * 10 || 0;
		
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCC00ff
		});
		
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry( /*radius*/ 10, /*segments*/ 16, /*rings*/ 16 ),
		sphereMaterial);
		
		sphere.position.x = x;
		sphere.position.y = y;
		sphere.position.z = z;
		return sphere;
	}
	
})();