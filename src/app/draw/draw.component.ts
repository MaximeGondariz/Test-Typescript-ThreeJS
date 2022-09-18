import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  constructor() {
  }

  public createDraw(){

// --------------- Le rendue de la scene ---------------
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

// --------------- La camera ---------------
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.set( 0, 0, 150 );
    camera.lookAt( 0, 0, 0 );

// --------------- La scène ---------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x005005 );
    scene.add(new THREE.AxesHelper(5));

// --------------- Les controles pour faire bouger la scène ---------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

// --------------- La création du cube dans la scene ---------------

    const cubeTexture = new THREE.TextureLoader().load( 'assets/Texture/grey-block.png' );
    const cubeMaterial = new THREE.MeshPhongMaterial( { map: cubeTexture } );
    let cubeGeomentry = new THREE.BoxGeometry(20,20,20);

    let cube = new THREE.Mesh(cubeGeomentry,cubeMaterial);
    cube.position.y = 10
    scene.add(cube);


    const groundMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    let groundGeomentry = new THREE.BoxGeometry(200,3,30);

    let ground = new THREE.Mesh(groundGeomentry,groundMaterial);
    ground.position.y = -2
    scene.add(ground);

// --------------- Les lumières ---------------

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

// --------------- Ajout de la scene et de la camera dans le rendue ---------------

    renderer.render( scene, camera );

// --------------- Création de plusieurs variables qui permettront de modifier la position, la rotation et la taille du cube ---------------

    let xPosition =  0;	
    let yPosition =  10;  
    let zPosition =  0;

    let xRotation =  0;	 
    let yRotation =  0; 
    let zRotation =  0;

    let xScale =  1;	
    let yScale =  1;  
    let zScale =  1;

// --------------- Activation de la fonction qui va animer le cube ---------------
    let marchSpeed = 0.040
    let marchRotation = 0.008
    animate();

    function animate( ) {
	
// --------------- A chaque frame qui passent, la fonction "animate" est activé ---------------
    
      requestAnimationFrame( animate );

      xPosition += 0.1;	

      yPosition += marchSpeed;
      zRotation += marchRotation;

      cube.position.x = xPosition;
      cube.position.y = yPosition;
      //cube.position.z = zPosition;
 	
      //cube.rotation.x = xRotation;
	    //cube.rotation.y = yRotation;
	    cube.rotation.z = -zRotation;

      // xScale = xScale-0.001
      // yScale = yScale-0.001
      // zScale = zScale-0.001
      // cube.scale.set(xScale,yScale,zScale)

      if(yPosition > 12.8){
        marchSpeed = -0.020
        marchRotation = 0.0065
      }
      if(yPosition < 10){
        marchSpeed = 0.035
        marchRotation = 0.008;
      }

      if(xPosition > 100){
        xPosition = -100
        //yPosition = 0
        //zPosition = 0

        //yRotation =  10; 
        //xRotation =  0;	 
        //zRotation =  0;
      }

      controls.update();

      renderer.render( scene, camera );
	
    }
  }

  ngOnInit(): void {
    this.createDraw()
  }
}
