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
    

    const loader = new GLTFLoader();

    loader.load( '/', function ( gltf ) {
	    scene.add( gltf.scene );
    }, undefined, function ( error ) {
	    console.error( error );
    } );

    renderer.render( scene, camera );
  }

  ngOnInit(): void {
    this.createDraw()
  }
}
