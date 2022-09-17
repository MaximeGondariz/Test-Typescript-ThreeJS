import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
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

    const texture = new THREE.TextureLoader().load( 'assets/Texture/grey-block.png' );

    // immediately use the texture for material creation
    const material = new THREE.MeshPhongMaterial( { map: texture } );

    const light1 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light1.position.set(0, 0, 4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light2.position.set(-4,0,0)
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light3.position.set(4,0,0)
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light4.position.set(0,0,-4)
    scene.add(light4);

    const light5 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light5.position.set(0,-4,0)
    scene.add(light5);

    const light6 = new THREE.DirectionalLight(0xFFFFFFF, 1);
    light6.position.set(0,4,0)
    scene.add(light6);
		

    let geomentry = new THREE.BoxGeometry(20,20,20);
    let cube = new THREE.Mesh(geomentry,material);
    scene.add(cube);
	
    renderer.render( scene, camera );

    animate();



    function animate( ) {
	
      requestAnimationFrame( animate );

      xPosition += 0.05;	

      zRotation += 0.005;

      cube.position.x = xPosition;
      //cube.position.y = yPosition;
      //cube.position.z = zPosition;
 	
      //cube.rotation.x = xRotation;
	    //cube.rotation.y = yRotation;
	    cube.rotation.z = -zRotation;

      xScale = xScale-0.001
      yScale = yScale-0.001
      zScale = zScale-0.001
      cube.scale.set(xScale,yScale,zScale)

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
        cube.scale.set(xScale,yScale,zScale)
      }

      controls.update();

      renderer.render( scene, camera );
	
    }
  }

  ngOnInit(): void {
    this.createDraw()
  }
}
