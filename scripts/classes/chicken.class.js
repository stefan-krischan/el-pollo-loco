/**
 * Represents a normal opponent in the game
 */
class Chicken extends MovableObject {
  scale = 0.35;
  y = 394.95;
  x = 150;
  width = 248;
  height = 243;


  constructor() {
    super();
    this.loadImage("assets/images/enemies/chicken/normal/walk/walk-1.png");
  }
}
