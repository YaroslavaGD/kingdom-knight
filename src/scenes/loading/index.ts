import { GameObjects, Scene } from "phaser";

export class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    //key: 'king'
    //path from baseURL to file: 'sprites/king.png'
    this.load.image('king', 'sprites/king.png');
  }

  create(): void {
    console.log('Loading scene was created');
    this.scene.start('level-1-scene');
  }
}