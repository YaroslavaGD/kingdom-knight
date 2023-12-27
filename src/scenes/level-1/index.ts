import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "../../helpers/gameobject-to-objectpoint";

export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset | null;
  private wallsLayer!: Tilemaps.TilemapLayer | null;
  private groundLayer!: Tilemaps.TilemapLayer | null;
  private chests!: Phaser.GameObjects.Sprite[];

  constructor() {
    super('level-1-scene');
  }
  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
    this.initChests();
    this.initCamera();
    if (this.wallsLayer) {
      this.physics.add.collider(this.player, this.wallsLayer);
    }
  }

  update(): void {
    this.player.update();
  }

  
  private initMap(): void {
    this.map = this.make.tilemap({ 
      key: 'dungeon',
      tileWidth: 16,
      tileHeight: 16
    });

    this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
    if (this.tileset === null) {
      console.error('Tileset could not be loaded');
      return;
    }
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    if ( this.wallsLayer) {
      this.wallsLayer.setCollisionByProperty({collides: true});
      this.physics.world.setBounds(0, 0, this.wallsLayer!.width, this.wallsLayer!.height);
    }

    this.showDebugWalls();
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    this.wallsLayer?.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255)
    });
  }

  private initChests(): void {
    const chestObjects = this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint');
    if (chestObjects !== null) {
      const chestPoints = gameObjectsToObjectPoints(chestObjects);
      this.chests = chestPoints.map(chestPoint => this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5));

      this.chests.forEach(chest => {
        this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
          obj2.destroy();
          this.cameras.main.flash();
        });
      });
    }
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }
}