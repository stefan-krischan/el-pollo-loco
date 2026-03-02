/**
 * Represents the main character of the game
 * @extends MovableObject
 */
class Character extends MovableObject {
  scale = 0.3;
  height = 1200;
  width = 610;
  x = 0;
  y = 120;
  constructor() {
    super();
    this.loadImage("assets/images/character/idle/idle-1.png");
  }
}
