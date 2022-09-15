import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  constructor() {
  }

  public createDraw(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );
  
    const scene = new THREE.Scene();
  
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  
    const points = [];
    points.push( new THREE.Vector3( - 5, 0, 0 ) );
    points.push( new THREE.Vector3( -5, 10, 0 ) );
    points.push( new THREE.Vector3( 5, 10, 0 ) );
    points.push( new THREE.Vector3( 5, 0, 0 ) );
    points.push( new THREE.Vector3( -5, 0, 0 ) );

    points.push( new THREE.Vector3( -10, 5, -10 ) );
    points.push( new THREE.Vector3( -10, 15, -10 ) );

    points.push( new THREE.Vector3( -5, 10, 0 ) );

    points.push( new THREE.Vector3( -10, 15, -10 ) );
    points.push( new THREE.Vector3( 0, 15, -10 ) );

    points.push( new THREE.Vector3( 5, 10, 0 ) );

    points.push( new THREE.Vector3( 0, 15, -10 ) );
    points.push( new THREE.Vector3( 0, 5, -10 ) );

    points.push( new THREE.Vector3( 5, 0, 0 ) );

    points.push( new THREE.Vector3( 0, 5, -10 ) );
    points.push( new THREE.Vector3( -10, 5, -10 ) );
  
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
    const line = new THREE.Line( geometry, material );
  
    //scene.add( line );

    let yRotation =  10; 
    let xPosition =  10;	 
    let zPosition =  10;

    const loader = new GLTFLoader();

    loader.load( "assets/Item/Cube.gltf ", process );
    let model = new THREE.Object3D( );
    let c, size; // model center and size
 
    let t = 0;
    let x0 = xPosition;
    let dx;

    model.scale.set(10,10,10);

    function animate( ) {
	
      requestAnimationFrame( animate );
	
	    yRotation += 0.005;	
	    t += 0.001;
	    dx = Math.sin( t )	
	    xPosition = x0 + dx;	
 	
	    model.rotation.y = yRotation;
	
	    model.position.x = xPosition;
	    model.position.z = zPosition;
	
    }

    function process( gltf:any ) {	
		
	    const box = new THREE.Box3( ).setFromObject( gltf.scene );		 
	    const boxHelper = new THREE.Box3Helper( box );
      scene.add( boxHelper );
	
	    c = box.getCenter( new THREE.Vector3( ) );
	    size = box.getSize( new THREE.Vector3( ) );
	
	    gltf.scene.position.set( -c.x, size.y / 2 - c.y, -c.z );

	    model.add( gltf.scene );
	
	    scene.add( model );
	
      renderer.render( scene, camera );

      animate();
    }
  }

  ngOnInit(): void {
    this.createDraw()
  }
}
