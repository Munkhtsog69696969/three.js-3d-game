import * as THREE from 'three';

export default class Floor {
  width: number;
  depth: number;
  color: number;
  textureUrl: string | null;
  mesh: THREE.Mesh;

  constructor(width: number = 300, depth: number = 300, color: number = 0x808080, textureUrl: string | null = null) {
    this.width = width;
    this.depth = depth;
    this.color = color;
    this.textureUrl = textureUrl;

    // Create the floor mesh
    this.mesh = this.createFloor();
  }

  createFloor(): THREE.Mesh {
    // Floor geometry
    const floorGeometry = new THREE.PlaneGeometry(this.width, this.depth);

    // Load texture if provided, else create a basic material with color
    let floorMaterial: THREE.MeshStandardMaterial;
    if (this.textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      const floorTexture = textureLoader.load(this.textureUrl);
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(20, 20); // Adjust repeat for tiling effect
      floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    } else {
      floorMaterial = new THREE.MeshStandardMaterial({ color: this.color });
    }

    // Create the mesh and rotate it to lay flat on the ground
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate 90 degrees to make it horizontal
    floor.receiveShadow = true; // Enable shadows if needed

    return floor;
  }

  addToScene(scene: THREE.Scene): void {
    scene.add(this.mesh);
  }
}
