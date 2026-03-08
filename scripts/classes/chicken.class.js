/**
 * Represents a normal opponent in the game
 */
class Chicken extends MovableObject {
  /** @type {number} The scale of the chicken */
  scale = 0.35;

  /** @type {number} The Y position of the chicken */
  y = 394.95;

  /** @type {number} The width of the chicken */
  width = 248;

  /** @type {number} The height of the chicken  */
  height = 243;

  /**
   * creates the chicken object
   * @param {number} index The index of the chicken in the array
   */
  constructor(index) {
    super();
    this.loadImage("assets/images/enemies/chicken/normal/walk/walk-1.png");
    this.x = this.calculatePositionX(index);
  }

  /**
   * Calculates the X position for the chicken based on its index
   * @param {number} index The index of the chicken in the array
   * @returns {number} The calculated X position for the chicken
   */
  calculatePositionX(index) {
    let chickenWidth = this.width * this.scale;
    let safeZoneOffset = 250;
    let baseDistance = chickenWidth + 100;
    let variance = Math.random() * 90;
    return safeZoneOffset + (index * baseDistance) + variance;
  }
}
