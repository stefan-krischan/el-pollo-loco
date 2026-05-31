/**
 * Represents a status bar in the game.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {number} The scale of the status bar */
  scale = 0.3;

  /** @type {number} The width of the status bar */
  width = 595 * this.scale;

  /** @type {number} The height of the status bar */
  height = 158 * this.scale;

  /** @type {number} The x-coordinate of the status bar */
  x = 10;

  /** @type {number} The y-coordinate of the status bar */
  y = 0;

  /** @type {number} The current percentage of the status bar */
  percentage = 100;

  /** @type {string[]} Paths to the status bar images */
  imagePaths = [];

  constructor() {
    super();
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    this.setImage(this.percentage);
  }

  setImage(percentage) {
    const index = Math.ceil((this.imagePaths.length - 1) * (percentage / 100));
    this.loadImage(this.imagePaths[index]);
  }
}
