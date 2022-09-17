import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
  
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.set( 50, 50, 50 );
    camera.lookAt( 0, 0, 0 );
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x005005 )
    scene.add(new THREE.AxesHelper(5))

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 0, 0)
    controls.update();

    let yRotation =  0; 
    let xRotation =  0;	 
    let zRotation =  0;

    let yPosition =  0; 
    let xPosition =  0;	 
    let zPosition =  0;

    let yScale =  1; 
    let xScale =  1;	 
    let zScale =  1;

    const loader = new GLTFLoader();

    loader.load( "assets/Item/Cube.gltf ", process );
    let model = new THREE.Object3D( );

    model.scale.set(1,1,1);

    function animate( ) {
	
      requestAnimationFrame( animate );

      xPosition += 0.05;	

      zRotation += 0.005;

      model.position.x = xPosition;
      //model.position.y = yPosition;
      //model.position.z = zPosition;
 	
      //model.rotation.x = xRotation;
	    //model.rotation.y = yRotation;
	    model.rotation.z = -zRotation;

      xScale = xScale-0.001
      yScale = yScale-0.001
      zScale = zScale-0.001
      model.scale.set(xScale,yScale,zScale)

      if(xScale < 0){
        xPosition = 0
        //yPosition = 0
        //zPosition = 0

      // yRotation =  0; 
      // xRotation =  0;	 
        zRotation =  0;

        xScale = 1
        yScale = 1
        zScale = 1
        model.scale.set(xScale,yScale,zScale)
      }

      controls.update();

      renderer.render( scene, camera );
	
    }

    function process( gltf:any ) {	
		
      
	    const box = new THREE.Box3( ).setFromObject( gltf.scene );	
	    const boxHelper = new THREE.Box3Helper( box, new THREE.Color( 0x45ffff ) );
      scene.add( boxHelper );

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
