interface Window {
  sizeChanged: () => void;
  game: Phaser.Game;
}

type ObjectPoint = {
  height: number;
  id: number;
  name: string;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
  with: number;
  x: number;
  y: number;
};