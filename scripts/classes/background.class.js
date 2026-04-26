/**
 * Represents the background of the game.
 * @extends DrawableObject
 */
class Background extends DrawableObject {
  scale = 0.375;
  width = 1920 * this.scale;
  height = 1080 * this.scale;
  x = 0;
  y = 75;

  /**
   *
   * @param {string} imagePath - The path to the image file.
   * @param {number} y - The y-coordinate of the background.
   */
  constructor(imagePath, y = 75) {
    super();
    this.loadImage(imagePath);
    this.y = y;
  }
}
